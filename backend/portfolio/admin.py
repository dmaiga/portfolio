from django.contrib import admin
from .models import Profile, Skill, Project, ProjectAsset


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not Profile.objects.exists()


class ProjectAssetInline(admin.TabularInline):
    model = ProjectAsset
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'featured', 'start_date', 'end_date']
    list_filter = ['featured']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['skills']
    inlines = [ProjectAssetInline]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category']
    list_filter = ['category']


@admin.register(ProjectAsset)
class ProjectAssetAdmin(admin.ModelAdmin):
    list_display = ['title', 'project', 'asset_type']
    list_filter = ['asset_type']
