from .status import router as status_router
from .tasks import router as tasks_router

all_routes = [
    status_router,
    tasks_router
]
