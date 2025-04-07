from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from fastapi.encoders import jsonable_encoder
from app.database import SessionLocal
from app.models.task import Task as DBTask, TaskHistory
from app.schemas.task import TaskCreate, Task, TaskUpdate
from typing import List
import json

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/tasks/", response_model=Task)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc)
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
        updated_by=task.created_by,
        created_at=now,
        updated_at=now,
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    response_data = jsonable_encoder(db_task)
    for field in ["execution_plan", "actor", "previous"]:
        if response_data.get(field):
            response_data[field] = response_data[field].split(",")
        else:
            response_data[field] = []

    return response_data

@router.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, update: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")

    old_snapshot = jsonable_encoder(db_task)
    for field in ["execution_plan", "actor", "previous"]:
        if old_snapshot.get(field):
            old_snapshot[field] = old_snapshot[field].split(",")

    history = TaskHistory(
        task_id=db_task.id,
        modified_by=update.updated_by or "inconnu",
        modified_at=datetime.now(timezone.utc),
        snapshot=json.dumps(old_snapshot)
    )
    db.add(history)

    for attr, value in update.dict(exclude_unset=True).items():
        if attr in ["execution_plan", "actor", "previous"] and isinstance(value, list):
            setattr(db_task, attr, ",".join(map(str, value)))
        else:
            setattr(db_task, attr, value)

    setattr(db_task, "updated_at", datetime.now(timezone.utc))

    db.commit()
    db.refresh(db_task)

    response_data = jsonable_encoder(db_task)
    for field in ["execution_plan", "actor", "previous"]:
        if response_data.get(field):
            response_data[field] = response_data[field].split(",")
        else:
            response_data[field] = []

    return response_data

@router.get("/tasks/", response_model=List[Task])
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(DBTask).all()
    results = []
    for t in tasks:
        task_data = jsonable_encoder(t)
        for field in ["execution_plan", "actor", "previous"]:
            if task_data.get(field):
                task_data[field] = task_data[field].split(",")
            else:
                task_data[field] = []
        results.append(task_data)
    return results
