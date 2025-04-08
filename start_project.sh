#!/bin/bash
echo "🐳 Démarrage de Docker (PostgreSQL)..."
docker compose up -d

echo "🚀 Lancement du backend..."
(cd backend && poetry run uvicorn app.main:app --reload) &

echo "🌐 Lancement du frontend..."
(cd frontend && npm run dev)

