# 05 — Architecture de l'information

**Navigation principale :** `Accueil | Réalisations | À propos | Contact`

## Arborescence

```
/                         Accueil — qui je suis, ce que je fais, pourquoi consulter mes réalisations
/realisations             Liste classée par catégorie
   ├── Expériences professionnelles
   ├── Consultations ponctuelles
   ├── Projets académiques
   └── Projets personnels
/realisations/[slug]      Page projet autonome (cf. 04 : tronc commun + Approfondir)
/a-propos                 Parcours, compétences, démarche de conception (voir ci-dessous)
/contact                  Moyens de contact, CV, GitHub, LinkedIn
```

L'architecture fonctionnelle du site se résume à cette arborescence (site en lecture seule) — pas de fichier dédié.

> **Décision (2026-06-25) :** pas de page `/methode` séparée. La démarche est intégrée dans la page `/a-propos`, visible par tous les visiteurs sans clic supplémentaire. Une page dédiée diluait le message en le cachant derrière un lien que peu de visiteurs empruntent.

## Section Démarche dans À propos (remplace la page Méthode)

Répond à : *« comment ce portfolio et les projets ont-ils été conçus et réalisés ? »*.

- **La démarche projet** : Vision → Analyse → Objectifs → Personas → Architecture → Backlog → Sprints → Livraison.
- **Les conventions** : `rules/ABOUT-ME.md`, `rules/GIT.md`, `rules/STACK.md`.
- **Les artefacts** : `architecture.md`, `CLAUDE.md`, `docs/sprints/`, décisions d'architecture, backlog (liens GitHub).
- **Le rôle des agents IA** : outils de production, de revue et de réflexion — ils génèrent du contenu technique mais ne remplacent ni les décisions produit, ni les choix d'architecture, ni la validation finale. **Montré dans le processus, pas proclamé.**

## Pages volontairement exclues

Blog, Veille, Newsletter, Journal personnel, page Méthode séparée — aucun objectif actuel ne les justifie.