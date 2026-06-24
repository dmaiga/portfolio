# Sprint 02 — Frontend Next.js

Contexte déjà chargé via CLAUDE.md (@docs/architecture.md, @rules/STACK.md) — pas de re-définition ici.

## Périmètre

* Frontend uniquement. Backend Sprint 1 considéré terminé et consommé tel quel.
* Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui (cf. STACK.md).
* Pas de gestion d'état globale, pas de lib de fetching tierce (cf. STACK.md → Gestion d'état / Data Fetching).
* Pas d'authentification.

## Pages à livrer

| Page | Route | Couvre |
|------|-------|--------|
| Layout racine | — | nav + footer (liens de contact — email, GitHub, LinkedIn — couvre US6, visible sur toutes les pages) |
| Home | `/` | profil, compétences, projets featured (US1, US2) |
| Projects | `/projects` | liste de tous les projets (US3) |
| Project Detail | `/projects/[slug]` | challenge / solution / lessons_learned + assets (US4, US5) |

> Contact volontairement hors de Home : c'est sur Project Detail (US4/US5) que le visiteur est le plus convaincu, donc le plus motivé à contacter. Le footer le rend accessible à ce moment précis, pas seulement depuis Home.

## Données consommées

```
GET /api/profile/
GET /api/skills/
GET /api/projects/
GET /api/projects/{slug}/
```

Contrat complet (formats de réponse) : `docs/architecture.md` → Contrat API.

## Points de vigilance spécifiques à ce sprint

* Server Components par défaut pour le fetch (Home, Projects, Detail). `"use client"` uniquement si interactivité réelle (toggle, filtre) — pas par réflexe.
* Ne pas extraire de composant partagé avant de l'avoir écrit en double au moins une fois (ex: carte projet sur Home et sur Projects) — règle du Rule of Three déjà actée, pas la peine d'anticiper.
* Un fetch direct par page suffit à ce stade ; pas de couche "API client" tant qu'un vrai besoin de réutilisation n'apparaît pas.

## Travail demandé

1. Initialiser le projet Next.js (App Router, TypeScript, Tailwind) dans `frontend/`.
2. Configurer shadcn/ui.
3. Créer le layout racine.
4. Implémenter la page Home.
5. Implémenter la page Projects (liste).
6. Implémenter la page Project Detail (dynamique par slug).
7. Gérer les cas limites (cf. `architecture.md` → Gestion des erreurs) : `not-found.tsx` pour slug inconnu, `error.tsx` pour API injoignable — ne pas confondre les deux.
8. Fournir l'arborescence finale du projet frontend.

## Critères d'acceptation

* `npm run dev` démarre sans erreur.
* Les 3 pages affichent des données réelles issues de l'API Sprint 1 (pas de mock).
* Navigation Home → Projects → Project Detail fonctionnelle.
* Un slug inconnu déclenche `not-found.tsx` (404) ; une panne API déclenche `error.tsx` — les deux messages sont visuellement et textuellement distincts.
* TypeScript strict, pas de `any` non justifié.
* Responsive minimal (pas cassé sur mobile) — le responsive design abouti est Sprint 3.