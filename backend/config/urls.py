from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('portfolio.urls')),
    # Media servis par Django (fichiers uploadés via l'admin). Trafic faible
    # sur un portfolio ; fonctionne avec DEBUG=False, contrairement au helper
    # static() qui est inactif hors développement.
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]
