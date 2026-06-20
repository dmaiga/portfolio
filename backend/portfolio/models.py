from django.db import models
from django.core.exceptions import ValidationError


class Profile(models.Model):
    full_name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    photo = models.ImageField(upload_to='profile/', blank=True)
    email = models.EmailField()
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    cv = models.FileField(upload_to='cv/', blank=True)

    def save(self, *args, **kwargs):
        if not self.pk and Profile.objects.exists():
            raise ValidationError("Un seul profil est autorisé.")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = "Profil"


class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    icon = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.name} ({self.category})"

    class Meta:
        verbose_name = "Compétence"
        verbose_name_plural = "Compétences"
        ordering = ['category', 'name']



class ProjectType(models.TextChoices):
    PROFESSIONAL = "PROFESSIONAL", "Expérience professionnelle"
    CONSULTING = "CONSULTING", "Mission de conseil"
    ACADEMIC = "ACADEMIC", "Projet académique"
    PERSONAL = "PERSONAL", "Projet personnel"

class Project(models.Model):
    project_type = models.CharField(
        max_length=20,
        choices=ProjectType.choices,
        default=ProjectType.PERSONAL,
    )

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=300)
    description = models.TextField()
    role = models.CharField(max_length=200)
    challenge = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    lessons_learned = models.TextField(blank=True)
    github_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    cover_image = models.ImageField(upload_to='projects/', blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    featured = models.BooleanField(default=False)
    skills = models.ManyToManyField(Skill, blank=True, related_name='projects')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Projet"
        ordering = ['-start_date']


class ProjectAsset(models.Model):
    ASSET_TYPE_CHOICES = [
        ('IMAGE', 'Image'),
        ('DOCUMENT', 'Document'),
        ('TDR', 'TDR'),
        ('CAHIER_CHARGE', 'Cahier des charges'),
        ('ARCHITECTURE', 'Architecture'),
        ('OTHER', 'Autre'),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='assets')
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to='assets/')
    asset_type = models.CharField(max_length=20, choices=ASSET_TYPE_CHOICES)

    def __str__(self):
        return f"{self.title} ({self.asset_type})"

    class Meta:
        verbose_name = "Ressource de projet"
        verbose_name_plural = "Ressources de projet"
