# 06 — Identité visuelle

## Intention

Le portfolio ne doit pas ressembler à un portfolio de designer.

Il doit inspirer confiance, rigueur, clarté et professionnalisme.

L'objectif n'est pas d'impressionner par des animations ou des effets visuels, mais de donner envie d'explorer les projets et leur démarche de conception.

Chaque choix visuel doit pouvoir être justifié par les adjectifs directeurs. Si un élément est spectaculaire mais nuit à la compréhension, il est rejeté.

---

## Ton du site

**Adjectifs directeurs :** Méthodique · Crédible

**Adjectifs secondaires :** Transparent · Moderne · Pragmatique

---

## Palette

Répartition cible : **80 % neutres — 15 % bleu — 5 % accent cyan**

La couleur doit guider la lecture, pas décorer.

| Rôle | Couleur | Signal |
|---|---|---|
| Principale | Bleu profond | Confiance · Ingénierie · Stabilité |
| Neutre | Gris neutres | Sobriété · Lisibilité |
| Accent | Turquoise / cyan discret | Technologie · Modernité · Données |

---

## Tokens dark & light

`next-themes` switche ces variables automatiquement. Toutes les couleurs du codebase passent par ces tokens — jamais de valeur hardcodée (`text-white`, `bg-gray-900`).

```css
--color-bg            /* fond de page               */
--color-surface       /* cartes, sections            */
--color-border        /* bordures, séparateurs       */
--color-text          /* corps de texte principal    */
--color-text-muted    /* texte secondaire            */
--color-brand         /* bleu principal              */
--color-accent        /* cyan                        */
```

**Light mode :** fond blanc ou gris très clair, texte quasi-noir, bleu et cyan saturés mais pas criards.
**Dark mode :** fond near-black ou navy, texte blanc cassé, bleu et cyan légèrement désaturés pour ne pas agresser.

Le light mode doit être lisible par défaut — texte/fond à contraste WCAG AA minimum. C'est la contrainte qui réglait le problème de lisibilité signalé en v1.

---

## Typographie

**Police :** Inter (lisibilité, standard SaaS moderne, adaptée aux deux modes)

| Niveau | Rôle |
|---|---|
| H1 | Fort, peu de mots — accroche immédiate |
| H2 | Structure les sections |
| Body | Aéré, lisible, sans jargon inutile |

---

## Références visuelles

### Identité (ton, hiérarchie, esprit)

**linear.app** — référence principale d'identité
Hiérarchie visuelle tranchée, espace généreux, cartes discrètes, très peu de couleurs. Inspire confiance sans effort de séduction. C'est l'esprit Consultant / Architecte que ce portfolio vise.

**vercel.com**
Qualité typographique, contenu au premier plan, navigation sans friction.

**stripe.com/docs**
Organisation de l'information technique, lecture confortable, progression naturelle. Référence pour les pages de détail projet (beaucoup de texte, bien hiérarchisé).

### Layout (structure, grille)

**brittanychiang.com (v4)**
→ https://v4.brittanychiang.com
Référence de *layout uniquement* : deux colonnes, sobriété, projets au centre. À ne pas prendre comme référence d'identité — elle reste dans le registre portfolio personnel de développeur, pas Consultant / Architecte / Data Engineer.

---

## Ce que le visiteur doit ressentir

Garde-fou pour tout futur choix UX. Si un composant, une page ou une interaction ne sert pas ces états, il est rejeté.

**Après 30 secondes :**
- Je comprends qui est cette personne.
- Je comprends ce qu'elle sait faire.
- Je vois des preuves concrètes.
- Je sais où approfondir.

**Après 5 minutes :**
- Je comprends sa méthode.
- Je comprends ses décisions.
- Je comprends sa manière de résoudre un problème.

---

## Composants visuels

### Carte projet
Ce que le visiteur doit percevoir en moins de 5 secondes :

- **Quel problème a été résolu** — pas le nom du projet
- **Quel a été le rôle** — décideur, architecte, exécutant ?
- **Dans quel contexte** — pro, consulting, académique, perso
- **Avec quelles technologies**

La carte n'est pas une vignette décorative. C'est une accroche qui décide si le visiteur clique ou passe.
Pas d'image seule sans contexte. Le texte porte le sens, l'image (si elle existe) l'illustre.

### Badges
Utilisés pour typer le contexte de chaque projet :
`Professional` · `Consulting` · `Academic` · `Personal`

Les badges orientent la lecture — ils ne décorent pas.

### Navigation
Toujours visible. Accès direct à : **Réalisations · Méthode · À propos · Contact**

---

## Animations

Acceptées : fade-in léger, hover subtil, transitions de page courtes.
Durée cible : **150 à 250 ms**.

Les animations accompagnent l'interface. Elles ne deviennent jamais le centre de l'attention.

---

## Anti-direction

À éviter absolument :

- Effets 3D, particules, parallaxe, animations permanentes
- Gradients agressifs, néons, esthétique cyberpunk
- Portfolios « vitrine IA »
- Murs de badges technologiques
- **Esthétique dashboard SaaS** — cartes KPI, métriques partout, graphiques décoratifs. Le sujet du portfolio est la démarche, pas les données. La compétence Data se prouve dans les projets, pas dans la mise en page du portfolio lui-même.

**Le visiteur doit retenir :**
*« Cette personne sait concevoir et réaliser des systèmes. »*

**Et non :**
*« Cette personne sait faire des animations. »*