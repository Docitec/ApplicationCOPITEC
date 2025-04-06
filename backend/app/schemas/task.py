from pydantic import BaseModel
from typing import Optional

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    duration: int
    system: Optional[str] = None
    category: Optional[str] = None
    status: str = "todo"

class TaskCreate(TaskBase):
    pass  # même structure que TaskBase pour le moment

class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True
