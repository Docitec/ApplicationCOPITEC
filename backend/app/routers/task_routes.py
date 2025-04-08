from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_tasks():
    return [{"task_id": 1, "task_name": "Initialisation"}]
