from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# Charger les variables d'environnement
load_dotenv()

# Récupérer l'URL de la base de données depuis .env
DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL is None:
    raise ValueError("🚨 DATABASE_URL est manquant dans le fichier .env")

# Création du moteur SQLAlchemy
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)

# Session locale pour les routes FastAPI
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base à hériter dans les modèles
Base = declarative_base()
