from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from fastapi.encoders import jsonable_encoder
from app.database import SessionLocal
from app.models.task import Task as DBTask
from app.schemas.task import TaskCreate, Task

router = APIRouter()

# Connexion à la base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Créer une nouvelle tâche
@router.post("/tasks/", response_model=Task)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_task = DBTask(
        task=task.task,
        comments=task.comments,
        execution_plan=",".join(task.execution_plan) if task.execution_plan else None,
        sub_team=task.sub_team,
        system=task.system,
        theme=task.theme,
        actor=",".join(task.actor) if task.actor else None,
        responsible=task.responsible,
        controller=task.controller,
        previous=",".join(map(str, task.previous)) if task.previous else None,
        duration=task.duration,
        status=task.status,
        priority=task.priority,
        notes=task.notes,
        location=task.location,
        interface_impacted=task.interface_impacted,
        go_nogo_point=task.go_nogo_point,
        created_by=task.created_by,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    # Convertir les champs string → liste pour la réponse
    response_data = jsonable_encoder(db_task)
    for field in ["execution_plan", "actor", "previous"]:
        if response_data.get(field):
            response_data[field] = response_data[field].split(",")
        else:
            response_data[field] = []

    return response_data
