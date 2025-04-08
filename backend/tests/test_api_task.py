# backend/tests/test_api_task.py

import json
import uuid
from datetime import datetime, timezone
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_task_api(test_user):
    payload = {
        "task_name": "API Test Task",
        "description": "Created via TestClient",
        "execution_phase": ["Go Live"],
        "system": "Centric",
        "actor_id": str(test_user.id),
        "duration_planned": "00:30",
        "dependencies": [],
        "allow_outside_working_hours": True,
        "force_start": False,
        "chrono_state": "idle",
        "status": "todo",
        "created_by": str(test_user.id),
        "updated_by": str(test_user.id),
        "notes_execution": None,
        "start_forced": None,
        "start_planned": None,
        "end_planned": None,
        "start_time_real": None,
        "end_time_real": None,
    }

    response = client.post("/tasks/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["task_name"] == "API Test Task"
    assert data["actor_id"] == str(test_user.id)
