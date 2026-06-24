# Sprint Owner — Cadrage rétroactif du portfolio

> Fichier de handoff destiné à Claude Code (terminal).
> Lis-le en entier avant toute action. Tu opères ici en **casquette facilitateur**, pas développeur.

---

## Pourquoi ce sprint

Le code du portfolio existe déjà et il est sain (analyses internes : propre, idiomatique, au-dessus de la moyenne). **On ne le réécrit pas.** Ce qui manque n'est pas du code : c'est l'**étage owner** — la couche d'intention (vision, objectifs, personas, parcours, backlog) qui n'a jamais été produite.

L'objectif de ce sprint : **produire cette couche owner, puis auditer le code existant contre elle.** Les écarts deviendront le backlog dev. C'est un exercice de cadrage *rétroactif* : documenter l'intention d'un système déjà construit, puis confronter le réel à l'intention.

---

## ⛔ Règle cardinale (ne jamais violer)

**Tu ne fabriques PAS le contenu owner.** La vision, les objectifs, les personas, les arbitrages sont *ma* pensée, pas la tienne. Si tu les inventes, tu sabotes l'objet même du portfolio (qui doit prouver que je *conçois*, pas que je sais générer du texte).

Pour chaque document owner :
1. Tu me poses 2–4 questions ciblées.
2. Tu attends mes réponses.
3. Tu rédiges un brouillon **à partir de mes réponses uniquement**.
4. Je valide ou corrige. On ne passe au document suivant qu'après validation.

Si une réponse te manque, tu demandes — tu ne combles pas par hypothèse.

---

## Mode opératoire

- **Un document à la fois**, dans l'ordre ci-dessous. Pas de génération en bloc.
- **Contrainte de longueur stricte : chaque fichier tient en un écran.** Si tu débordes, tu sur-documentes — coupe.
- **Langue : français.**
- **Tu ne touches AUCUN code pendant la phase owner.** Aucune édition, aucun refactor, aucune « petite amélioration » au passage.
- Tous les fichiers vont dans `docs/`.

---

## Livrables — ÉTAGE OWNER (dans l'ordre)

| Fichier | Contenu attendu | Cap longueur | Questions à me poser |
|---|---|---|---|
| `docs/00-vision.md` | Pour qui, quel problème, pourquoi moi. | 5 lignes | À quoi sert ce portfolio (bragsheet ? freelance ?) ? Quelle trajectoire raconter (Data Architect / CTO / Data Engineer) ? |
| `docs/01-stakeholders.md` | Tableau : acteur \| besoin \| pouvoir. | 1 écran | Qui regarde ce site (recruteur, client, moi-même) ? Que décide chacun ? |
| `docs/02-objectifs.md` | 3 objectifs **mesurables** max. | 3 lignes | Comment saurai-je que le portfolio a réussi ? (dont au moins un objectif « rendre la méthode visible ») |
| `docs/03-personas.md` | 1 à 2 personas, 4 lignes chacun. | 1 écran | Qui est le visiteur type ? Combien de temps passe-t-il ? Que cherche-t-il en 30 s ? |
| `docs/04-parcours.md` | Le parcours principal en étapes. | 1 écran | Que doit comprendre chaque persona, dans quel ordre, avant de partir ? |
| `docs/05-archi-info.md` | Arborescence du site **+ la page Méthode/Colophon manquante**. | 1 écran | Quelles pages ? Où s'insère la page qui surface mes `rules/`, `CLAUDE.md`, `docs/sprints/` ? |
| `docs/08-backlog.md` | User stories + **critères d'acceptation** (Definition of Done par item). | 1 écran/story | (rédigé à partir des docs précédents — me faire valider chaque critère) |

> Note d'arbitrage owner : pour un portfolio en lecture seule, l'architecture fonctionnelle (`07`) est triviale — on la fond dans `05` et `08` plutôt que d'en faire un fichier. Les wireframes (`06`) sont sans objet : l'UI est déjà construite. Assumer ces coupes *est* une décision d'owner ; ne les recrée pas « pour faire complet ».

---

## ── PASSATION owner → dev ──

Une fois l'étage owner validé par moi :

1. `docs/DECISIONS.md` — ADR léger. Pour chaque choix structurant : la décision, le pourquoi, les alternatives écartées. (Django headless ; `no-store` → statique/ISR ; etc.) C'est mon livrable le plus « architecte » : rédige-le à partir de mes réponses, pas de tes préférences.
2. **Audit du code existant contre les critères d'acceptation de `08-backlog.md`.** Tu listes les écarts. Cette liste d'écarts **EST le backlog dev**, datée et honnête.

---

## ÉTAGE DEV (seulement après validation de l'étage owner)

**On n'écrit pas le code à zéro.** On part de l'existant et on traite les écarts de l'audit, dans cet ordre :

1. Page Méthode/Colophon (= surfacer les docs owner ci-dessus)
2. Fix hero « Disponible » + rendu Markdown des champs riches
3. 4–5 `TestCase` sur le contrat API + CI GitHub Actions
4. Fix `remotePatterns` (env) + durcir `settings.py`
5. Déploiement (Django headless + Next statique/ISR)
6. Dataviz (vers Data Engineer/Architect)
7. Preuves projets, filtres, page À propos

> ⚠️ Valide les API de cache/statique contre **Next 16** (`frontend/AGENTS.md` signale des ruptures).

---

## Garde-fous de fond (cadrage produit — à respecter dans toute rédaction owner)

- **Bragsheet + trajectoire**, pas un état figé. Le portfolio raconte où je vais (Data Architect / CTO / Data Engineer).
- **Agents IA = trajectoire à cultiver, montrée et non proclamée.** Pas de titre de héros « orchestrateur IA ». La preuve est dans les artefacts (`rules/`, sprints), pas dans un slogan.
- **Autonomie de bout en bout = force à raconter**, pas faiblesse à cacher (analyse → archi → dev → déploiement → maintenance, en solo).
- **Honnêteté sur le niveau.** Une trajectoire crédible vaut mieux qu'un titre gonflé.

---

## Definition of Done — Sprint owner

- [ ] Les 7 fichiers owner existent, chacun tient en un écran, chacun validé par moi.
- [ ] Chaque user story de `08-backlog.md` a des critères d'acceptation écrits.
- [ ] `docs/DECISIONS.md` créé à partir de mes réponses.
- [ ] L'audit code-vs-critères est produit sous forme de backlog daté.
- [ ] **Zéro ligne de code modifiée** pendant ce sprint.
- [ ] Le `README` pointera (étape dev) vers `docs/` dans l'ordre, section « Comment ce projet a été construit ».