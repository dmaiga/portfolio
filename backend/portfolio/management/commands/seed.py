"""
Commande de seed pour les données du portfolio de Mahamane Daouda Maïga.

Usage :
    python manage.py seed
    python manage.py seed --cv docs/cv.pdf
    python manage.py seed --reset
"""

import shutil
from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand

# Note d'architecture : Ajuste les imports selon le nom exact de tes modèles
from portfolio.models import Profile, Project, ProjectAsset, Skill


SKILLS = [
    # Data Engineering & Analytics
    ("Python", "Data Engineering & Analytics"),
    ("SQL", "Data Engineering & Analytics"),
    ("Apache Spark", "Data Engineering & Analytics"),
    ("Apache Flink", "Data Engineering & Analytics"),
    ("Apache Kafka", "Data Engineering & Analytics"),
    # ETL/ELT & Business Intelligence
    ("dbt Core", "ETL/ELT & BI"),
    ("Airflow", "ETL/ELT & BI"),
    ("Dagster", "ETL/ELT & BI"),
    ("Metabase", "ETL/ELT & BI"),
    ("Power BI", "ETL/ELT & BI"),
    ("Modélisation dimensionnelle", "ETL/ELT & BI"),
    # Systèmes d'Information & Développement
    ("Django", "Systèmes d'Information & Dev"),
    ("Django REST Framework", "Systèmes d'Information & Dev"),
    ("JavaScript", "Systèmes d'Information & Dev"),
    ("Conception et intégration d'API REST", "Systèmes d'Information & Dev"),
    # Bases de données & Stockage
    ("PostgreSQL", "Bases de Données & Stockage"),
    ("MySQL", "Bases de Données & Stockage"),
    ("BigQuery", "Bases de Données & Stockage"),
    ("Amazon S3", "Bases de Données & Stockage"),
    ("MinIO", "Bases de Données & Stockage"),
    # Cloud & Infrastructure
    ("AWS", "Cloud & Infrastructure"),
    ("Google Cloud", "Cloud & Infrastructure"),
    ("Docker & Docker Compose", "Cloud & Infrastructure"),
    ("Git & GitHub Actions", "Cloud & Infrastructure"),
]

