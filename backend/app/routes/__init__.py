from .status import router as status_router
from .tasks import router as tasks_router
from .import_excel import router as import_excel_router


all_routes = [
    status_router,
    tasks_router,
    import_excel_router
]
