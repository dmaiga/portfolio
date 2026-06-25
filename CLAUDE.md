# CLAUDE.md

## Rôle de ce fichier

**Orchestration pure.** Ce fichier dit *où* est la vérité et *comment* travailler — il ne duplique aucun contenu. Tout détail vit dans le fichier référencé. Si tu hésites entre recopier une info ici ou pointer vers son fichier : **pointe**.

---

## Le projet en une ligne

Portfolio professionnel (Django REST headless + Next.js) servant de **bragsheet** et de démonstration d'une **trajectoire** vers Data Architect / CTO / Data Engineer. La maîtrise des agents IA s'y *montre*, ne s'y proclame pas.

---

## Sources de vérité (ne jamais dupliquer — toujours référencer)

| Fichier | Autorité sur |
|---|---|
| `docs/00-vision.md` … `docs/08-backlog.md` | **Couche owner** : vision, objectifs, personas, parcours, archi info, backlog + critères d'acceptation. **Source de vérité de l'INTENTION.** |
| `docs/architecture.md` | Archi **technique**, modèle de données, contrat API, gestion des erreurs. |
| `docs/DECISIONS.md` | Journal des décisions (ADR léger) : décision, pourquoi, alternatives écartées. |
| `rules/STACK.md` | Stack officielle, dépendances autorisées / interdites. |
| `rules/ABOUT-ME.md` | Qui est l'auteur, **et la posture d'interaction attendue**. |
| `rules/GIT.md` | Convention de commits. |
| `docs/sprints/sprint-*.md` | Tâches détaillées, sprint par sprint. |

---

## Phase actuelle : Sprint dev — Migration modèle + Refonte UI/UX

Sprint owner **clos et validé**. La couche owner (`docs/00` → `docs/08`) est la source de vérité de l'intention — ne pas la modifier sans accord explicite de l'auteur.

Brief complet du sprint en cours : **`docs/sprints/sprint-model-ui.md`**.

Séquence à respecter :
- **Phase 1 d'abord** (M1 → M5 : migration modèle, serializer, front, seed, suppression `/methode`).
- **Phase 2 seulement après validation Phase 1** par l'auteur (tokens → typographie → composants page par page).
- CI verte à chaque fin de phase avant de continuer.

---

## Règles permanentes

1. **On ne réécrit pas le code from scratch.** Le code existant est sain. On l'**audite** contre les critères d'acceptation de `docs/08-backlog.md` ; la liste des écarts *est* le backlog dev.
2. **Posture d'interaction : voir `rules/ABOUT-ME.md`.** Non complaisant, nuancé, challenge les hypothèses, présente les compromis. Pas de validation réflexe.
3. **Commits : voir `rules/GIT.md`.** Messages en français, orientés métier, regroupés par fonctionnalité (jamais par fichier). L'historique Git est une source documentaire, pas qu'un versionneur — il doit alimenter les rapports d'activité. Ne commite pas chaque modification : un commit = une évolution cohérente.
4. **Stack : voir `rules/STACK.md`.** Toute nouvelle dépendance se justifie explicitement. Par défaut : simplicité, pas d'abstraction prématurée.
5. **Anti-duplication.** Une info qui existe déjà dans un fichier se référence, ne se recopie pas. Toute divergence entre deux fichiers est un bug de documentation.