PROJECTS = [
    # =========================================================================
    # CATEGORIE 1 : EXPÉRIENCES PROFESSIONNELLES (EN ENTREPRISE)
    # =========================================================================
    {
        "title": "Antarès RH — Plateforme RH Intégrée",
        "slug": "antares-rh",
        "project_type": "PROFESSIONAL",  # Distinction claire du type
        "summary": "Système d'information RH intégré couvrant la gestion des talents, des candidats et l'archivage numérique.",
        "context": (
            "Développement et architecture de la plateforme Antarès RH. Intervention sur l'ensemble "
            "du cycle de vie du système, depuis l'analyse fonctionnelle des parcours utilisateurs "
            "jusqu'au déploiement de modules de gestion des candidats, des offres d'emploi et d'un CMS multilingue."
        ),
        "role": "Assistant Data et Informatique (Référent Technique)",
        "problem": (
            "L'enjeu consistait à concevoir un système modulaire capable de centraliser la gestion documentaire "
            "et le cycle de vie des talents, tout en garantissant des mécanismes stricts de sécurité, "
            "de contrôle d'accès et de traçabilité des dossiers candidats."
        ),
        "solution": (
            "Mise en œuvre d'une architecture applicative robuste sous Django. Structuration des workflows métier "
            "et modélisation d'un système de gestion documentaire et d'archivage numérique. Intégration d'un espace "
            "candidat autonome et d'un tableau de bord d'administration pour les équipes de GRH."
        ),
        "lessons_learned": (
            "La maîtrise de la gouvernance documentaire et de l'alignement avec les besoins métiers "
            "est cruciale. L'isolation des rôles et l'implémentation de la traçabilité des validations "
            "dès la conception évitent d'importantes réécritures d'architecture en phase de production."
        ),
        "github_url": "",
        "demo_url": "",
        "featured": True,
        "skills": ["Python", "Django", "Django REST Framework", "PostgreSQL", "Docker & Docker Compose", "Git & GitHub Actions"],
    },
    {
        "title": "DAMS — Plateforme Opérationnelle et Décisionnelle",
        "slug": "dams-agro",
        "project_type": "PROFESSIONAL",
        "summary": "Système d'information de production, de distribution et de suivi financier pour le secteur agro-alimentaire.",
        "context": (
            "Conception et déploiement d'une solution de gestion globale pour suivre les opérations terrain, "
            "centraliser les flux transactionnels et piloter la performance financière d'une entreprise de distribution."
        ),
        "role": "Référent Technique / Développeur Backend & Data",
        "problem": (
            "Garantir la traçabilité complète des flux physiques (stocks, lots, ventes) et financiers complexes, "
            "tout en automatisant le calcul des incentives terrain et de la paie à partir de données opérationnelles éparses."
        ),
        "solution": (
            "Création d'une plateforme unifiée avec historisation fine et audit des opérations. "
            "Développement d'un système d'archivage numérique des pièces justificatives, automatisation des reportings "
            "financiers et conception de tableaux de bord d'aide à la décision pour la direction."
        ),
        "lessons_learned": (
            "La rigueur dans l'historisation des données transactionnelles est non négociable pour le contrôle interne. "
            "La modélisation orientée audit permet de détecter les anomalies opérationnelles de manière proactive "
            "et simplifie grandement la maintenance corrective."
        ),
        "github_url": "",
        "demo_url": "",
        "featured": True,
        "skills": ["Python", "Django", "PostgreSQL", "Metabase", "Modélisation dimensionnelle", "Docker & Docker Compose"],
    },

    # =========================================================================
    # CATEGORIE 2 : CONSULTATIONS PONCTUELLES (INDÉPENDANT)
    # =========================================================================
    {
        "title": "AMEE — Plateforme de Gestion de Réseau d'Experts",
        "slug": "amee-network",
        "project_type": "CONSULTING",
        "summary": "Solution numérique de gestion des adhésions, qualification des consultants et pilotage de missions.",
        "context": (
            "Conception d'une plateforme sur mesure pour l'Association Malienne des Évaluations Environnementales "
            "visant à structurer et administrer leur réseau d'experts nationaux et internationaux."
        ),
        "role": "Consultant Indépendant / Architecte & Développeur",
        "problem": (
            "Fluidifier et sécuriser le processus de validation et de qualification des consultants, "
            "tout en intégrant un module de trésorerie autonome pour la gestion des adhésions et cotisations."
        ),
        "solution": (
            "Développement de portails dédiés (membres, pourvoyeurs d'emploi) adossés à un backoffice centralisé. "
            "Mise en place de workflows d'approbation des profils, d'un module de suivi de la qualité des livrables, "
            "et intégration d'un CMS pour la gestion autonome des ressources documentaires."
        ),
        "lessons_learned": (
            "En travaillant de manière autonome pour un client institutionnel, la formalisation rigoureuse des besoins "
            "en amont est la clé du respect des délais. L'utilisation d'une architecture à base de rôles modulaires "
            "a permis de livrer l'application de façon incrémentale sans interruption."
        ),
        "github_url": "",
        "demo_url": "",
        "featured": False,
        "skills": ["Python", "Django", "PostgreSQL", "Conception et intégration d'API REST", "JavaScript"],
    },
    {
        "title": "EGM tech — Plateforme Commerciale B2B/B2C",
        "slug": "egm-tech",
        "project_type": "CONSULTING",
        "summary": "Plateforme e-commerce technique avec système de demandes de devis et gestion du cycle commercial.",
        "context": (
            "Déploiement d'une solution commerciale complète pour la présentation de solutions techniques, "
            "la passation de commandes en ligne et la qualification des opportunités d'affaires."
        ),
        "role": "Consultant Indépendant / Développeur Full-Stack",
        "problem": (
            "Modéliser un catalogue de produits techniques complexes tout en proposant un double parcours utilisateur : "
            "achat direct (B2C) et demande de devis sur mesure avec tarification dynamique (B2B)."
        ),
        "solution": (
            "Conception d'un moteur de devis modulable et d'un espace client proposant un historique transactionnel. "
            "Mise en place d'un backoffice de gestion commerciale posant les bases de l'automatisation des factures proformas."
        ),
        "lessons_learned": (
            "La flexibilité des modèles de données commerciaux est primordiale. Structurer le catalogue de manière "
            "extensible dès le début permet d'absorber l'ajout de nouvelles spécifications techniques sans modifier "
            "le coeur de l'application."
        ),
        "github_url": "",
        "demo_url": "",
        "featured": False,
        "skills": ["Python", "Django", "MySQL", "JavaScript", "Conception et intégration d'API REST"],
    },
    {
        "title": "Zabantu — Portail de Publication Scientifique",
        "slug": "zabantu-research",
        "project_type": "CONSULTING",
        "summary": "Plateforme collaborative d'archivage, de valorisation et de diffusion de contenus académiques.",
        "context": (
            "Conception et déploiement du portail web institutionnel du Groupe de Recherche Zabantu "
            "dédié à la promotion et au partage des connaissances scientifiques."
        ),
        "role": "Consultant Indépendant / Développeur Backend",
        "problem": (
            "Organiser et structurer la taxonomie de contenus académiques variés (articles, analyses, événements) "
            "avec des règles d'administration strictes selon le statut des chercheurs."
        ),
        "solution": (
            "Création d'un système d'archivage numérique indexé couplé à un backoffice d'administration simplifié "
            "pour les équipes universitaires, permettant la publication autonome et la valorisation des productions."
        ),
        "lessons_learned": (
            "L'accent doit être mis sur l'expérience utilisateur des administrateurs non techniques. Un backoffice "
            "épuré réduit considérablement les coûts de support post-déploiement."
        ),
        "github_url": "",
        "demo_url": "",
        "featured": False,
        "skills": ["Python", "Django", "MySQL", "JavaScript"],
    },

    # =========================================================================
    # CATEGORIE 3 : PROJETS ACADÉMIQUES (MASTER 2 DATA SCIENCE)
    # =========================================================================
    {
        "title": "Projet d'Entreprise BI — AES Global Tech Market",
        "slug": "bi-aes-global",
        "project_type": "ACADEMIC",
        "summary": "Conception d'un Data Warehouse multidimensionnel et de pipelines ELT pour le pilotage commercial et financier.",
        "context": (
            "Mise en place d'une plateforme décisionnelle centralisant les données de l'application 'Tassouma' "
            "pour une entreprise technologique opérant en Afrique de l'Ouest."
        ),
        "role": "Data Engineer / Architecte BI (Master 2)",
        "problem": (
            "Standardiser les KPI métiers et consolider des volumes hétérogènes au sein d'une architecture "
            "analytique multicouche fiable, dotée d'une stratégie de tolérance aux pannes (Fail-Safe)."
        ),
        "solution": (
            "Architecture ELT complète (Staging → Warehouse → Data Marts) développée avec dbt Core. "
            "Modélisation en étoile générant 31 modèles analytiques, soutenue par plus de 155 tests automatisés "
            "et restitutions visuelles interactives via Metabase."
        ),
        "lessons_learned": (
            "La gouvernance et la qualité des données priment sur la simple tuyauterie. L'automatisation des tests "
            "sur dbt garantit la souveraineté et la fiabilité des indicateurs transmis aux directions exécutives."
        ),
        "github_url": "",
        "demo_url": "",
        "featured": True,
        "skills": ["SQL", "dbt Core", "Modélisation dimensionnelle", "Metabase", "PostgreSQL"],
    },
    {
        "title": "Plateforme Big Data & Lakehouse E-commerce",
        "slug": "big-data-lakehouse",
        "project_type": "ACADEMIC",
        "summary": "Pipeline d'ingestion et de traitement distribué de flux streaming multi-sources (Kafka, Flink, Spark).",
        "context": (
            "Conception d'une architecture Lakehouse moderne intégrant l'ingestion temps réel, l'orchestration, "
            "ainsi que l'observabilité de la plateforme informatique."
        ),
        "role": "Architecte Big Data (Master 2)",
        "problem": (
            "Traiter simultanément des flux de navigation web, des transactions et des mouvements de stock continus "
            "en combinant une logique de streaming et de batch (Architecture Lambda)."
        ),
        "solution": (
            "Pipeline complet : Producteurs Kafka → Apache Flink (agrégation au fil de l'eau) → MinIO (Stockage brut) "
            "→ Apache Spark (transformations lourdes) → PostgreSQL / Metabase. Le tout orchestré par Dagster "
            "et monitoré par le couple Prometheus & Grafana sous Docker Compose."
        ),
        "lessons_learned": (
            "L'alignement et la synchronisation des composants distribués forment le véritable défi des infrastructures Big Data. "
            "La mise en place de l'observabilité (Grafana/Prometheus) s'avère indispensable pour identifier "
            "immédiatement les goulots d'étranglement ou les pertes de messages."
        ),
        "github_url": "",
        "demo_url": "",
        "featured": True,
        "skills": ["Apache Kafka", "Apache Flink", "Apache Spark", "Dagster", "MinIO", "Docker & Docker Compose", "Metabase"],
    },
]


