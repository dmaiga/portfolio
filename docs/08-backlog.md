# 08 — Backlog (user stories + critères d'acceptation)

Dérivé de `00`→`05`. Chaque critère est la **Definition of Done** de l'item ; il servira de grille à l'audit du code existant. Priorité : ce qui réalise l'objectif n°1 (méthode visible) d'abord.

---

## US1 — Page Méthode *(objectif n°1, prioritaire)*
*En tant que pair ou recruteur, je veux comprendre comment ce portfolio et les projets ont été conçus, afin de juger la démarche et pas seulement le résultat.*
- [ ] Accessible depuis la **nav principale** (pas en pied de page).
- [ ] Approche **hybride** : explication courte de la démarche + accès direct aux artefacts (ni index brut, ni long récit).
- [ ] Présente la démarche projet : Vision → Analyse → Objectifs → Personas → Architecture → Backlog → Sprints → Livraison.
- [ ] Liens vers les conventions (`rules/ABOUT-ME.md`, `GIT.md`, `STACK.md`) et artefacts (`architecture.md`, `CLAUDE.md`, `docs/sprints/`, ADR, backlog) — sur GitHub.
- [ ] Le rôle des agents IA est **montré dans le processus**, jamais réduit à un slogan.

## US2 — Page projet autonome
*En tant que visiteur arrivant via GitHub/LinkedIn/CV/partage, je veux comprendre un projet sans passer par l'accueil.*
- [ ] La page se lit seule (contexte, problème, solution, résultats présents).
- [ ] Tronc commun ordonné : `Résumé → Contexte → Problème → Solution → Résultats → Technologies → Approfondir`.
- [ ] Compréhensible **sans explication orale** (objectif 2 ; validation par retours de vive voix).
- [ ] **Aide-mémoire (objectif 3)** : le quoi/pourquoi est lisible immédiatement via les docs liés, sans recherche externe — je retrouve le contexte en **< 30 s**.

## US3 — Bifurcation « Approfondir »
*En tant que recruteur, je veux pouvoir m'arrêter tôt ; en tant que pair, pouvoir continuer à creuser.*
- [ ] Un seul point de bifurcation **après les Résultats** (« Voir les détails techniques / Approfondir »).
- [ ] Avant la bifurcation : aucun jargon imposé, aucun diagramme sans explication, pas de mur de texte.
- [ ] Le recruteur comprend le projet **sans devoir lire GitHub**.

## US4 — Artefacts creusables
*En tant que pair, je veux atteindre les vrais artefacts et le code rapidement.*
- [ ] Vision/objectifs/sprints en **texte inline** ; archi fonctionnelle/technique, sprints réels, ADR en **artefacts joints**.
- [ ] Artefacts **lisibles dans le navigateur** (Markdown rendu / PDF embarqué) **et téléchargeables** au choix.
- [ ] Stockage et code : **GitHub uniquement**. Liens GitHub/Démo présents.
- [ ] Chaque artefact atteignable en **≤ 3 clics** depuis la page projet (objectif 1).
- [ ] **Affichage conditionnel** : un lien n'apparaît que si l'artefact existe (zéro lien mort).

## US5 — Réalisations classées
*En tant que visiteur, je veux parcourir les réalisations par nature.*
- [ ] Liste classée en 4 catégories : Expériences professionnelles, Consultations ponctuelles, Projets académiques, Projets personnels.
- [ ] Chaque entrée mène à sa page projet autonome (US2).

## US6 — Accueil orienteur
*En tant que visiteur, je veux saisir vite qui tu es et pourquoi consulter tes réalisations.*
- [ ] Répond en un écran à : qui je suis, ce que je fais, pourquoi consulter mes réalisations.
- [ ] Mène vers Réalisations et Méthode.

## US7 — À propos & Contact
*En tant que recruteur/prospect, je veux le profil détaillé et de quoi te joindre.*
- [ ] À propos : parcours détaillé, positionnement, domaines d'intérêt.
- [ ] Contact : moyens de contact, **CV**, **GitHub**, **LinkedIn**.

## US8 — Galerie & médias du projet
*En tant que visiteur, je veux un visuel d'accroche du projet ; en tant que pair, voir les schémas (archi, BD…).*
- [ ] Chaque projet a une **image d'illustration** (vignette dans la liste Réalisations, visuel en tête de page projet).
- [ ] La page projet propose une **galerie d'images** : architecture, schémas de base de données, captures, etc.
- [ ] Images **lisibles dans le navigateur** (agrandissement) ; pas de média indispensable à la compréhension du texte (le projet reste lisible sans images — cf. US3).

## US9 — Qualité : SEO, responsive, performance
*En tant que site public et promu, je dois être trouvable, lisible partout et rapide.*
- [ ] **Responsive** : lisible et navigable sur mobile et desktop.
- [ ] **SEO** : balises meta/titre par page, Open Graph (partage de lien), sitemap.
- [ ] **Performance** : chargement rapide, images optimisées (cohérent avec US8).
