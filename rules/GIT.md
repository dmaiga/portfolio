# GIT.md

## Objectif

Git est utilisé comme outil de traçabilité technique et fonctionnelle.

L'historique doit permettre de comprendre :

* les évolutions du système ;
* les décisions prises ;
* les fonctionnalités développées ;
* les problèmes résolus ;
* les impacts métier des changements.

Les commits servent également de base pour les rapports hebdomadaires, mensuels et annuels.

---

## Langue

Les messages de commit sont rédigés en français.

---

## Convention

Format recommandé :

```text
type(module): résumé du changement

- évolution réalisée
- évolution réalisée
- évolution réalisée

But : impact métier ou objectif recherché
```

---

## Types de commits

### feat

Nouvelle fonctionnalité

```text
feat(surveillance): création du module de supervision commerciale et contrôle des prix
```

### fix

Correction ou ajustement

```text
fix(formulaires,paiement-fournisseur): alignement du workflow de paiement avec les réalités terrain
```

### refactor

Réorganisation technique sans changement fonctionnel majeur

```text
refactor(stock): simplification du workflow de distribution
```

### docs

Documentation

```text
docs(architecture): mise à jour de la documentation fonctionnelle
```

---

## Philosophie

Ne pas commiter chaque modification.

Un commit doit représenter :

* une évolution cohérente ;
* une fonctionnalité terminée ;
* une correction significative ;
* une décision métier importante.

Privilégier des commits orientés métier plutôt qu'orientés fichiers.

Préférer :

```text
feat(paie): automatisation du calcul des incentives
```

à :

```text
update(models,views,templates)
```

---

## Description des commits

Lorsque le changement est important, documenter :

* ce qui a été réalisé ;
* pourquoi cela a été réalisé ;
* l'impact attendu.

Exemple :

```text
feat(surveillance): création du module de supervision commerciale

- suivi des performances par superviseur
- détection des ventes sous prix d'achat
- analyse comparative semaine/mois

But : permettre à la direction de détecter rapidement les anomalies commerciales.
```

---

## Ce qu'un LLM doit retenir

* Proposer des commits regroupés par fonctionnalité.
* Utiliser des messages orientés métier.
* Éviter les commits vagues ou génériques.
* Conserver suffisamment de détails pour permettre la génération de rapports d'activité à partir de l'historique Git.
* Considérer Git comme une source documentaire du projet et non uniquement comme un système de versionnement.
