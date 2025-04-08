#Ce fichier permet de définir des fixtures Pytest accessibles à tous tes tests.

# backend/tests/conftest.py

import pytest
import uuid
from datetime import datetime, timezone
from app.core.database import SessionLocal
from app.models.user import User

@pytest.fixture(scope="function")
def test_user():
    """Crée un utilisateur temporaire avant chaque test"""
    db = SessionLocal()
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

    yield user  # <-- rend l'utilisateur utilisable dans le test

    # Nettoyage après test
    db.delete(user)
    db.commit()
    db.close()
