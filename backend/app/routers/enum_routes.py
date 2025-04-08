from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_enums():
    return [{"type": "system", "value": "Centric"}]
