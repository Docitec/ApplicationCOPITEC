# ApplicationCOPITEC
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── database.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── task.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── task.py
│   ├── routes/
│   │   ├── __init__.py
│   │   └── task_routes.py
│   └── utils/
│       ├── __init__.py
│       └── dependencies.py
├── requirements.txt
└── .env

Cahier des charges:
# Cahier des charges - Application de gestion de cut-over plan

## 1. Contexte
L'application vise à faciliter le suivi et la planification d'un plan de cut-over pour un projet de mise en production, en permettant de créer, visualiser, mettre à jour et importer/exporter des tâches techniques et fonctionnelles impliquant différents acteurs, systèmes et équipes.

---

## 2. Objectifs fonctionnels

- Création de tâches avec tous les attributs requis
- Consultation des tâches sous forme de liste filtrable et triable
- Mise à jour des tâches existantes
- Import de tâches depuis un fichier Excel (template fourni)
- Historique des modifications avec suivi des versions avec possibilité de restaurer des versions antérieures
- Calcul automatique de la date de début/fin en fonction des dépendances et disponibilités du responsable de la tache.
- Travail collaboratif
- Gestion des utilisateurs avec compte utilisateur independant

---

## 3. Modèle de données - Tâche

Chaque tâche contient les champs suivants :

| Champ               | Type                  | Obligatoire | Description |
|---------------------|------------------------|-------------|-------------|
| id                  | int                    | Oui         | Identifiant unique |
| task                | str                    | Oui         | Titre de la tâche |
| comments            | str (optionnel)        | Non         | Détails / description |
| execution_plan      | list[str]              | Non         | Ex: ["Dry Run 1", "Go Live"] |
| sub_team            | str (optionnel)        | Non         | Équipe responsable |
| system              | str (optionnel)        | Non         | Système concerné (Ex: M3, FTP, etc.) |
| theme               | str (optionnel)        | Non         | Thématique de la tâche |
| actor               | str                    | Oui         | Personnes réalisant la tâche |
| previous            | list[int]              | Non         | IDs des tâches prérequises |
| duration            | str (hh:mm)            | Non         | Durée estimée |
| start               | datetime (calculée)    | Non         | Début (calculé à partir de previous) |
| end                 | datetime (calculée)    | Non         | Fin (calculé à partir de start + duration + Disponibilité de actor) |
| start_forced        | bool                   | Non         | Forcer date de début|
| status              | str                    | Oui         | Statut (todo, in_progress, done, blocked, cancelled) |
| milestone           | bool                   | Non         | Jalon |
| created_by          | str                    | Oui         | Utilisateur ayant créé la tâche |
| updated_by          | str                    | Oui         | Dernier modificateur |
| created_at          | datetime               | Oui         | Date de création |
| updated_at          | datetime               | Oui         | Date de mise à jour |

---

## 4. Règles de gestion

1. Les champs `start` et `end` sont calculés automatiquement à partir de la durée et des dépendances `previous`.
2. Si une date de début forcée est fournie, elle doit être supérieure à la fin de toutes les tâches prérequises.
3. Une tâche peut avoir plusieurs acteurs, mais un seul responsable et un seul contrôleur.
4. En cas de modification d’une tâche, une copie de l’ancienne version est stockée dans `TaskHistory` avec timestamp et auteur de la modification.
5. L’import Excel doit convertir les colonnes multivaluées (ex: actor) en listes Python.
6. Les listes (actor, execution_plan, previous) sont stockées en base de données sous forme de chaîne CSV, mais manipulées comme des listes dans les schémas Pydantic et le frontend.
7. lorsque start_forced est coché, l'attribut start devient éditable. Lorsque décoché, l'attribut se recalcul automatiquement en fonction du previous si existant. 
8. Possibiliter de rechercher sur le titre et/ou la description
9. possibilite de mettre en evidence dans la liste des taches les actions d'un acteur (Avec selection d'un ou plusieurs acteurs)
---

## 5. Routes API (FastAPI)

- `POST /tasks/` : Créer une tâche
- `GET /tasks/` : Récupérer toutes les tâches (avec conversion CSV -> list)
- `PUT /tasks/{task_id}` : Modifier une tâche, enregistrer un historique de l'ensemble des champs
- `POST /import-tasks/` : Importer des tâches depuis un fichier Excel

---

## 6. Modules techniques

- **Frontend :** React + TailwindCSS
- **Backend :** FastAPI + SQLAlchemy
- **Base de données :** SQLite (dev) / PostgreSQL (prod envisagé)
- **Import :** Lecture Excel avec pandas
- **Historique :** Table `TaskHistory` avec sauvegarde JSON
- **Interface web : ** Figma

---

## 7. Prochaines évolutions envisagées

- Filtrage par équipe / système / acteur / exécution plan
- Authentification utilisateur sécurisé (connexion / droits / gestion des profils utilisateur)
- Export Excel / PDF
- Diagramme de Gantt et vue "timeline"
- Représentation visuel de l'enchainement des tâches.


