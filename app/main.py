from fastapi import FastAPI
from app.routers import task_routes

app = FastAPI(title="Cut Over Plan API")

app.include_router(task_routes.router, prefix="/tasks", tags=["Tasks"])

@app.get("/")
def root():
    return {"message": "Welcome to the Cut Over Plan API"}
