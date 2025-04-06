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
    duration: str
    status: str = "todo"
    priority: Optional[str] = None
    notes: Optional[str] = None
    location: Optional[str] = None
    interface_impacted: Optional[str] = None
    go_nogo_point: Optional[bool] = False

class TaskCreate(TaskBase):
    created_by: str

class Task(TaskBase):
    id: int
    start: Optional[datetime]
    end: Optional[datetime]
    created_by: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class TaskHistory(BaseModel):
    id: int
    task_id: int
    modified_by: str
    modified_at: datetime
    snapshot: str

    class Config:
        orm_mode = True
