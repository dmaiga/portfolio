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

| Champ           | Type    | Section parcours            | Notes |
| --------------- | ------- | --------------------------- | ----- |
| project_type    | enum    | —                           | |
| title           | string  | —                           | |
| slug            | slug    | —                           | |
| summary         | string  | Résumé                      | ex `short_description` |
| context         | text    | Contexte / état des lieux   | ex `description` |
| role            | string  | —                           | |
| problem         | text    | Problème                    | ex `challenge` |
| solution        | text    | Solution                    | |
| results         | text    | Résultats                   | nouveau |
| deep_dive       | text    | Approfondir (texte inline)  | nouveau — Markdown libre |
| lessons_learned | text    | Approfondir (rétro)         | sort du tronc principal |
| github_url      | url     | Approfondir                 | conditionnel |
| demo_url        | url     | Approfondir                 | conditionnel |
| cover_image     | image   | —                           | |
| start_date      | date    | —                           | |
| end_date        | date    | —                           | |
| featured        | boolean | —                           | |

### Project Types

| Valeur       | Usage                                       |
| ------------ | ------------------------------------------- |
| PROFESSIONAL | Réalisé dans le cadre d'un emploi salarié   |
| CONSULTING   | Mission freelance ou prestation ponctuelle  |
| ACADEMIC     | Projet universitaire, mémoire, laboratoire  |
| PERSONAL     | Side project, expérimentation, open source  |

`project_type` ajouté en Sprint 04, a nécessité une migration sur le backend Sprint 1 déjà livré — un seul champ, pas de breaking change.

> **Migration M1 en cours (2026-06-25)** : renommage `short_description→summary`, `description→context`, `challenge→problem` + ajout `deep_dive`. Le champ `results` existe déjà. Voir `docs/sprints/sprint-model-ui.md`.

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
    "summary": "...",
    "role": "...",
    "featured": true,
    "project_type": "PROFESSIONAL",
    "start_date": "2023-01-01",
    "end_date": null,
    "cover_image": null,
    "skills": []
  }
]
```

> `role` est exposé dès la liste : la carte projet doit afficher le rôle tenu (décideur, architecte, exécutant) sans charger le détail.

---

## GET /api/projects/{slug}/

Retourne le détail d'un projet.

### Réponse

```json
{
  "id": 1,
  "title": "DAMS",
  "slug": "dams",
  "summary": "...",
  "context": "...",
  "role": "...",
  "problem": "...",
  "solution": "...",
  "results": "...",
  "deep_dive": "...",
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

> `deep_dive` et `lessons_learned` sont affichés uniquement dans la section Approfondir (conditionnelle).
> `github_url`, `demo_url` et `assets` sont affichés uniquement s'ils existent — pas de lien mort.

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
| Owner | Couche owner `docs/00`→`08` + audit backlog dev | Livré |
| Dev-1 | Page Méthode, rendu Markdown, ISR, tests, CI, SEO, sécurité | Livré |

## Phase actuelle : Migration modèle + Refonte UI/UX

Brief : `docs/sprints/sprint-model-ui.md`.

**Phase 1 — Migration modèle (M1→M5)**
- M1 : renommage `short_description→summary`, `description→context`, `challenge→problem` + ajout `deep_dive` (`results` déjà existant).
- M2 : suppression `/methode`, intégration Démarche dans `/a-propos`.
- M3 : serializer + API alignés sur nouveaux noms.
- M4 : front consomme les nouveaux champs.
- M5 : seed mis à jour.

**Phase 2 — Refonte UI/UX** (après validation Phase 1)
Tokens dark/light → typographie → composants page par page selon `docs/wireframes.jsx` et `docs/06-identite-visuelle.md`.