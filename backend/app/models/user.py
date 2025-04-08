from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime, timezone

from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="contributor", nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc), nullable=False)

    # 🔁 Relation inverse pour les tâches liées à cet utilisateur
    tasks = relationship("Task", back_populates="actor", cascade="all, delete-orphan")
