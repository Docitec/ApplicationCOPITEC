# Lancer backend
Start-Process powershell -ArgumentList "cd backend; .\..\venv\Scripts\activate; uvicorn app.main:app --reload" -NoNewWindow

# Lancer frontend
Start-Process powershell -ArgumentList "cd frontend; npm start" -NoNewWindow
