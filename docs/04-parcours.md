# 04 — Parcours

Cibles, par priorité : **moi > pairs > recruteurs / prospects**.

## Entrées
- **Accueil** = découvrir le portfolio (entrée principale, lien envoyé / promo).
- **Page projet** = démontrer une réalisation, et **autonome** : qui arrive via GitHub, LinkedIn, un CV ou un partage entre pairs doit comprendre le projet **sans passer par l'accueil**.

## Tronc commun d'une page projet
`Résumé → Contexte → Problème → Solution → Résultats → Technologies → Approfondir`

La bifurcation se fait après les Résultats, par un seul appel : **« Voir les détails techniques / Approfondir »**. Le recruteur peut partir ici ; le pair continue.

## Le pair (creuse)
Veut comprendre **comment le projet a été pensé et construit**, pas lire du marketing.
Chemin : `Contexte → Problème → Analyse/cadrage → Architecture → Implémentation → Résultat → Code/artefacts`.
Atteint **en ≤ 3 clics** : GitHub, démo, architecture, décisions (ADR), documents de cadrage, sprints.
**Part si** : uniquement des captures, *ou* uniquement du code, *ou* uniquement du discours marketing — il ne peut rien creuser.

## Le recruteur (s'arrête tôt)
Chemin court : `Projet → Contexte → Ce qui a été réalisé → Technologies → Résultats → Contact ou projet suivant`.
**Part si** : jargon immédiat, diagrammes sans explication, mur de texte, ou s'il doit lire GitHub pour comprendre le projet.

## Bloc « Approfondir » (cible du ≤ 3 clics, pour le pair)
Pas de pages/templates dédiés par artefact. Deux registres :
- **Texte inline** sur la page projet : vision, objectifs, sprints — expliqués.
- **Artefacts joints** : architecture fonctionnelle, architecture technique, fichiers de sprint réels, ADR/décisions — **lisibles dans le navigateur** (rendu Markdown / PDF embarqué), **téléchargeables si on le souhaite**.

Stockage des artefacts et du code : **GitHub uniquement**. Liens GitHub / Démo inclus.
Toutes ces entrées sont **affichées seulement si elles existent** pour le projet (pas de lien mort).
