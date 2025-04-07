# app/models/task.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from app.database import Base
import datetime

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    task = Column(String, nullable=False)
    comments = Column(Text, nullable=True)
    execution_plan = Column(String, nullable=True)
    sub_team = Column(String, nullable=True)
    system = Column(String, nullable=True)
    theme = Column(String, nullable=True)
    actor = Column(String, nullable=True)
    responsible = Column(String, nullable=True)
    controller = Column(String, nullable=True)
    previous = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    start = Column(DateTime, nullable=True)
    end = Column(DateTime, nullable=True)
    status = Column(String, nullable=False, default="todo")
    milestone = Column(Boolean, default=False)
    created_by = Column(String, nullable=False)
    updated_by = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
