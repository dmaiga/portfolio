# 05 — Architecture de l'information

**Navigation principale :** `Accueil | Réalisations | Méthode | À propos | Contact`

## Arborescence

```
/                         Accueil — qui je suis, ce que je fais, pourquoi consulter mes réalisations
/realisations             Liste classée par catégorie
   ├── Expériences professionnelles
   ├── Consultations ponctuelles
   ├── Projets académiques
   └── Projets personnels
/realisations/[slug]      Page projet autonome (cf. 04 : tronc commun + Approfondir)
/methode                  Démarche de conception/réalisation — pièce centrale
/a-propos                 Parcours détaillé, positionnement, domaines d'intérêt
/contact                  Moyens de contact, CV, GitHub, LinkedIn
```

L'architecture fonctionnelle du site se résume à cette arborescence (site en lecture seule) — pas de fichier dédié.

## Page Méthode (réalise l'objectif n°1)

Répond à : *« comment ce portfolio et les projets ont-ils été conçus et réalisés ? »*. **Approche hybride** : explication courte + accès direct aux artefacts (ni index brut, ni long récit).

- **La démarche projet** : Vision → Analyse → Objectifs → Personas → Architecture → Backlog → Sprints → Livraison.
- **Les conventions** : `rules/ABOUT-ME.md`, `rules/GIT.md`, `rules/STACK.md`.
- **Les artefacts** : `architecture.md`, `CLAUDE.md`, `docs/sprints/`, décisions d'architecture, backlog (liens GitHub).
- **Le rôle des agents IA** : outils de production, de revue et de réflexion — ils génèrent du contenu technique mais ne remplacent ni les décisions produit, ni les choix d'architecture, ni la validation finale. **Montré dans le processus, pas proclamé.**

## Pages volontairement exclues

Blog, Veille, Newsletter, Journal personnel — aucun objectif actuel ne les justifie.
