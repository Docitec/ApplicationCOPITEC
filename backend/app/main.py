from fastapi import FastAPI
from app.routers import task_routes, user_routes, enum_routes
from app.core.database import engine, Base

# 🔽 Import des modèles
from app.models import user, task, enums

app = FastAPI(title="Cut Over Plan API")

# Crée les tables à partir des modèles SQLAlchemy
Base.metadata.create_all(bind=engine)

# Enregistrement des routes
app.include_router(task_routes.router, prefix="/tasks", tags=["Tasks"])
app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(enum_routes.router, prefix="/enums", tags=["Enums"])

@app.get("/")
def root():
    return {"message": "Welcome to the Cut Over Plan API"}
