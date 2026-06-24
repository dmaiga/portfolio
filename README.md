# Portfolio — Mahamane Daouda Maïga

[![CI](https://github.com/dmaiga/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/dmaiga/portfolio/actions/workflows/ci.yml)

Portfolio professionnel **headless** : une API Django/DRF qui sert de CMS, un frontend Next.js
qui consomme l'API en statique/ISR. Il sert de *bragsheet* (trace présentable des réalisations)
et raconte une **trajectoire** vers Data Architect / CTO / Data Engineer.

> La maîtrise des agents IA s'y *montre* (specs, sprints, garde-fous versionnés), elle ne s'y proclame pas.

---

## Architecture

| Couche | Stack |
|---|---|
| **Backend** | Python 3.12, Django 5, Django REST Framework, SQLite (PostgreSQL en réserve) |
| **Frontend** | Next.js 16, TypeScript, Tailwind CSS, shadcn/ui |
| **Rendu** | Statique / ISR (revalidation 1 h) |
| **Déploiement cible** | Front sur Vercel, backend sur cPanel LWS |

Stack détaillée et dépendances autorisées : [`rules/STACK.md`](rules/STACK.md).
Décisions techniques et compromis : [`docs/DECISIONS.md`](docs/DECISIONS.md).

---

## Démarrage rapide

### Backend
```bash
cd backend
python -m venv venv && source venv/Scripts/activate   # Windows : venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                   # ajuster si besoin
python manage.py migrate
python manage.py seed                                  # contenu de démonstration
python manage.py runserver                             # http://localhost:8000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local                             # NEXT_PUBLIC_API_URL, etc.
npm run dev                                            # http://localhost:3000
```

Déploiement complet : [`docs/deploiement.md`](docs/deploiement.md).

---

## Comment ce projet a été construit

Ce dépôt est piloté par des **specs et des contraintes versionnées**, exécutées avec l'appui
d'agents IA, puis relues et validées. Les artefacts de ce pilotage sont publics :

- [`CLAUDE.md`](CLAUDE.md) — orchestration : où est la vérité, comment travailler.
- [`rules/`](rules/) — [posture](rules/ABOUT-ME.md), [convention de commits](rules/GIT.md), [stack](rules/STACK.md).
- [`docs/sprints/`](docs/sprints/) — découpage et briefs, sprint par sprint.
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — journal des décisions (ADR léger).

La démarche complète est aussi exposée sur la page **Méthode** du site.

---

## Documentation (couche owner, dans l'ordre)

1. [`docs/00-vision.md`](docs/00-vision.md) — pour qui, quel problème, pourquoi moi.
2. [`docs/01-stakeholders.md`](docs/01-stakeholders.md) — acteurs, besoins, pouvoir.
3. [`docs/02-objectifs.md`](docs/02-objectifs.md) — objectifs mesurables.
4. [`docs/03-personas.md`](docs/03-personas.md) — le pair, le recruteur.
5. [`docs/04-parcours.md`](docs/04-parcours.md) — parcours de visite.
6. [`docs/05-archi-info.md`](docs/05-archi-info.md) — arborescence du site.
7. [`docs/08-backlog.md`](docs/08-backlog.md) — user stories + critères d'acceptation.

Passation → dev : [`docs/DECISIONS.md`](docs/DECISIONS.md) · [`docs/backlog-dev.md`](docs/backlog-dev.md) · [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
