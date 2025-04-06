from fastapi import FastAPI
from app.routes import all_routes
from app.models.task import Base
from app.database import engine


app = FastAPI()

for route in all_routes:
    app.include_router(route)

# Création automatique des tables à l'initialisation
Base.metadata.create_all(bind=engine)