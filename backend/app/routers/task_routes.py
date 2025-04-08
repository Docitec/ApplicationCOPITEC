from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.task import TaskCreate, TaskOut
from app.models.task import Task
import uuid
from datetime import datetime, timezone

router = APIRouter()

@router.get("/", response_model=list[TaskOut])
def list_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()

@router.post("/", response_model=TaskOut)
def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):
    task = Task(
        id=uuid.uuid4(),
        **task_data.model_dump(),
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task
