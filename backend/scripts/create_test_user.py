from app.core.database import SessionLocal, Base, engine

# ✅ IMPORTS DE TOUS LES MODÈLES AVANT TOUT
from app.models import user, task, enums
from app.models.user import User

import uuid
from datetime import datetime, timezone
from passlib.context import CryptContext

# 🔐 Contexte bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
hashed_pwd = pwd_context.hash("romain.denis@docitec.com")

# 🛠 Crée les tables (utile pour test isolé)
Base.metadata.create_all(bind=engine)

# ✅ Crée un utilisateur
db = SessionLocal()

test_user = User(
    id=uuid.uuid4(),
    email="romain.denis@docitec.com",
    hashed_password=hashed_pwd,
    role="admin",
    created_at=datetime.now(timezone.utc),
    updated_at=datetime.now(timezone.utc),
)

# 🔁 Ignore s’il existe déjà
existing = db.query(User).filter_by(email=test_user.email).first()
if not existing:
    db.add(test_user)
    db.commit()
    print("✅ Utilisateur admin créé avec succès.")
else:
    print("ℹ️ Utilisateur admin déjà présent.")

db.close()
