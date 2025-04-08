# backend/tests/test_enum_model.py
# Teste l’insertion d’une valeur EnumValue.
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.enums import EnumValue
import uuid

def test_create_enum():
    db: Session = SessionLocal()
    enum = EnumValue(
        id=uuid.uuid4(),
        type="system",
        label="Centric",
        value="centric",
        is_active=True
    )

    db.add(enum)
    db.commit()

    result = db.query(EnumValue).filter_by(value="centric").first()
    assert result is not None
    db.delete(result)
    db.commit()
    db.close()