# architecture.md

> Document **technique**. L'intention produit (vision, objectifs, personas, parcours, backlog + critères d'acceptation) vit dans la **couche owner** (`docs/00-vision.md` … `docs/08-backlog.md`), seule source de vérité sur le *pourquoi* et le *quoi*. Ce fichier ne traite que du *comment* technique : architecture, données, API, erreurs.

---

# Architecture Générale

```text
Browser
    |
    v
Next.js Frontend
    |
    | REST API
    v
Django REST Framework
    |
    v
PostgreSQL
```

Frontend et backend sont totalement séparés ; toute communication passe par l'API REST.
Détail des responsabilités par couche : voir section « Règles d'Architecture » plus bas.

---

# Modèle de Données

## Profile

Le portfolio possède un seul profil principal.

### Champs

| Champ        | Type   |
| ------------ | ------ |
| full_name    | string |
| title        | string |
| bio          | text   |
| photo        | image  |
| email        | email  |
| github_url   | url    |
| linkedin_url | url    |
| cv           | file   |

### Contraintes

* Un seul profil doit exister.
* Ce modèle agit comme un singleton métier.
* Enforcement : override de `save()` — lève une `ValidationError` si un profil existe déjà (décidé en Sprint 1).

---

## Skill

Représente une compétence technique.

### Champs

| Champ    | Type   |
| -------- | ------ |
| name     | string |
| category | string |
| icon     | string |

### Catégories

* Language
* Framework
* Database
* Cloud
* Tool
* Methodology

---

## Project

Représente une réalisation, quelle que soit son origine (emploi, mission, académique, personnel).

### Champs

| Champ             | Type    |
| ----------------- | ------- |
| project_type      | enum    |
| title             | string  |
| slug              | slug    |
| short_description | string  |
| description       | text    |
| role              | string  |
| challenge         | text    |
| solution          | text    |
| lessons_learned   | text    |
| github_url        | url     |
| demo_url          | url     |
| cover_image       | image   |
| start_date        | date    |
| end_date          | date    |
| featured          | boolean |

### Project Types

| Valeur       | Usage                                       |
| ------------ | ------------------------------------------- |
| PROFESSIONAL | Réalisé dans le cadre d'un emploi salarié   |
| CONSULTING   | Mission freelance ou prestation ponctuelle  |
| ACADEMIC     | Projet universitaire, mémoire, laboratoire  |
| PERSONAL     | Side project, expérimentation, open source  |

`project_type` ajouté en Sprint 04, a nécessité une migration sur le backend Sprint 1 déjà livré — un seul champ, pas de breaking change.

### Relations

ManyToMany -> Skill

---

## ProjectAsset

Représente une preuve associée à un projet.

### Champs

| Champ      | Type   |
| ---------- | ------ |
| title      | string |
| file       | file   |
| asset_type | string |

### Relations

ForeignKey -> Project

### Asset Types

```text
IMAGE
DOCUMENT
TDR
CAHIER_CHARGE
ARCHITECTURE
OTHER
```

---

# Diagramme Relationnel

```text
Profile

Skill
  |
  | M:N
  |
Project
  |
  | 1:N
  |
ProjectAsset
```

---

# Contrat API

Base URL :

```text
/api/
```

Pas de versioning (`/v1/`, etc.) — un seul frontend consommateur, toujours déployé en synchro avec le backend. À réévaluer uniquement si l'API devient publique ou multi-consommateurs ; pas avant.

---

## GET /api/profile/

Retourne le profil principal.

### Réponse

```json
{
  "full_name": "Mahamane Daouda Maiga",
  "title": "Assistant Data & Informatique",
  "bio": "...",
  "github_url": "...",
  "linkedin_url": "..."
}
```

---

## GET /api/skills/

Retourne toutes les compétences.

### Réponse

```json
[
  {
    "id": 1,
    "name": "Python",
    "category": "Language"
  }
]
```

---

## GET /api/projects/

Retourne la liste des projets.

### Réponse

