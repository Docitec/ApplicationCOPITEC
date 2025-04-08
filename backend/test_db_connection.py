from sqlalchemy import text
from app.core.database import SessionLocal

def test_connection():
    try:
        db = SessionLocal()
        result = db.execute(text("SELECT 1"))
        print("✅ Connexion réussie à la base PostgreSQL :", result.scalar())
    except Exception as e:
        print("❌ Erreur de connexion :", e)
    finally:
        db.close()

if __name__ == "__main__":
    test_connection()
