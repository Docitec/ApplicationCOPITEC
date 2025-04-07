from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.task import Task as DBTask
from app.schemas.task import TaskCreate
import pandas as pd
from io import BytesIO
from datetime import datetime, timezone

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/import-tasks/")
def import_tasks(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Vérifie l'extension du fichier
    if not file.filename or not file.filename.endswith((".xls", ".xlsx")):
        raise HTTPException(status_code=400, detail="Le fichier doit être un Excel (.xls ou .xlsx)")

    try:
        content = file.file.read()
        df = pd.read_excel(BytesIO(content))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur de lecture du fichier : {e}")

    created_tasks = []

    for _, row in df.iterrows():
        try:
            # Gestion des valeurs manquantes et conversion en liste
            execution_plan = str(row.get("execution_plan") or "").split(",")
            actor = str(row.get("actor") or "").split(",")
            previous_raw = row.get("previous")
            previous = [int(p) for p in str(previous_raw).split(",") if str(previous_raw).strip()] if pd.notna(previous_raw) else []

            task_data = TaskCreate(
                task=str(row.get("task") or ""),
                comments=str(row.get("comments") or ""),
                execution_plan=execution_plan,
                sub_team=str(row.get("sub_team") or ""),
                system=str(row.get("system") or ""),
                theme=str(row.get("theme") or ""),
                actor=actor,
                responsible=str(row.get("responsible") or ""),
                controller=str(row.get("controller") or ""),
                previous=previous,
                duration=str(row.get("duration") or ""),
                status=str(row.get("status") or ""),
                priority=str(row.get("priority") or ""),
                notes=str(row.get("notes") or ""),
                location=str(row.get("location") or ""),
                interface_impacted=str(row.get("interface_impacted") or ""),
                go_nogo_point=bool(row.get("go_nogo_point") or False),
                created_by="import_excel"
            )

            db_task = DBTask(
                task=task_data.task,
                comments=task_data.comments,
                execution_plan=",".join(task_data.execution_plan or []),
                sub_team=task_data.sub_team,
                system=task_data.system,
                theme=task_data.theme,
                actor=",".join(task_data.actor or []),
                responsible=task_data.responsible,
                controller=task_data.controller,
                previous=",".join(map(str, task_data.previous or [])),
                duration=task_data.duration,
                status=task_data.status,
                priority=task_data.priority,
                notes=task_data.notes,
                location=task_data.location,
                interface_impacted=task_data.interface_impacted,
                go_nogo_point=task_data.go_nogo_point,
                created_by=task_data.created_by,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc),
                updated_by="import_excel"
            )

            db.add(db_task)
            db.commit()
            db.refresh(db_task)
            created_tasks.append(db_task.id)

        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=f"Erreur à la ligne {row.to_dict()} : {e}")

    return {"imported_task_ids": created_tasks, "count": len(created_tasks)}
