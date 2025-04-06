from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import all_routes
from app.models.task import Base
from app.database import engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # autoriser le frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

for route in all_routes:
    app.include_router(route)
