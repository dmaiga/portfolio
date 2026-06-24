# Sprint 04 — Identité Visuelle & Distinction

Contexte déjà chargé via CLAUDE.md (@docs/architecture.md, @rules/STACK.md) — pas de re-définition ici.

## Périmètre

* Distinction visuelle des pages déjà fonctionnelles et responsives (Sprint 03).
* Sert à mieux satisfaire les User Stories existantes (US1, US3, US4 surtout) — aucune nouvelle US, aucune nouvelle page.

## Hors de ce périmètre (déjà couvert ailleurs — ne pas redéfinir)

* Responsive — Sprint 03.
* Animations génériques (fade-in, slide-in, apparition progressive) — Sprint 03.
* Timing des micro-interactions (hover, focus, 150–300ms) — fusionné dans Sprint 03, pas dupliqué ici.

## Champ déjà tranché : project_type

`architecture.md` définit désormais `project_type` (PROFESSIONAL / CONSULTING / ACADEMIC / PERSONAL) sur `Project` — remplace ma proposition initiale `category`/`status`, meilleur choix (un seul champ, colle à la réalité : emploi ANTARES, missions de conseil, projets académiques Master 2, side projects). Nécessite la même migration légère sur le backend Sprint 1.

## SEO & OG

Ajouté à ce sprint : valeur réelle pour ce portfolio précis (la plupart des partages se font en lien direct — CV, email, LinkedIn — jamais via recherche Google). L'aperçu de lien est la première impression, avant même le clic (US1). Tout ce qui suit est natif Next.js App Router, zéro dépendance ajoutée.

* **OG image statique du site** (priorité) — `app/opengraph-image.tsx`, fallback pour tout le site. Couvre le cas le plus fréquent : partage du lien racine.
* **Metadata par page** — title + description pour Home, Projects, Project Detail. Title template : `%s | Mahamane Daouda Maiga`.
* **OG image dynamique par projet** (optionnel, si le temps le permet) — `app/projects/[slug]/opengraph-image.tsx`, génère une image avec titre + `project_type`. Utile pour le partage direct d'un projet précis à un recruteur ; montre aussi une maîtrise spécifique de Next.js (`next/og`), pas juste générique React.
* **sitemap.ts + robots.ts** — conventions natives, coût quasi nul.

## Palette de couleurs

* Définir primaire / secondaire / accent.
* Inspiration : Stripe, Linear, Vercel, Supabase.
* Éviter : trop de couleurs, couleurs saturées, gradients agressifs.

## Typographie

* Hiérarchie claire des titres.
* Cohérence entre pages.

## Hero Section (Home)

* Présentation du profil, CTA, domaines d'expertise.
* Badges, éléments visuels subtils.
* Statistiques — à préciser avant implémentation : si ce sont des compteurs dérivés des données existantes (nombre de projets, nombre de compétences), rien à modéliser. Si ce sont des métriques métier (années d'expérience, volumétrie traitée), il faut d'abord créer le champ correspondant — pas à improviser pendant le sprint.

## Cartes Projets

* Ombres, bordures, hover states (timing : cf. Sprint 03).
* Mise en avant visuelle des projets featured.
* Badges technologies — déjà disponible via la relation `Skill` existante, pas de nouveau champ.
* Badge `project_type` (Professionnel / Conseil / Académique / Personnel) — signale d'un coup d'œil le contexte de réalisation, sert directement US4 (crédibilité).

## Icônes

* Lucide Icons — déjà présent via shadcn/ui depuis Sprint 02, pas une nouvelle dépendance.
* Usage : contact, technologies, expériences, projets.

## Livrables

* Home : hero modernisé, sections mieux espacées, identité visuelle cohérente.
* Liste des projets : cartes enrichies, catégories visibles, badges technologiques.
* Détail projet : meilleure hiérarchie, galerie d'assets, mise en avant des documents.
* OG image statique + metadata par page + sitemap/robots.
* OG image dynamique par projet (si le temps le permet).

## Hors périmètre

Ne pas ajouter : blog, authentification, dashboard admin, CMS, internationalisation.

## Critères d'acceptation

* Identité visuelle cohérente sur les 3 pages (palette et typographie partagées, pas de divergence d'une page à l'autre).
* Les projets featured ressortent visuellement sans ambiguïté.
* Badge `project_type` visible et lisible sur chaque carte projet.
* Aucune dépendance ajoutée (Lucide déjà présent, OG/sitemap natifs Next.js).
* Rendu mobile vérifié, pas juste supposé hérité de Sprint 03.
* Un partage du lien racine (LinkedIn, Slack, etc.) affiche une image et un texte personnalisés, pas un aperçu vide ou cassé.