# app/routes/task_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.task import Task as DBTask
from app.schemas.task import TaskCreate, TaskRead
from typing import List
from fastapi.encoders import jsonable_encoder
from datetime import datetime

router = APIRouter(prefix="/tasks", tags=["tasks"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=TaskRead)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    now = datetime.utcnow()
    db_task = DBTask(
        **task.dict(),
        execution_plan=",".join(task.execution_plan or []),
        actor=",".join(task.actor or []),
        previous=",".join(map(str, task.previous or [])),
        created_at=now,
        updated_at=now,
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/", response_model=List[TaskRead])
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(DBTask).all()
    for task in tasks:
        task.execution_plan = task.execution_plan.split(",") if task.execution_plan else []
        task.actor = task.actor.split(",") if task.actor else []
        task.previous = list(map(int, task.previous.split(","))) if task.previous else []
    return tasks
