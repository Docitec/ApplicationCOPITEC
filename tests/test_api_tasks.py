# tests/test_api_tasks.py

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_tasks_returns_200():
    response = client.get("/tasks/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
