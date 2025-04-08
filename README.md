# ApplicationCOPITEC

Application web de planification et de suivi des Cut Over Plans dans un contexte de déploiement informatique.

## Objectif
Permettre aux chefs de projets et équipes techniques de planifier les tâches critiques, gérer les dépendances, suivre l'exécution en temps réel et respecter les contraintes de disponibilité des utilisateurs.

## Cahier des charges fonctionnel (extrait)

### Rôles
- Admin : gestion des projets, utilisateurs, listes de valeurs
- Contributeur : saisie et exécution des tâches
- Lecteur : consultation seule

### Tâches (attributs clés)
- `task_name` (str)
- `execution_phase` (List[Enum]) – phases paramétrables
- `system` (Enum) – paramétrable (ex: Centric, M3…)
- `actor` (utilisateur)
- `duration_planned` (hh:mm)
- `start_planned`, `end_planned` (datetime, auto)
- `force_start`, `start_forced` (bool, datetime)
- `dependencies` (List[UUID])
- `allow_outside_working_hours` (bool)
- `chrono_state` (Enum)
- `start_time_real`, `end_time_real` (datetime, via chrono)

### Fonctionnalités supplémentaires
- Planification automatique en fonction des dépendances et disponibilités
- Chronomètre intégré (start/pause/resume/stop/reset)
- Export/Import Excel
- Enums dynamiques gérés par les admins
- Authentification JWT
- Gestion des disponibilités utilisateur (heures normales, congés)

## Spécification technique

- **Frontend** : React.js + Vite + Tailwind CSS
- **Backend** : FastAPI + SQLAlchemy
- **Base de données** : PostgreSQL
- **Déploiement** : Docker, Nginx, Uvicorn
- **Authentification** : JWT
- **Interopérabilité** (v2) : Power BI, Jira, Confluence

## Lancer l'application localement

```bash
# Créer et activer l’environnement virtuel
python -m venv venv
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt

# Lancer l’API FastAPI
./run.sh
```

Accès Swagger : [http://localhost:8000/docs](http://localhost:8000/docs)

## Dépôt GitHub
Ce projet est maintenu sur : [https://github.com/Docitec/ApplicationCOPITEC](https://github.com/Docitec/ApplicationCOPITEC)
