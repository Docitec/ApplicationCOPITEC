from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.core.database import Base

class Task(Base):
    __tablename__ = "tasks"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    task_name = Column(String, nullable=False)
    description = Column(String)
    execution_phase = Column(String)
    system = Column(String)
    actor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    duration_planned = Column(String)
    start_planned = Column(DateTime)
    end_planned = Column(DateTime)
    start_forced = Column(DateTime)
    force_start = Column(Boolean, default=False)
    dependencies = Column(String)
    allow_outside_working_hours = Column(Boolean, default=False)
    start_time_real = Column(DateTime)
    end_time_real = Column(DateTime)
    chrono_state = Column(String)
    status = Column(String)
    notes_execution = Column(String)
    created_by = Column(UUID(as_uuid=True))
    updated_by = Column(UUID(as_uuid=True))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
