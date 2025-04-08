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

🔧 Initialisation du projet
 Cloner ce dépôt localement

 Lancer npm install dans le dossier frontend

 Corriger les conflits de dépendances avec --legacy-peer-deps si besoin

 Créer un fichier .env dans le dossier backend avec ta config PostgreSQL

 Lancer la base PostgreSQL avec docker-compose up -d

 Lancer le backend avec uvicorn app.main:app --reload

 Lancer le frontend avec npm run dev

🎨 Frontend
 Valider les pages générées par v0.dev (dashboard, task list, modals)

 Ajouter les liens de navigation (react-router-dom)

 Ajouter les appels API vers FastAPI (CRUD des tâches)

 Mettre en place l'authentification

 Ajouter un composant de timeline ou de calendrier si nécessaire

 Connecter la visualisation des dépendances

 Intégrer le filtrage par phase d'exécution, système, ou utilisateur

 Ajouter les notifications / erreurs visibles

🧠 Backend
 Vérifier les modèles SQLAlchemy (User, Task, EnumValue)

 Vérifier la cohérence avec les schémas Pydantic

 Vérifier les relations back_populates

 Finaliser toutes les routes /tasks, /users, /enums

 Ajouter l’authentification JWT ou OAuth2

 Ajouter les règles de validation métier (dépendances, horaires)

 Ajouter l'historique des modifications de tâches (versionning)

📊 Importation des données
 Ajouter une route backend pour uploader un fichier Excel

 Parser le fichier .xlsx (DIOR_PLM_CutOver Plan_COP GL 2025 Shoes V2.xlsx)

 Enregistrer les données comme tâches dans la BDD

 Ajouter un composant frontend de prévisualisation avant import

📈 Suivi du projet & support
 Générer automatiquement une courbe en S dans l'app (progression GoLive)

 Intégrer la logique Hypercare : statuts, indicateurs de criticité, KPI

 Ajouter un module de ticketing ou de suivi des anomalies

 Prévoir une documentation interne (FAQ, lexique, procédures)

🔐 Authentification & Permissions
 Ajouter un écran de login

 Distinguer les rôles : admin / contributeur / viewer

 Restreindre l'accès à certaines actions

 Afficher l’utilisateur connecté en frontend

🧪 Tests et qualité
 Créer des tests unitaires backend avec pytest

 Créer des tests frontend avec vitest ou cypress

 Générer une documentation Swagger à jour

 Ajouter un make audit pour vérifier la cohérence du projet

🚀 Déploiement
 Ajouter un Dockerfile pour le frontend

 Ajouter un Dockerfile pour le backend

 Ajouter un docker-compose.yml global (frontend + backend + db)

 Ajouter des variables d’environnement .env.production

 Configurer Vercel ou Netlify pour le frontend

 Configurer Railway, Render ou Fly.io pour le backend

