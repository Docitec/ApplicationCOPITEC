# backend/tests/test_dependencies.py
# Teste la gestion de dépendances en les stockant sous forme JSON :
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models import user
from app.models.task import Task
import uuid
from datetime import datetime, timezone
import json

def test_task_with_dependencies(test_user):
    db: Session = SessionLocal()
    dep_ids = [str(uuid.uuid4()), str(uuid.uuid4())]
    task = Task(
        id=uuid.uuid4(),
        task_name="Task with deps",
        description="Has 2 dependencies",
        execution_phase=json.dumps(["Go Live"]),
        system="Centric",
        actor_id=test_user.id,
        duration_planned="00:45",
        dependencies=json.dumps(dep_ids),
        allow_outside_working_hours=True,
        force_start=False,
        chrono_state="idle",
        status="todo",
        created_by=test_user.id,
        updated_by=test_user.id,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )

    db.add(task)
    db.commit()

    stored = db.query(Task).filter_by(task_name="Task with deps").first()
    assert stored is not None
    parsed_deps = json.loads(str(stored.dependencies))
    assert dep_ids == parsed_deps

    db.delete(stored)
    db.commit()
    db.close()