class Command(BaseCommand):
    help = "Seed la base de données avec le CV et le parcours réel de M. Maïga"

    def add_arguments(self, parser):
        parser.add_argument(
            "--cv",
            type=str,
            help="Chemin vers le fichier CV PDF à attacher (ex: docs/cv.pdf)",
        )
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Supprime toutes les données existantes avant de seeder",
        )

    def handle(self, *args, **options):
        if options["reset"]:
            self.stdout.write("Nettoyage complet de la base de données...")
            ProjectAsset.objects.all().delete()
            Project.objects.all().delete()
            Skill.objects.all().delete()
            Profile.objects.all().delete()
            
            media_root = Path(settings.MEDIA_ROOT)
            for folder in ["profile", "cv", "projects", "assets"]:
                shutil.rmtree(media_root / folder, ignore_errors=True)
            self.stdout.write(self.style.SUCCESS("Données nettoyées avec succès."))

        # 1. Gestion du profil unique
        if Profile.objects.exists():
            self.stdout.write("Profil existant détecté. Mise à jour des informations...")
            profile = Profile.objects.first()
        else:
            profile = Profile(full_name="Mahamane Daouda Maïga")

        profile.title = "Architecte Applicatif & Data Engineer"
        profile.bio = (
            "Basé à Bamako, Mali, je conçois, développe et fais évoluer des systèmes d'information "
            "et des plateformes métiers permettant de digitaliser les processus opérationnels, "
            "structurer les données et améliorer le pilotage des activités. J'interviens sur l'ensemble "
            "du cycle de vie des solutions, depuis l'analyse des besoins jusqu'au déploiement. "
            "Mon expertise s'articule autour des architectures de données modernes (ELT, Big Data, Lakehouse) "
            "et du développement applicatif backend robuste."
        )
        profile.email = "mdmaiga01@gmail.com"
        profile.github_url = "https://github.com/dmaiga"
        profile.linkedin_url = "https://www.linkedin.com/in/mdmaiga"
        
        # Attachement du fichier CV si fourni
        cv_path = options.get("cv")
        if cv_path:
            cv_file = Path(cv_path)
            if cv_file.exists():
                with open(cv_file, "rb") as f:
                    profile.cv.save(cv_file.name, File(f), save=False)
                self.stdout.write(f"Fichier CV enregistré : {cv_path}")
            else:
                self.stdout.write(self.style.WARNING(f"Fichier CV introuvable à l'adresse : {cv_path}"))

        profile.save()
        self.stdout.write(self.style.SUCCESS("Profil Mahamane Daouda Maïga synchronisé."))

        # 2. Traitement des compétences
        skill_map: dict[str, Skill] = {}
        for name, category in SKILLS:
            skill, created = Skill.objects.get_or_create(
                name=name, defaults={"category": category}
            )
            skill_map[name] = skill

        self.stdout.write(self.style.SUCCESS(f"Référentiel de {len(SKILLS)} compétences opérationnel."))

        # 3. Traitement des Projets avec distinction des environnements
        for data in PROJECTS:
            skills_names = data.pop("skills")
            
            # Utilisation du slug comme clé unique naturelle pour éviter les doublons
            project, created = Project.objects.get_or_create(
                slug=data["slug"], defaults=data
            )

            if created:
                for name in skills_names:
                    if name in skill_map:
                        project.skills.add(skill_map[name])
                self.stdout.write(f"  [{project.project_type.upper()}] Projet créé : {project.title}")
            else:
                # Optionnel : Mettre à jour les champs si le projet existe déjà
                for key, val in data.items():
                    setattr(project, key, val)
                project.save()
                self.stdout.write(f"  [{project.project_type.upper()}] Projet mis à jour : {project.title}")

            # Restitution de la liste pour les itérations suivantes si nécessaire
            data["skills"] = skills_names

        self.stdout.write(self.style.SUCCESS("\n[OK] Base de données initialisée avec succès pour l'évaluation !"))