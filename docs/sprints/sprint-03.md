# Sprint 03 — UI/UX

Contexte déjà chargé via CLAUDE.md (@docs/architecture.md, @rules/STACK.md) — pas de re-définition ici.

## Périmètre

* Polish des pages déjà livrées en Sprint 02 (Layout, Home, Projects, Project Detail). Aucune nouvelle page, aucune nouvelle donnée consommée.
* Responsive abouti — Sprint 02 ne garantissait qu'un minimum non cassé.
* Dark mode via `next-themes` (cf. STACK.md → UI, justification documentée là-bas).
* Animations légères via `tailwindcss-animate` (déjà présent depuis Sprint 02, aucune nouvelle dépendance).

## Points de vigilance

* **Project Card est probablement dupliqué** (Home + Projects) depuis Sprint 02. Y appliquer le theming et le responsive dans les deux fichiers serait la 3e modification du même pattern — c'est le seuil du Rule of Three posé en début de projet. Si dupliqué : extraire `<ProjectCard>` en composant partagé *avant* d'y toucher, pas après.
* **`prefers-reduced-motion`** : respecter ce media query, désactiver/réduire les animations si l'utilisateur l'a activé au niveau OS. Coût faible, cohérent avec l'objectif du portfolio (démontrer de la rigueur, pas juste du visuel).

## Travail demandé

1. Auditer chaque page Sprint 02 aux breakpoints mobile / tablette / desktop, corriger ce qui casse.
2. Installer et configurer `next-themes` ; toggle dark mode dans le Layout.
3. Définir les tokens de couleur clair/sombre (variables CSS shadcn/ui).
4. Si Project Card est dupliqué : extraire le composant avant le theming.
5. Ajouter des transitions légères (hover, apparition au scroll) via `tailwindcss-animate`.
6. Respecter `prefers-reduced-motion`.

## Critères d'acceptation

* Aucune page cassée à 375px, 768px, 1280px.
* Toggle dark mode fonctionnel, persiste après rechargement, pas de flash du mauvais thème au premier rendu.
* Animations visibles mais discrètes, désactivées si `prefers-reduced-motion` est actif.
* Aucune dépendance ajoutée hors `next-themes` (déjà justifiée dans STACK.md).