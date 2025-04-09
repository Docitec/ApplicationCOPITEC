@echo off
set PROJECT_DIR=%~dp0
cd /d %PROJECT_DIR%

echo 🚀 Lancement de Docker (PostgreSQL)...
docker compose up -d
timeout /t 3

echo ✅ Lancement du backend...
start "Backend" cmd /k "backend\venv\Scripts\python.exe -m uvicorn app.main:app --reload --app-dir backend"

echo ✅ Lancement du frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo ✅ Lancement des tests backend...
start "Tests Backend" cmd /k "backend\venv\Scripts\python.exe -m pytest backend/tests"

echo ✅ Lancement des tests Cypress...
start "Tests Frontend" cmd /k "cd frontend && npx cypress run"

echo 🟢 Tous les services ont été lancés dans des fenêtres séparées.
pause
