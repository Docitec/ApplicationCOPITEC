from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, LoginResponse
from app.core.security import verify_password
import uuid

router = APIRouter()

@router.post("/auth/login", response_model=LoginResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Email incorrect")

    if not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")

    token = str(uuid.uuid4())  # ⛔ à remplacer plus tard par un vrai JWT !
    return LoginResponse(token=token, email=user.email, role=user.role)