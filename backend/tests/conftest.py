#Ce fichier permet de définir des fixtures Pytest accessibles à tous tes tests.

# backend/tests/conftest.py
import pytest
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime, timezone
import uuid
from app.core.database import SessionLocal
from app.models.user import User

@pytest.fixture(scope="function")
def test_user():
    """Crée un utilisateur temporaire avant chaque test"""
    db: Session = SessionLocal()

    # 🔁 Supprime les tâches associées à l'utilisateur s'il existe déjà
    existing = db.query(User).filter(User.email == "testuser@example.com").first()
    if existing:
        db.execute(text("DELETE FROM tasks WHERE actor_id = :actor_id"), {"actor_id": str(existing.id)})
        db.commit()
        db.delete(existing)
        db.commit()

    user = User(
        id=uuid.uuid4(),
        email="testuser@example.com",
        hashed_password="fake-hash",
        role="contributor",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    yield user

    # 🧹 Nettoyage après le test
    db.execute(text("DELETE FROM tasks WHERE actor_id = :actor_id"), {"actor_id": str(user.id)})
    db.commit()
    db.delete(user)
    db.commit()
    db.close()
