# backend/tests/test_auth_login.py

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.database import SessionLocal
from app.models.user import User
from passlib.context import CryptContext
import uuid
from datetime import datetime, timezone

client = TestClient(app)

# Contexte de hachage identique à celui de security.py
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def setup_function():
    db = SessionLocal()
    db.query(User).filter_by(email="testlogin@example.com").delete()
    test_user = User(
        id=uuid.uuid4(),
        email="testlogin@example.com",
        hashed_password=pwd_context.hash("test123"),
        role="tester",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )
    db.add(test_user)
    db.commit()
    db.close()

def teardown_function():
    db = SessionLocal()
    db.query(User).filter_by(email="testlogin@example.com").delete()
    db.commit()
    db.close()

def test_login_success():
    response = client.post("/auth/login", json={
        "email": "testlogin@example.com",
        "password": "test123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "token" in data
    assert data["email"] == "testlogin@example.com"
    assert data["role"] == "tester"

def test_login_fail():
    response = client.post("/auth/login", json={
        "email": "testlogin@example.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401
