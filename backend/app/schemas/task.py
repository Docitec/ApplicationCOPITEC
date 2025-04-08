from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class TaskBase(BaseModel):
    task_name: str
    description: Optional[str] = None
    execution_phase: List[str]
    system: str
    actor_id: UUID
    duration_planned: str
    start_forced: Optional[datetime] = None
    force_start: bool = False
    dependencies: Optional[List[UUID]] = []
    allow_outside_working_hours: bool = False
    notes_execution: Optional[str] = None
    status: str
    chrono_state: str

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: UUID
    start_planned: Optional[datetime]
    end_planned: Optional[datetime]
    start_time_real: Optional[datetime]
    end_time_real: Optional[datetime]
    created_by: UUID
    updated_by: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
