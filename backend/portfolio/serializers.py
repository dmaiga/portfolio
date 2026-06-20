from rest_framework import serializers
from .models import Profile, Skill, Project, ProjectAsset


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['full_name', 'title', 'bio', 'photo', 'email', 'github_url', 'linkedin_url', 'cv']


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'icon']


class ProjectAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectAsset
        fields = ['id', 'title', 'file', 'asset_type']


class ProjectListSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'short_description', 'cover_image', 'featured', 'project_type', 'start_date', 'end_date', 'skills']


class ProjectDetailSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    assets = ProjectAssetSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'short_description', 'description',
            'role', 'challenge', 'solution', 'lessons_learned',
            'github_url', 'demo_url', 'cover_image',
            'start_date', 'end_date', 'featured', 'project_type', 'skills', 'assets',
        ]
