# DECISIONS — Journal des décisions (ADR léger)

Format par décision : **Décision · Pourquoi · Alternatives écartées**. Honnête avant d'être flatteur : un choix conservé sans être idéal est documenté comme tel.

---

## ADR-001 — Architecture headless (Django REST + Next.js séparés)
*2026-06-24 · Acté (rétroactif)*
- **Décision.** Backend Django/DRF et frontend Next.js découplés via une API REST.
- **Pourquoi.** La séparation frontend/backend a été retenue non parce qu'elle était nécessaire au produit, mais parce qu'elle permettait de démontrer une architecture découplée, de travailler un domaine moins maîtrisé (frontend) et de conserver un backend Django réutilisable. Le coût de complexité supplémentaire a été jugé acceptable au regard de cet objectif.
- **Alternatives écartées.** Django monolithe (templates) : aurait supprimé l'occasion de travailler le front. Next full-stack : aurait tout déplacé dans un domaine que je ne maîtrise pas, en abandonnant ma force Django/data.

## ADR-002 — Frontend Next.js : conservé malgré un doute d'overengineering
*2026-06-24 · Acté, doute assumé*
- **Décision.** Garder Next.js/React pour le front. Ne pas migrer vers un générateur statique.
- **Pourquoi.** En greenfield, un SSG (voire des fichiers Markdown) suffirait pour un site quasi lecture seule — mon instinct anti-overengineering est juste sur ce point. Mais (1) le code existe et est sain : le réécrire serait un autre gaspillage ; (2) une app Next réelle, livrée par un non-frontend via orchestration d'agents, **est** la preuve de ma thèse (autonomie de bout en bout, agents montrés et non proclamés). Je conserve donc un choix que je n'aurais pas refait à l'identique, et je l'assume.
- **Alternatives écartées.** Migration vers Astro / SSG pur : coût de réécriture non justifié par les objectifs ; risque de courir après la pureté (overengineering inversé).
- **Risque suivi.** Maintenabilité d'un front hors de mon domaine — atténuée par le rendu statique/ISR (ADR-003) et les règles de simplicité de `STACK.md`.

## ADR-003 — Rendu statique / ISR (pas de SSR)
*2026-06-24 · Acté*
- **Décision.** Servir le site en statique / ISR plutôt qu'en SSR.
- **Pourquoi.** Contenu peu changeant → bon SEO et performance (US9), aucun serveur de rendu à surveiller, surface de maintenance réduite.
- **Alternatives écartées.** SSR (`no-store`) : complexité serveur inutile pour un contenu quasi figé.
- **À valider** contre Next 16 (`frontend/AGENTS.md` signale des ruptures d'API cache/statique).
- **Dépendance levée.** L'ISR est disponible car le front est déployé sur Vercel (ADR-007), qui le gère nativement.

## ADR-004 — Base de données : SQLite par défaut, PostgreSQL en réserve
*2026-06-24 · Acté*
- **Décision.** SQLite par défaut (dev et prod à faible écriture). PostgreSQL adopté en prod **seulement si le besoin émerge** (extension blog, montée en écriture).
- **Pourquoi.** Site à très faible écriture → la simplicité prime ; pas d'abstraction prématurée. La porte Postgres reste ouverte sans coût aujourd'hui.
- **Alternatives écartées.** PostgreSQL d'emblée : surcoût opérationnel sans bénéfice au stade actuel.
- **Risque suivi.** Sur un hébergement à filesystem éphémère, un fichier SQLite peut être perdu au redéploiement → à arbitrer avec l'ADR déploiement (ADR-007).

## ADR-005 — Source de vérité documentaire
*2026-06-24 · Acté*
- **Décision.** Le code source et les documents de conception (architecture, ADR, backlog, sprints, règles) sont conservés dans **GitHub**. Les médias nécessaires à l'affichage du portfolio (images, captures, CV, documents téléchargeables) sont servis par le **système de médias Django**.
- **Pourquoi.** GitHub est adapté au versionnement et à la traçabilité des artefacts de conception. Django Media est adapté à la diffusion des ressources consultées par les visiteurs.
- **Alternatives écartées.** Tout stocker dans GitHub : complexifie inutilement la gestion des médias. Tout stocker dans Django : fait perdre les avantages du versionnement des documents de conception.

## ADR-006 — Pas d'authentification en V1
*2026-06-24 · Acté*
- **Décision.** Aucune authentification.
- **Pourquoi.** Conséquence directe : aucune fonctionnalité d'écriture exposée au visiteur ; site public en lecture seule.
- **Alternatives écartées.** Auth dès la V1 : sans objet faute d'utilisateurs à authentifier. JWT (DRF Simple JWT) gardé en réserve si un besoin futur apparaît.

## ADR-007 — Cible de déploiement
*2026-06-24 · Acté*
- **Décision.** **Frontend sur Vercel, backend sur cPanel LWS.** (Combinaison retenue parmi : tout sur cPanel ; front Vercel + back cPanel ; VPS.)
- **Pourquoi.** Cette répartition résout les deux tensions du moment de façon favorable (voir ci-dessous), avec un coût nul (Vercel gratuit, cPanel déjà disponible).
- **Conséquences.**
  - *Débloque l'ISR (ADR-003) :* Vercel gère l'ISR nativement → le rendu statique/ISR est réellement disponible côté front.
  - *Favorable à SQLite (ADR-004) :* cPanel a un filesystem persistant → le risque « SQLite perdu au redéploiement » ne s'applique pas.
  - *Django sur cPanel :* à câbler via « Setup Python App » (Passenger/WSGI) chez LWS, plus contraint qu'un VPS — à vérifier au sprint déploiement.
  - *CORS / domaines :* front et back sur des origines distinctes → configuration CORS à confirmer au sprint déploiement.

## ADR-008 — Périmètre de l'intégration continue
*2026-06-24 · Ouvert / différé*
- **Statut.** Non tranché. Figé au sprint dédié (cf. `STACK.md`).
- **Direction.** GitHub Actions, lint (Ruff/Black) + tests backend (Django TestCase). Périmètre frontend à définir.
