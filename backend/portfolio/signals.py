"""Revalidation à la demande du frontend Next.js.

Toute écriture sur le contenu rendu par le site (Project, ProjectAsset,
Profile, Skill) déclenche une purge du cache ISR via la route Next
`/api/revalidate`. Tolérant aux pannes : si le front est injoignable ou la
revalidation non configurée, l'enregistrement en base n'est jamais bloqué.

Utilise `urllib` (stdlib) — pas de dépendance ajoutée (cf. rules/STACK.md).
"""

import json
import logging
import urllib.error
import urllib.request

from django.conf import settings
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from .models import Profile, Project, ProjectAsset, Skill

logger = logging.getLogger(__name__)

CONTENT_MODELS = (Profile, Skill, Project, ProjectAsset)


def _trigger_revalidate():
    if getattr(settings, "TESTING", False):
        return  # pas d'appel réseau pendant les tests
    url = settings.FRONTEND_REVALIDATE_URL
    if not url:
        return  # revalidation désactivée (CI, dev sans front, etc.)
    payload = json.dumps({"secret": settings.REVALIDATE_SECRET}).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=3):
            pass
    except (urllib.error.URLError, OSError) as exc:
        logger.warning("Revalidation frontend échouée (%s) : %s", url, exc)


@receiver(post_save, dispatch_uid="portfolio_revalidate_save")
@receiver(post_delete, dispatch_uid="portfolio_revalidate_delete")
def revalidate_frontend(sender, **kwargs):
    if sender in CONTENT_MODELS:
        _trigger_revalidate()
