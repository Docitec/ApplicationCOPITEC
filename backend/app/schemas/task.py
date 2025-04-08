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
    duration_planned: str  # format hh:mm
    start_planned: Optional[datetime] = None
    end_planned: Optional[datetime] = None
    start_forced: Optional[datetime] = None
    force_start: bool = False
    dependencies: List[str] = []
    allow_outside_working_hours: bool = True
    start_time_real: Optional[datetime] = None
    end_time_real: Optional[datetime] = None
    chrono_state: str
    status: str
    notes_execution: Optional[str] = None
    created_by: UUID
    updated_by: UUID


class TaskCreate(TaskBase):
    pass


class TaskOut(TaskBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }
