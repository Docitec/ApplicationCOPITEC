#!/bin/bash

# Script : start_all_services.sh
# Démarre Docker + backend + frontend + tests, version Bash compatible Git Bash / WSL

# Aller à la racine du projet
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR" || exit 1

# Activer l'environnement virtuel Python
source venv/Scripts/activate || source venv/bin/activate

# Lancer PostgreSQL
echo "✅ Lancement de PostgreSQL via Docker..."
docker compose up -d
sleep 3

# Lancer backend (dans une nouvelle fenêtre de terminal)
echo "✅ Lancement du backend (FastAPI)..."
(cd backend && start "" wt -w 0 new-tab --title "Backend" cmd /k "venv\\Scripts\\activate && uvicorn app.main:app --reload")

# Lancer frontend (dans une nouvelle fenêtre de terminal)
echo "✅ Lancement du frontend (Next.js)..."
(cd frontend && start "" wt -w 0 new-tab --title "Frontend" cmd /k "npm run dev")

sleep 5

# Lancer les tests backend
echo "✅ Tests backend (pytest)..."
pytest backend/tests

# Lancer les tests E2E
echo "✅ Tests E2E (Cypress)..."
(cd frontend && npx cypress run --spec "cypress/e2e/login.cy.ts")

echo "🎉 Tous les services sont démarrés et testés."
read -p "Appuyez sur une touche pour quitter..."
