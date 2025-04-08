# backend/tests/test_task_model.py
# Teste l’insertion et la lecture d’une tâche (en mémoire ou base réelle).
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models import user
from app.models.task import Task
import uuid
from datetime import datetime, timezone
import json

def test_create_task_with_user(test_user):
    db: Session = SessionLocal()
    task = Task(
        id=uuid.uuid4(),
        task_name="Task with valid actor",
        description="Linked to test user",
        execution_phase=json.dumps(["Go Live"]),
        system="Centric",
        actor_id=test_user.id,
        duration_planned="01:00",
        start_planned=None,
        end_planned=None,
        start_forced=None,
        force_start=False,
        dependencies=json.dumps([]),
        allow_outside_working_hours=True,
        start_time_real=None,
        end_time_real=None,
        chrono_state="idle",
        status="todo",
        notes_execution=None,
        created_by=test_user.id,
        updated_by=test_user.id,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )

    db.add(task)
    db.commit()

    retrieved = db.query(Task).filter_by(task_name="Task with valid actor").first()
    assert retrieved is not None
    db.delete(retrieved)
    db.commit()
    db.close()