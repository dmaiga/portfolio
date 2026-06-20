from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Profile, Skill, Project
from .serializers import ProfileSerializer, SkillSerializer, ProjectListSerializer, ProjectDetailSerializer


class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        if profile is None:
            return Response({'detail': 'Aucun profil configuré.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)


class SkillListView(ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectListView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerializer


class ProjectDetailView(RetrieveAPIView):
    queryset = Project.objects.prefetch_related('skills', 'assets')
    serializer_class = ProjectDetailSerializer
    lookup_field = 'slug'
