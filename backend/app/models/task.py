from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    task = Column(String, nullable=False)
    comments = Column(Text)
    execution_plan = Column(String)  # stocke JSON string ou valeurs séparées par virgule
    sub_team = Column(String)
    system = Column(String)
    theme = Column(String)
    actor = Column(String)  # JSON string ou liste de noms séparés
    responsible = Column(String)
    controller = Column(String)
    previous = Column(String)  # liste d’IDs au format texte "1,2,3"
    duration = Column(String)  # hh:mm
    start = Column(DateTime)
    end = Column(DateTime)
    status = Column(String, default="todo")
    priority = Column(String)
    notes = Column(Text)
    location = Column(String)
    interface_impacted = Column(String)
    go_nogo_point = Column(Boolean, default=False)

    created_by = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    history = relationship("TaskHistory", back_populates="task")


class TaskHistory(Base):
    __tablename__ = "task_history"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    modified_by = Column(String)
    modified_at = Column(DateTime, default=datetime.utcnow)
    snapshot = Column(Text)  # JSON string représentant la version précédente

    task = relationship("Task", back_populates="history")
