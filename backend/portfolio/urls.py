from django.urls import path
from .views import ProfileView, SkillListView, ProjectListView, ProjectDetailView

urlpatterns = [
    path('profile/', ProfileView.as_view()),
    path('skills/', SkillListView.as_view()),
    path('projects/', ProjectListView.as_view()),
    path('projects/<slug:slug>/', ProjectDetailView.as_view()),
]
