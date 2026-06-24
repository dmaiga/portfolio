# Backlog dev — audit code vs `08-backlog.md`

> Audit du **2026-06-24**. Lecture seule, zéro modification de code.
> Méthode : chaque user story de `08-backlog.md` confrontée au code existant (backend Django + frontend Next 16).
> Légende : ✅ fait · ◑ partiel · ❌ manquant.

## Synthèse

Le code est sain et la fondation solide : modèle de données complet (`Profile`, `Skill`, `Project` avec les 4 `ProjectType`, `ProjectAsset` typé), API REST propre, SEO déjà câblé, responsive et `next/image` en place. **Les écarts ne sont pas des défauts de qualité** : ce sont surtout (1) des pages d'intention jamais créées (Méthode, À propos, Contact), (2) le parcours « Approfondir » non matérialisé, et (3) trois divergences entre les décisions (`DECISIONS.md`) et le code.

## État par user story

| US | Sujet | Statut | Écart |
|---|---|---|---|
| US1 | Page Méthode | ❌ | Aucune page `/methode`, absente de la nav. **Objectif n°1 non réalisé.** |
| US2 | Page projet autonome | ◑ | Page riche et auto-portante. Manque : section **Résultats** dédiée (pas de champ modèle), « Contexte » non distinct de « Description », champs riches rendus en **texte brut** (pas de Markdown → listes/sauts perdus). |
| US3 | Bifurcation « Approfondir » | ❌ | Sections linéaires, **aucun point unique** « Voir les détails techniques ». Le recruteur ne peut pas s'arrêter à un seuil clair. |
| US4 | Artefacts creusables | ◑ | Documents/galerie liés et **affichage conditionnel** OK ; stockage media Django conforme (ADR-005). Manque : rendu **lisible navigateur** (Markdown/PDF embarqué — actuellement simple lien fichier qui s'ouvre dans un onglet). |
| US5 | Réalisations classées | ◑ | Les 4 catégories existent (modèle + labels). Manque : `/projects` affiche une **grille à plat, non classée par catégorie** ; pas de filtre ; libellé nav « Projets » au lieu de « Réalisations ». |
| US6 | Accueil orienteur | ◑ | qui/quoi/CTA présents. Manque : ne mène pas à Méthode (inexistante) ; badge **« Disponible » codé en dur** (non piloté par donnée). |
| US7 | À propos & Contact | ❌ | Aucune page `/a-propos` ni `/contact`. Contact = mailto en hero + footer ; GitHub/LinkedIn **codés en dur** dans le footer au lieu de lire `Profile`. |
| US8 | Galerie & médias | ✅ | `cover_image` + galerie images + documents, conditionnels, projet lisible sans images. Mineur : agrandissement = ouverture nouvel onglet (pas de lightbox). |
| US9 | SEO / responsive / perf | ✅ | metadata + OpenGraph + `robots.ts` + `sitemap.ts` (projets inclus) + `generateMetadata` par projet ; responsive Tailwind ; `next/image`. À étendre aux futures pages (D ci-dessous). |

## Divergences décision ↔ code (à réconcilier, pas de simples bugs)

- **D1 — Base de données.** `settings.py` câble **PostgreSQL en dur** ; ADR-004 + `STACK.md` disent désormais **SQLite par défaut**, Postgres en réserve. → rendre l'`ENGINE` configurable, SQLite par défaut.
- **D2 — Stockage des artefacts.** ~~Divergence~~ **Résolue** (ADR-005 reformulé). Médias d'affichage (images, captures, CV, téléchargeables) → **media Django**, ce que le code fait déjà ; code + docs de conception → **GitHub** (liés). **Aucun changement de code requis.** Seule conséquence : `remotePatterns` doit autoriser le domaine cPanel en prod (déjà dans la dette infra).
- **D3 — Stratégie de rendu.** Tous les `fetch` utilisent **`cache: "no-store"`** ; ADR-003 dit **statique/ISR**. → remplacer par `revalidate`/ISR (le `sitemap.ts` utilise déjà `revalidate: 3600`, bon modèle). À valider contre Next 16 (`frontend/AGENTS.md`).

## Dette technique / infra hors-stories

- **Sécurité backend** : `DEBUG` défaut `True`, `SECRET_KEY` défaut faible, aucun durcissement prod (`SECURE_SSL_REDIRECT`, HSTS, cookies sécurisés).
- **`next.config.ts`** : `remotePatterns` codé en dur sur `localhost:8000` → casse en prod (front Vercel + back cPanel).
- **Tests** : aucun `TestCase` backend.
- **CI** : pas de `.github/workflows`.

## Backlog dev priorisé (daté 2026-06-24)

Ordre aligné sur l'étage dev de `sprint-owner.md`, ajusté par l'audit.

1. **Page Méthode** (US1) — réalise l'objectif n°1. Surface la démarche + liens artefacts/conventions.
2. **Fix hero « Disponible »** (piloté par donnée) **+ rendu Markdown** des champs riches (US2, US6).
3. **Bifurcation « Approfondir » + section Résultats** (US2, US3) — ajoute un champ `results` au modèle.
4. **Réalisations classées par catégorie** + libellé nav « Réalisations » + filtres (US5).
5. **Pages À propos + Contact** + footer piloté par `Profile` (US7).
6. **Aligner le rendu statique/ISR** (remplacer `no-store`, D3) — valider API Next 16.
7. **Aligner DB SQLite + durcir `settings.py` + `remotePatterns` via env** (D1 + dette infra).
8. **Tests contrat API + CI GitHub Actions** (ADR-008).
9. **Étendre sitemap/robots** aux nouvelles pages + déploiement (ADR-007).
