from sqlalchemy import Column, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.core.database import Base

class EnumValue(Base):
    __tablename__ = "enums"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type = Column(String)
    label = Column(String)
    value = Column(String)
    is_active = Column(Boolean, default=True)
