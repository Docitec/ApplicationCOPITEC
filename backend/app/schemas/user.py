from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr
    role: str

    model_config = {
        "from_attributes": True
    }


class UserCreate(UserBase):
    password: str  # requis à la création uniquement


class UserOut(UserBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }
