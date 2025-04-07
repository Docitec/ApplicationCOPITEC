from app.database import engine
from app.models import task

def init_db():
    print("🔧 Création des tables dans la base de données...")
    task.Base.metadata.create_all(bind=engine)
    print("✅ Base de données initialisée avec succès.")

if __name__ == "__main__":
    init_db()
