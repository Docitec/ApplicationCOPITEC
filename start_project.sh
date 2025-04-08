#!/bin/bash

echo "🚀 Lancement du backend..."
(cd backend && poetry run uvicorn app.main:app --reload) &

echo "🌐 Lancement du frontend..."
(cd frontend && npm run dev)
