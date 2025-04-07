# app/schemas/task.py
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class TaskBase(BaseModel):
    task: str
    comments: Optional[str] = None
    execution_plan: Optional[List[str]] = None
    sub_team: Optional[str] = None
    system: Optional[str] = None
    theme: Optional[str] = None
    actor: Optional[List[str]] = None
    responsible: Optional[str] = None
    controller: Optional[str] = None
    previous: Optional[List[int]] = None
    duration: Optional[str] = None
    status: Optional[str] = "todo"
    milestone: Optional[bool] = False
    created_by: str
    updated_by: str

class TaskCreate(TaskBase):
    pass

class TaskRead(TaskBase):
    id: int
    start: Optional[datetime]
    end: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True