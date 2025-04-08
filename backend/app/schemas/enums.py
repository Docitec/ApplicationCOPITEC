from pydantic import BaseModel
from uuid import UUID

class EnumValue(BaseModel):
    id: UUID
    type: str
    label: str
    value: str
    is_active: bool

    model_config = {
        "from_attributes": True
    }

