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
3. Build : `next build` (défaut).

## Points d'attention

- **Le build Vercel doit joindre l'API cPanel** : les pages sont en ISR générées au build (fetch au moment du build). Backend injoignable ⇒ build en échec. Déployer le backend en premier.
- **CORS** : `CORS_ALLOWED_ORIGINS` (back) doit contenir l'URL exacte du front Vercel, sinon les requêtes navigateur sont bloquées.
- **Images** : `remotePatterns` suit `NEXT_PUBLIC_API_URL` — le domaine media cPanel est autorisé automatiquement.
- **HTTPS** : avec `DEBUG=False`, `SECURE_SSL_REDIRECT` + HSTS sont actifs ; SSL doit être configuré côté cPanel.
- **SQLite** : fichier `db.sqlite3` persistant sur cPanel — à sauvegarder. Basculer sur PostgreSQL (`DB_ENGINE=postgres`) si la charge d'écriture augmente.
- **Revalidation ISR** : 1 h. Une modification dans l'admin apparaît au plus tard après ce délai (ou via un redéploiement).
