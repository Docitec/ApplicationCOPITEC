# Script PowerShell pour lancer les tests avec pytest
Write-Host "📦 Activation de l'environnement virtuel..."
. .\venv\Scripts\Activate.ps1

Write-Host "✅ Environnement activé. Lancement des tests unitaires avec pytest..."
pytest --tb=short --disable-warnings

Write-Host "`n📋 Résultat des tests terminé."
