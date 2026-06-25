# Backlog dev — audit code vs `08-backlog.md`

> Audit initial : **2026-06-24**. Lecture seule, zéro modification de code.
> Méthode : chaque user story de `08-backlog.md` confrontée au code existant (backend Django + frontend Next 16).
> Légende : ✅ fait · ◑ partiel · ❌ manquant.
>
> **Mise à jour 2026-06-24 — les 9 items du backlog priorisé sont traités et committés.** Statuts ci-dessous reflétés.

## Synthèse

Le code est sain et la fondation solide : modèle de données complet (`Profile`, `Skill`, `Project` avec les 4 `ProjectType`, `ProjectAsset` typé), API REST propre, SEO déjà câblé, responsive et `next/image` en place. **Les écarts ne sont pas des défauts de qualité** : ce sont surtout (1) des pages d'intention jamais créées (Méthode, À propos, Contact), (2) le parcours « Approfondir » non matérialisé, et (3) trois divergences entre les décisions (`DECISIONS.md`) et le code. **Tous traités (voir statuts).**

## État par user story

| US | Sujet | Statut | Résolution |
|---|---|---|---|
| US1 | Page Méthode | ✅ | Page `/methode` + nav + sitemap (`2464895`). |
| US2 | Page projet autonome | ✅ | Section Résultats + champ `results` + relabel Contexte + rendu Markdown (`b07cf6d`, `38b9e29`, `9a02abc`). |
| US3 | Bifurcation « Approfondir » | ✅ | Point de bifurcation unique avant galerie/documents (`38b9e29`). |
| US4 | Artefacts creusables | ✅ | Galerie/documents conditionnels, stockage media Django conforme (ADR-005). *Reste optionnel : PDF embarqué/lightbox (non bloquant).* |
| US5 | Réalisations classées | ✅ | Sections par catégorie + nav « Réalisations » (`30437ca`). *Filtres : reportés (bonus).* |
| US6 | Accueil orienteur | ✅ | Badge « Disponible » retiré, mène à Méthode (`9a02abc`, nav). |
| US7 | À propos & Contact | ✅ | Pages `/a-propos` + `/contact` + footer piloté par `Profile` (`e0f1d04`, `706dbbd`). |
| US8 | Galerie & médias | ✅ | Déjà en place (cover + galerie + documents conditionnels). |
| US9 | SEO / responsive / perf | ✅ | + `metadataBase`, sitemap étendu aux nouvelles pages (`510a753`). |

## Divergences décision ↔ code

- **D1 — Base de données.** ✅ **Résolue** : SQLite par défaut, PostgreSQL en réserve via `DB_ENGINE` (`77eb03d`).
- **D2 — Stockage des artefacts.** ✅ **Résolue** (ADR-005 reformulé) : media Django pour l'affichage, GitHub pour code/conception. Aucun changement de code requis.
- **D3 — Stratégie de rendu.** ✅ **Résolue** : `no-store` → `revalidate: 3600` (ISR) + `generateStaticParams` (`bda1776`).

## Dette technique / infra hors-stories

- **Sécurité backend** : ✅ durcissement gated par `not DEBUG` (SSL, HSTS, cookies, nosniff, X-Frame) — `check --deploy` propre (`77eb03d`).
- **`next.config.ts`** : ✅ `remotePatterns` piloté par `NEXT_PUBLIC_API_URL` (`dacb72d`) + fix images locales Next 16 (`47fe771`).
- **Tests** : ✅ 7 `TestCase` sur le contrat API (`bdf222d`).
- **CI** : ✅ GitHub Actions (tests backend + lint/types frontend) (`828314e`).

## Backlog dev priorisé (daté 2026-06-24) — **terminé**

1. ✅ **Page Méthode** (US1) — `2464895`.
2. ✅ **Fix hero « Disponible » + rendu Markdown** (US2, US6) — `9a02abc`.
3. ✅ **Bifurcation « Approfondir » + section Résultats** (US2, US3) — `b07cf6d`, `38b9e29`.
4. ✅ **Réalisations classées par catégorie** + nav « Réalisations » (US5) — `30437ca`. *(filtres : reportés)*
5. ✅ **Pages À propos + Contact + footer piloté par `Profile`** (US7) — `e0f1d04`, `706dbbd`.
6. ✅ **Rendu statique/ISR** (D3) — `bda1776`.
7. ✅ **DB SQLite + durcir `settings.py` + `remotePatterns`** (D1 + dette) — `77eb03d`, `dacb72d`.
8. ✅ **Tests contrat API + CI** (ADR-008) — `bdf222d`, `828314e`.
9. ✅ **SEO étendu + guide de déploiement** (ADR-007) — `510a753`, `159d179`.

## Hors périmètre de ce backlog (à traiter ensuite)

Ces points, identifiés par les analyses `input/`, **ne sont pas** dans le backlog dev (relèvent du contenu owner ou d'une phase ultérieure) : preuves projets (liens GitHub, captures, assets réels), dataviz/couche Data, filtres/recherche, contenu « À propos » à rédiger, déploiement effectif, ajout des POC/MVP/prod réels au seed. Voir `input/analyse_comparative_2026-06-24.md`.

---

## Backlog — prochaine vague (2026-06-25)

| Réf | Item | Statut | Dépendances |
|---|---|---|---|
| M1 | **Migration modèle Project** — renommage `short_description→summary`, `description→context`, `challenge→problem` + ajout `results` (TextField) et `deep_dive` (TextField, Markdown) | ❌ | Une migration, un commit `feat(model): align project fields with parcours` |
| M2 | **Supprimer /methode** — retirer la page et la nav entry ; intégrer la section Démarche dans `/a-propos` | ❌ | `05-archi-info.md` mis à jour (2026-06-25) |
| M3 | Serializer + API — exposer les nouveaux champs (`summary`, `context`, `problem`, `results`, `deep_dive`) | ❌ | Après M1 |
| M4 | Front — consommer les nouveaux champs sur la page projet détail | ❌ | Après M3 |
| M5 | Seed — repeupler avec les nouveaux noms de champs + contenu réel | ❌ | Après M1 · owner |

> **Note M1 :** "relabel Contexte" dans l'entrée US2 ci-dessus était un relabel d'affichage front (label `description` → `Contexte`), pas un rename DB. Le rename DB reste à faire dans M1.