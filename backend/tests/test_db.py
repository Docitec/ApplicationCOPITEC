# tests/test_db.py

from sqlalchemy import text
from app.database import SessionLocal

def test_database_connection():
    """Test simple pour vérifier la connexion à la base de données"""
    try:
        db = SessionLocal()
        result = db.execute(text("SELECT 1"))
        assert result.scalar() == 1
    finally:
        db.close()
