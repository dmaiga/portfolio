# Déploiement

Architecture cible (ADR-007) : **frontend Next.js sur Vercel** (statique/ISR), **backend Django/DRF sur cPanel LWS**.

## Backend — cPanel LWS

1. **Setup Python App** (Passenger/WSGI), Python 3.12, application pointant sur `config/wsgi.py`.
2. Installer les dépendances : `pip install -r requirements.txt`.
3. Variables d'environnement (cf. `backend/.env.example`) :
   - `SECRET_KEY` — clé forte et secrète (jamais celle par défaut).
   - `DEBUG=False` — **active le durcissement** (HTTPS, HSTS, cookies sécurisés).
   - `ALLOWED_HOSTS` — domaine du backend.
   - `CORS_ALLOWED_ORIGINS` — domaine exact du front Vercel.
   - `DB_ENGINE=sqlite` (défaut) ou `postgres` + variables `DB_*` (réserve, ADR-004).
   - `FRONTEND_REVALIDATE_URL` = `https://<domaine-front-vercel>/api/revalidate` — pour la revalidation à la demande.
   - `REVALIDATE_SECRET` — secret partagé, **identique** à celui de Vercel.
4. `python manage.py migrate`
5. `python manage.py collectstatic`
6. `python manage.py seed` (ou saisie via l'admin).
7. S'assurer que `MEDIA_ROOT` est accessible en écriture (uploads admin).

## Frontend — Vercel

1. Importer le dépôt, racine du projet = `frontend/`.
2. Variables d'environnement (cf. `frontend/.env.example`) :
   - `NEXT_PUBLIC_API_URL` = `https://<domaine-backend-cpanel>`
   - `NEXT_PUBLIC_SITE_URL` = `https://<domaine-front-vercel>`
   - `NEXT_PUBLIC_REPO_URL` = `https://github.com/dmaiga/portfolio`
   - `REVALIDATE_SECRET` — secret partagé, **identique** à celui du backend. **Sans** préfixe `NEXT_PUBLIC` (il doit rester côté serveur, jamais dans le bundle client).
3. Build : `next build` (défaut).

## Points d'attention

- **Le build Vercel doit joindre l'API cPanel** : les pages sont en ISR générées au build (fetch au moment du build). Backend injoignable ⇒ build en échec. Déployer le backend en premier.
- **CORS** : `CORS_ALLOWED_ORIGINS` (back) doit contenir l'URL exacte du front Vercel, sinon les requêtes navigateur sont bloquées.
- **Images** : `remotePatterns` suit `NEXT_PUBLIC_API_URL` — le domaine media cPanel est autorisé automatiquement.
- **HTTPS** : avec `DEBUG=False`, `SECURE_SSL_REDIRECT` + HSTS sont actifs ; SSL doit être configuré côté cPanel.
- **SQLite** : fichier `db.sqlite3` persistant sur cPanel — à sauvegarder. Basculer sur PostgreSQL (`DB_ENGINE=postgres`) si la charge d'écriture augmente.
- **Revalidation à la demande** : toute écriture admin (Project, ProjectAsset, Profile, Skill) déclenche un signal Django qui appelle `POST https://<front>/api/revalidate` → purge immédiate du cache ISR. Conditions :
  - `FRONTEND_REVALIDATE_URL` (back) et `REVALIDATE_SECRET` (back **et** Vercel) renseignés, **secret identique des deux côtés** ; sinon la route répond 401/500 et le contenu n'est pas rafraîchi.
  - Le backend cPanel doit pouvoir émettre une requête **sortante HTTPS** vers Vercel (pas de blocage egress). Si ce n'est pas le cas, l'enregistrement reste OK (tolérant aux pannes) mais le front ne se rafraîchit qu'au bout de la fenêtre ISR.
  - **Filet ISR** : 1 h (`frontend/lib/config.ts`, constante `REVALIDATE`). Si la revalidation à la demande est indisponible (egress bloqué), une modif admin apparaît au plus tard après ce délai (ou via redéploiement). Ajuster la constante si besoin.
