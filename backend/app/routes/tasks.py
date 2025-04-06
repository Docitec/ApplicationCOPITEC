from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.task import TaskCreate, Task
from app.models.task import Task as DBTask
from app.database import SessionLocal
from typing import List

router = APIRouter()

# Dépendance pour créer une session de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/tasks/", response_model=Task)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_task = DBTask(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/tasks/", response_model=List[Task])
def read_tasks(db: Session = Depends(get_db)):
    return db.query(DBTask).all()
