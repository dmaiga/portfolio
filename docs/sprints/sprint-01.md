# Sprint 01 — Backend API

Contexte complet déjà chargé via CLAUDE.md (@docs/architecture.md, @rules/STACK.md, @rules/ABOUT-ME.md) — pas de re-définition ici.

## Périmètre

* Backend uniquement. Le frontend Next.js n'est pas démarré (Sprint 2).
* Pas d'authentification (cf. STACK.md → Authentification).
* Couvre les 4 modèles définis dans architecture.md : Profile, Skill, Project, ProjectAsset.

## Travail demandé

1. Créer l'application Django `portfolio`.
2. Créer les modèles (cf. architecture.md → Modèle de Données).
3. Créer les serializers DRF.
4. Créer les vues DRF.
5. Créer les routes API (cf. architecture.md → Contrat API).
6. Enregistrer les modèles dans l'administration Django.
7. Ajouter les configurations nécessaires dans settings.py.
8. Générer et appliquer les migrations.
9. Fournir les commandes d'installation.
10. Fournir l'arborescence finale du projet.

## Critères d'acceptation

Le sprint est terminé si :

* `python manage.py runserver` démarre sans erreur.
* les migrations s'appliquent sans erreur.
* l'administration Django permet de gérer les données.
* les endpoints REST répondent correctement.
* les projets retournent leurs compétences et leurs ressources associées.
* le code respecte les conventions Django et DRF.