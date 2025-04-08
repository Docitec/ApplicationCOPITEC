# backend/scripts/create_test_user.py

from app.core.database import SessionLocal
from app.models.user import User
from datetime import datetime, timezone
import uuid

def insert_test_user():
    db = SessionLocal()
    try:
        test_user = User(
            id=uuid.uuid4(),
            email="test@example.com",
            hashed_password="not_secure",  # À remplacer plus tard par du hash
            role="contributor",
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc),
        )

        db.add(test_user)
        db.commit()
        print(f"✅ Utilisateur de test inséré avec l'ID : {test_user.id}")
    except Exception as e:
        print(f"❌ Erreur : {e}")
    finally:
        db.close()

if __name__ == "__main__":
    insert_test_user()
