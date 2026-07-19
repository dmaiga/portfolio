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

- **Présentation narrative courte** de la méthode (Owner avant Dev : cadrage avant code, décisions tracées) — texte seul, sans liste de liens vers les fichiers du dépôt.
- **Décision (2026-07-19, cf. `docs/DECISIONS.md` ADR-010) :** la version précédente exposait une liste de liens vers `rules/ABOUT-ME.md`, `docs/sprints/`, `DECISIONS.md`, etc., ainsi qu'un bloc dédié au rôle des agents IA. Retirés : risque de mauvaise interprétation par un visiteur sans contexte sur la page la plus centrale du site. Le code et les artefacts de conception (`rules/`, `docs/`, ADR, sprints) restent consultables sur GitHub pour qui veut creuser, sans être mis en avant sur la page.

## Pages volontairement exclues

Blog, Veille, Newsletter, Journal personnel, page Méthode séparée — aucun objectif actuel ne les justifie.