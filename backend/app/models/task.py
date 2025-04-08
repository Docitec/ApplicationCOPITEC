import uuid
import json
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.core.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    task_name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)

    execution_phase_raw: Mapped[str] = mapped_column("execution_phase", default="[]")
    dependencies_raw: Mapped[str] = mapped_column("dependencies", default="[]")

    system: Mapped[str] = mapped_column(String, nullable=False)
    actor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    duration_planned: Mapped[str] = mapped_column(String, nullable=False)

    start_planned: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    end_planned: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    start_forced: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    force_start: Mapped[bool] = mapped_column(Boolean, default=False)
    allow_outside_working_hours: Mapped[bool] = mapped_column(Boolean, default=False)

    start_time_real: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    end_time_real: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    chrono_state: Mapped[str] = mapped_column(String, default="idle")

    status: Mapped[str] = mapped_column(String, default="todo")
    notes_execution: Mapped[str] = mapped_column(Text, nullable=True)

    created_by: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True))
    updated_by: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    actor = relationship("User", back_populates="tasks")

    @property
    def execution_phase(self) -> list[str]:
        return json.loads(self.execution_phase_raw)

    @execution_phase.setter
    def execution_phase(self, value: list[str]) -> None:
        self.execution_phase_raw = json.dumps(value)

    @property
    def dependencies(self) -> list[str]:
        return json.loads(self.dependencies_raw)

    @dependencies.setter
    def dependencies(self, value: list[str]) -> None:
        self.dependencies_raw = json.dumps(value)
