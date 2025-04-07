from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    task = Column(String)
    comments = Column(Text)
    execution_plan = Column(String)
    sub_team = Column(String)
    system = Column(String)
    theme = Column(String)
    actor = Column(String)
    responsible = Column(String)
    controller = Column(String)
    previous = Column(String)
    duration = Column(String)
    status = Column(String)
    priority = Column(String)
    notes = Column(Text)
    location = Column(String)
    interface_impacted = Column(String)
    go_nogo_point = Column(String)
    created_by = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    updated_by = Column(String)

    history = relationship("TaskHistory", back_populates="task")

class TaskHistory(Base):
    __tablename__ = "task_history"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    modified_by = Column(String)
    modified_at = Column(DateTime, default=datetime.utcnow)
    snapshot = Column(Text)  # JSON string représentant la version précédente

    task = relationship("Task", back_populates="history")