```json
[
  {
    "id": 1,
    "title": "DAMS",
    "slug": "dams",
    "short_description": "...",
    "featured": true,
    "project_type": "PROFESSIONAL",
    "start_date": "2023-01-01",
    "end_date": null,
    "cover_image": null
  }
]
```

---

## GET /api/projects/{slug}/

Retourne le détail d'un projet.

### Réponse

```json
{
  "id": 1,
  "title": "DAMS",
  "slug": "dams",
  "short_description": "...",
  "description": "...",
  "role": "...",
  "challenge": "...",
  "solution": "...",
  "lessons_learned": "...",
  "github_url": "",
  "demo_url": "",
  "cover_image": null,
  "start_date": "2023-01-01",
  "end_date": null,
  "featured": true,
  "project_type": "PROFESSIONAL",
  "skills": [],
  "assets": []
}
```

---

# Règles d'Architecture

## Backend

Responsabilités :

* Modèles métier
* Validation des données
* Exposition API REST
* Administration Django

Ne doit pas gérer :

* HTML
* CSS
* Templates Django

---

## Frontend

Responsabilités :

* Interface utilisateur
* Consommation API
* Gestion d'état
* Navigation

Ne doit pas contenir :

* Logique métier backend
* Accès direct à la base de données

---

# Principes de Développement

1. API First.
2. Chaque sprint doit produire un incrément fonctionnel.
3. Le code doit être compréhensible par un développeur junior.

Sur-ingénierie, simplicité, dépendances à éviter : voir `rules/STACK.md` → section « Ce qu'il faut éviter » (rendu concret par technologie là-bas plutôt que répété ici en abstrait).

---

# Gestion des erreurs (Frontend)

Deux cas distincts, à ne pas confondre — une erreur API n'est pas une ressource introuvable, le message affiché doit le refléter.

| Cas | Origine | Comportement attendu | Convention Next.js |
|-----|---------|----------------------|---------------------|
| Ressource introuvable | Slug inexistant, API répond 404 | Page « non trouvée » dédiée | `not-found.tsx` + appel `notFound()` |
| API injoignable | Erreur réseau, timeout, 5xx | Message générique (« réessaie plus tard »), ne jamais dire « introuvable » — la ressource existe peut-être, c'est l'API qui est en panne | `error.tsx` |

Pas de retry automatique, pas de cache d'erreur en V1. Conventions natives Next.js uniquement — aucune dépendance ajoutée (cohérent avec `rules/STACK.md` → Ce qu'il faut éviter).

---

# Roadmap

## Sprints de construction (livrés)

| Sprint | Périmètre | Statut |
|--------|-----------|--------|
| 1 | Backend Django : models, serializers, API, admin | Livré |
| 2 | Frontend Next.js : layout, pages | Livré |
| 3 | UI/UX — hygiène de base : responsive, dark mode, animations génériques | Livré |
| 4 | Identité visuelle : palette, typographie, hero, cartes projets enrichies (`project_type`) | Livré |

## Phase actuelle : cadrage rétroactif

**Sprint Owner** — production de la couche owner (`docs/00-vision.md` … `docs/08-backlog.md`), puis audit du code existant contre les critères d'acceptation. Le code n'est pas réécrit ; les écarts deviennent le backlog dev. Détail : `docs/sprints/sprint-owner.md`.

## Sprints à venir (backlog issu de l'audit owner → dev)

Ordre cible (figé définitivement dans `docs/sprints/` une fois l'audit produit) :

1. Page Méthode / Making-of (surface la couche owner)
2. Fix hero « Disponible » + rendu Markdown des champs riches
3. Tests contrat API + CI GitHub Actions
4. Fix `remotePatterns` (env) + durcissement `settings.py`
5. Déploiement (Django headless + Next statique/ISR)
6. Dataviz / couche Data
7. Preuves projets, filtres, page À propos, finitions

Détail tâche par tâche de chaque sprint : voir `docs/sprints/sprint-0X.md`.