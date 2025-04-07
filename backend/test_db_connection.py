from sqlalchemy import text
from app.database import SessionLocal

def test_connection():
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))  # Utilisation explicite de `text()`
        print("✅ Connexion à la base de données réussie.")
    except Exception as e:
        print("❌ Erreur de connexion à la base de données :", e)
    finally:
        db.close()

if __name__ == "__main__":
    test_connection()
