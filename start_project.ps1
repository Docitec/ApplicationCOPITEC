Write-Host "🐳 Démarrage de Docker (PostgreSQL)..."
Start-Process "powershell" -ArgumentList "docker compose up -d"
Start-Process powershell -ArgumentList "cd backend; uvicorn app.main:app --reload"
Start-Process powershell -ArgumentList "cd frontend; npm run dev"
