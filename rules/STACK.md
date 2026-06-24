# STACK.md

## Objectif

Ce document définit les choix techniques de référence du projet. Les technologies mentionnées ici constituent la stack officielle.

Toute proposition de nouvelle dépendance ou de nouvelle technologie doit être justifiée explicitement.

Schéma des couches et séparation des responsabilités : voir `docs/architecture.md` (non reproduit ici pour éviter toute divergence entre les deux fichiers).
Décisions techniques structurantes (rendu statique/ISR, cible de déploiement, etc.) et leurs compromis : voir `docs/DECISIONS.md`.

---

# Backend

## Langage

* Python 3.12+

## Framework

* Django 5+
* Django REST Framework

## Base de données

* **SQLite** par défaut (développement, et production tant que l'écriture reste faible).
* **PostgreSQL** en réserve : adopté en production uniquement si le besoin se fait sentir (ex. extension vers un blog, montée en charge d'écriture).

Justification et alternatives : voir `docs/DECISIONS.md` (ADR base de données).

## Gestion des médias

* Django Media Files

## API

* REST

---

# Frontend

## Framework

* Next.js

## Langage

* TypeScript

TypeScript est obligatoire. Ne pas utiliser JavaScript sauf exception explicitement demandée.

## UI

* Tailwind CSS
* shadcn/ui
* next-themes — exception justifiée (Sprint 03) : gère le dark mode sans flash de mauvais thème au chargement ni bug d'hydratation SSR sous App Router, deux pièges réels à refaire à la main. Mono-usage, ne touche pas à la gestion d'état globale interdite ci-dessous.

---

# Gestion d'état

Pour la V1 :

* React State
* Context API si nécessaire

Ne pas ajouter Redux, MobX, Zustand, Recoil sans justification explicite.

---

# Data Fetching

Pour la V1 :

* fetch natif
* Server Components lorsque pertinent

Ne pas ajouter React Query ou SWR sans besoin réel identifié.

La stratégie de rendu (statique / ISR vs SSR) est une décision documentée dans `docs/DECISIONS.md`, pas un choix de dépendance — elle n'introduit aucune librairie supplémentaire.

---

# Authentification

Aucune authentification prévue pour la V1.

Si une authentification devient nécessaire, option privilégiée :

* JWT
* Django REST Framework Simple JWT

---

# Qualité

Si une configuration de linting est mise en place :

* Ruff
* Black

Intégration continue (lint + tests) : GitHub Actions. Le périmètre exact est figé au sprint dédié ; voir `docs/DECISIONS.md`.

---

# Tests

Backend :

* Django TestCase
* pytest (optionnel)

Frontend :

* à définir au sprint dédié

---

# Déploiement

La cible concrète (PaaS vs VPS, conteneurisation, reverse proxy) est arbitrée dans `docs/DECISIONS.md` et n'est pas figée ici tant que la décision n'est pas prise.

Candidats : Docker, et un PaaS (Railway / Render / Fly.io) **ou** un VPS avec reverse proxy.

Ne pas introduire de dépendances liées au déploiement avant le sprint dédié.

---

# Ce qu'il faut éviter

* Architecture microservices
* CQRS
* Event Sourcing
* Redux
* React Query
* Dépendances inutiles
* Abstractions prématurées

Le projet privilégie la simplicité et la lisibilité.