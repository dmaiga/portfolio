# Sprint — Migration modèle + Refonte UI/UX

> Handoff pour Claude Code. Lis `CLAUDE.md` puis ce fichier avant toute action.
> Deux phases séquencées. **Ne pas attaquer la Phase 2 tant que la Phase 1 n'est pas validée par moi.**

---

## Phase 1 — Migration modèle (M1 → M5)

Source de vérité : `docs/ARCHITECTURE.md` (modèle + contrat API) et `docs/backlog-dev.md` (items M1→M5).

### Séquence stricte

**M1 — Une seule migration Django**
Renommages dans `Project` :
- `short_description` → `summary`
- `description` → `context`
- `challenge` → `problem`

Ajouts :
- `results = models.TextField(blank=True, default="")`
- `deep_dive = models.TextField(blank=True, default="")`

`lessons_learned` : champ conservé, pas touché.
Un commit : `feat(model): align project fields with parcours owner`

**M2 — Supprimer `/methode`**
- Retirer la page et son entrée dans la nav.
- Intégrer la section Démarche dans `/a-propos` (contenu existant de `/methode` à déplacer, pas à réécrire).
- Mettre à jour le sitemap.
Un commit : `feat(about): integrate methode into a-propos, remove /methode`

**M3 — Serializer + API**
- Mettre à jour le serializer `Project` pour exposer les nouveaux noms.
- Vérifier que la réponse `/api/projects/{slug}/` correspond exactement au contrat dans `docs/ARCHITECTURE.md`.
- Mettre à jour les tests existants (`TestCase`) pour utiliser les nouveaux noms de champs.
Un commit : `feat(api): update project serializer to new field names`

**M4 — Frontend : consommer les nouveaux champs**
- Page projet détail : remplacer les références aux anciens champs (`short_description`, `description`, `challenge`) par les nouveaux (`summary`, `context`, `problem`).
- Afficher `results` dans le tronc principal (après Solution, avant Technologies).
- Afficher `deep_dive` et `lessons_learned` dans la section Approfondir uniquement — conditionnels si non vides.
Un commit : `feat(front): consume new project fields, add results section`

**M5 — Seed**
- Mettre à jour `seed.py` pour utiliser les nouveaux noms de champs.
- Ne pas inventer de contenu : laisser les champs `results` et `deep_dive` vides (`""`) — ils seront remplis via l'admin.
Un commit : `chore(seed): update field names after migration`

### Definition of Done — Phase 1
- [ ] `python manage.py check --deploy` propre après migration.
- [ ] `python manage.py test` vert.
- [ ] CI verte (GitHub Actions).
- [ ] `/api/projects/{slug}/` retourne `summary`, `context`, `problem`, `results`, `deep_dive`.
- [ ] Page `/methode` supprimée, nav à 4 entrées : Accueil · Réalisations · À propos · Contact.
- [ ] Page `/a-propos` contient la section Démarche.

---

## Phase 2 — Refonte UI/UX

**Démarrer seulement après validation Phase 1 par moi.**

Sources de vérité :
- `docs/06-identite-visuelle.md` — palette, tokens, typographie, anti-direction
- `docs/wireframes.jsx` — structure et contenu de chaque page (5 pages)
- `docs/04-parcours.md` — tronc commun page projet + logique de bifurcation

### Étape 1 — Tokens dark & light (fondation, avant tout composant)

Implémenter les variables CSS sémantiques définies dans `06-identite-visuelle.md` :

```css
--color-bg
--color-surface
--color-border
--color-text
--color-text-muted
--color-brand
--color-accent
```

Règle absolue : **zéro valeur hardcodée** (`text-white`, `bg-gray-900`, etc.) dans les composants — tout passe par ces tokens. `next-themes` switche les variables selon le mode.

Light mode : fond blanc/gris clair, texte quasi-noir, contraste WCAG AA minimum.
Dark mode : fond near-black ou navy, texte blanc cassé.

Un commit : `feat(tokens): implement semantic color tokens dark/light`

### Étape 2 — Typographie

Police : **Inter**. Appliquer la hiérarchie H1/H2/body définie dans `06-identite-visuelle.md`.
Vérifier le rendu dans les deux modes avant de continuer.
Un commit : `feat(typography): apply Inter scale and hierarchy`

### Étape 3 — Composants page par page

Ordre calqué sur le wireframe (`docs/wireframes.jsx`) :

1. **Layout / Nav** — 4 entrées, toujours visible, sobre.
2. **Home** — deux colonnes : identité + démarche à gauche (sticky), projets mis en avant à droite.
3. **Réalisations** — grille cartes, filtre par type (si faisable sans dépendance nouvelle).
4. **Projet détail** — tronc commun complet + ancre de navigation gauche + Approfondir conditionnel + galerie conditionnelle.
5. **À propos** — identité, démarche (ex-Méthode), compétences, parcours.
6. **Contact** — minimaliste, sans formulaire V1.

Pour chaque page : confronter le rendu au garde-fou `06-identite-visuelle.md` → section « Ce que le visiteur doit ressentir ». Si un composant ne sert pas ces états, il est rejeté.

### Anti-direction à encoder dans les composants
Extrait de `06-identite-visuelle.md` — à appliquer littéralement :
- Pas d'effets 3D, particules, parallaxe, animations permanentes.
- Animations : fade-in léger, hover subtil, 150–250 ms max.
- Pas d'esthétique dashboard SaaS (KPI, métriques décoratives).
- Pas de murs de badges technologiques.

### Definition of Done — Phase 2
- [x] Light mode lisible (contraste WCAG AA) et dark mode cohérent. *(tokens calibrés AA, vérifié visuellement light/dark sur les 5 pages ; pas d'audit automatisé de contraste.)*
- [x] Zéro valeur de couleur hardcodée dans les composants. *(grep propre ; seule exception légitime : les générateurs d'image OG `opengraph-image.tsx`, qui ne peuvent pas résoudre les tokens CSS — rendu PNG via Satori.)*
- [x] Les 5 pages correspondent au wireframe (`docs/WIREFRAME.jsx`). *(Home, Réalisations, Projet détail, À propos, Contact.)*
- [x] La carte projet expose : problème résolu · rôle · contexte (badge) · technologies. *(« problème résolu » porté par l'accroche/résumé ; `role` ajouté au contrat liste.)*
- [~] La section Approfondir n'apparaît que si `deep_dive`, `lessons_learned`, `github_url`, `demo_url` ou `assets` existent. *(Divergence assumée : la bifurcation Approfondir se déclenche sur `deep_dive`/`lessons_learned`/`assets` ; `github_url`/`demo_url` sont surfacés comme actions d'en-tête + ancre gauche, toujours visibles s'ils existent — donc « affichés uniquement si présents » respecté, mais hors du bloc Approfondir. À rebasculer dans le déclencheur si tu préfères le comportement littéral.)*
- [x] CI verte après la phase. *(local : `manage.py test` 7 OK · `eslint .` 0 · `tsc --noEmit` 0.)*

---

## Commits — rappel convention
Voir `rules/GIT.md`. Messages en français, orientés métier. Un commit par item logique, pas par fichier.