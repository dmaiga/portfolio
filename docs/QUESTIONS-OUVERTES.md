### Questions ouvertes / Améliorations

#### 1. Responsive des pages

* Corriger le problème de responsive sur les pages de détail lorsqu'un grand nombre de documents est affiché ou uploadé. — **Fait** (fix CSS Grid `min-width: auto`, cf. `frontend/app/projects/[slug]/page.tsx`).
* Revoir l'interface d'upload des documents pour qu'elle reste utilisable sur mobile et tablette. — **Tranché, écarté.** Voir `docs/DECISIONS.md` (ADR-009) : outil interne, priorité basse.

#### 2. Gestion du statut des projets (V2)

* Ajouter un système de statut pour les projets :

  * À venir
  * En cours
  * Terminé
* Permettre de modifier ce statut directement depuis l'administration.
* Pour les projets "À venir" ou "En cours", afficher uniquement :

  * le contexte ;
  * les objectifs ;
  * les difficultés anticipées ou rencontrées.
* Les sections comme **Solution**, **Architecture finale**, **Retour d'expérience** et **Leçons apprises** ne seraient publiées qu'une fois le projet terminé.
* Exemple : documenter la mise en place de mon futur Home Lab avant même qu'il soit terminé.

#### 3. Certifications

* Ajouter une section dédiée aux certifications.
* Afficher :

  * le certificat ;
  * l'organisme ;
  * la date d'obtention ;
  * les compétences acquises ;
  * un lien de vérification lorsque disponible.

#### 4. Blog / Articles techniques

**Tranché — écarté.** Voir `docs/DECISIONS.md` (ADR-009).

#### 5. Plateformes de développement

* Ajouter GitLab en plus de GitHub.
* Permettre d'associer plusieurs dépôts ou plateformes à un même projet (GitHub, GitLab, voire Bitbucket à terme).

### Autres idées

* Ajouter une timeline de mon parcours technique. — **Déjà couvert** par la section Parcours de `/a-propos`.
* Afficher les technologies maîtrisées avec leur niveau d'utilisation. — En question : proche d'une esthétique "dashboard" (barres de progression), explicitement écartée par `docs/06-identite-visuelle.md` et l'annotation du wireframe ("elles ne signifient rien").
* Générer automatiquement les statistiques GitHub/GitLab. — **Fait pour GitHub** (`frontend/lib/github.ts`, section GitHub de `/a-propos`), cf. `docs/DECISIONS.md` ADR-009. GitLab en attente de l'item 5.
* Ajouter une section "En apprentissage" pour présenter les technologies que j'étudie actuellement.
* Mettre en avant les ADR (Architecture Decision Records) des projets les plus importants.
* Ajouter une recherche globale sur le portfolio.
* Permettre de filtrer les projets par technologie, domaine ou année.
* Afficher les démonstrations (vidéos, GIF, captures d'écran) directement dans les projets.
* Ajouter une section "Lessons Learned" pour chaque projet afin de documenter ce qui a bien fonctionné et ce qui pourrait être amélioré. — **Déjà en place** (champ `lessons_learned`, affiché sur la page projet).
