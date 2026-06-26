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

    # Architecture & Systèmes d'Information
    ("Architecture Applicative", "Architecture & SI"),
    ("Modélisation de Données", "Architecture & SI"),
    ("Contrôle d'Accès (RBAC)", "Architecture & SI"),
    ("Audit & Traçabilité", "Architecture & SI"),
    ("Gestion Documentaire", "Architecture & SI"),
    ("Conception de Workflow Métier", "Architecture & SI"),
    ("Architecture SIRH", "Architecture & SI"),
    
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
    "title": "Antarès RH — SIRH Modulaire & Plateforme de Gestion des Talents",
    "slug":"antares-rh",
    "project_type": "PROFESSIONAL",
    "summary": (
        "Système d'information RH modulaire conçu pour centraliser le recrutement, "
        "la gestion des talents, la gestion documentaire, les contenus RH et "
        "l'automatisation de processus métiers au sein d'une plateforme unifiée."
    ),

    "context": (
        "Participation à la conception et au développement du SIRH Antarès RH, "
        "une plateforme modulaire destinée à couvrir l'ensemble du cycle de vie "
        "des talents : acquisition, recrutement, intégration, gestion documentaire "
        "et services RH. Le projet vise à fournir une base technologique évolutive "
        "capable de supporter à terme un ATS complet, un vivier de talents, "
        "des workflows RH avancés et des services d'automatisation documentaire."
    ),

    "role": "Référent Technique / Architecte Applicatif",

    "problem": (
        "Les processus RH reposaient sur des outils dispersés, des traitements "
        "manuels et une faible centralisation des informations. L'objectif était "
        "de construire une plateforme unique capable de gérer les parcours "
        "candidats, les opportunités, les contenus RH, les dossiers documentaires "
        "et les futurs processus de recrutement tout en garantissant sécurité, "
        "traçabilité et évolutivité."
    ),

    "solution": (
        "Conception d'une architecture modulaire sous Django et Django REST Framework. "
        "Développement d'un portail candidat autonome, d'un système de gestion "
        "des opportunités (emplois, appels d'offres, formations, événements), "
        "d'un espace collaborateur, d'un CMS RH multilingue, d'un espace "
        "d'administration RH et de mécanismes de gestion documentaire sécurisés. "
        "Développement d'un moteur Payroll Audit destiné à automatiser la "
        "préparation des paiements à partir des bulletins de paie et à réduire "
        "les risques d'erreurs opérationnelles."
    ),

    "results": (
        "Plateforme déployée en production et déjà utilisée par des candidats "
        "et utilisateurs réels. Les modules opérationnels couvrent la vitrine "
        "institutionnelle, le portail candidat, la publication d'offres d'emploi, "
        "d'appels d'offres, de stages et de ressources RH, ainsi qu'un espace "
        "collaborateur et un espace RH dédiés. Au cours des premières semaines "
        "d'exploitation, la plateforme a enregistré plus de 450 pages vues, "
        "206 visites et 125 visiteurs uniques avec un temps moyen de consultation "
        "proche de cinq minutes par visite. Des utilisateurs créent déjà leur "
        "compte, consultent les ressources disponibles et interagissent avec "
        "les opportunités publiées."
    ),

    "deep_dive": (
        "L'écosystème repose sur plusieurs domaines spécialisés : site public, "
        "portail candidat, gestion des opportunités, gestion des collaborateurs, "
        "CMS RH multilingue, espace RH et moteur documentaire. Les modules "
        "appliquent des mécanismes d'isolation des données, de contrôle d'accès, "
        "de traçabilité et de gestion documentaire. L'architecture prépare "
        "également l'intégration progressive d'un ATS, d'un vivier de talents, "
        "de moteurs de matching et de services d'automatisation RH."
    ),

        "lessons_learned": (
            "La maîtrise de la gouvernance documentaire et de l'alignement avec les "
            "besoins métiers est cruciale. L'isolation des rôles et l'implémentation "
            "de la traçabilité des validations dès la conception évitent "
            "d'importantes réécritures d'architecture en phase de production."
        ),
        "github_url": "",
        "demo_url": "https://antares-rh.com/",
        "featured": True,
        "start_date": "2025-06-01",
        "skills": [
            "Python",
            "Django",
            "Django REST Framework",
            "PostgreSQL",
            "Docker & Docker Compose",
            "Git & GitHub Actions",
        ],
    },

    {
    "title": "DAMS — ERP Agroalimentaire & Plateforme Décisionnelle",
    "slug": "dams-agro",
    "project_type": "PROFESSIONAL",

    "summary": (
        "Plateforme métier développée pour DAMS dans le cadre des prestations "
        "d'Antarès RH, permettant de piloter la production agricole, la distribution, "
        "les opérations financières, la logistique et la performance commerciale "
        "au sein d'un système d'information unifié."
    ),

    "context": (
        "Dans le cadre des prestations assurées par Antarès RH pour DAMS, "
        "j'interviens comme référent technique sur la conception, l'architecture "
        "et le développement d'un système d'information couvrant l'ensemble "
        "de la chaîne de valeur de l'entreprise. La plateforme intègre la gestion "
        "des cultures, la distribution terrain, le suivi des ventes, la trésorerie, "
        "les stocks, les ressources humaines, le calcul des incentives, la paie "
        "et les outils de pilotage décisionnel."
    ),

    "role": "Référent Technique / Architecte Applicatif & Data",

    "problem": (
        "Centraliser les opérations agricoles, commerciales, logistiques et "
        "financières dans une plateforme unique tout en garantissant la "
        "traçabilité complète des flux physiques et monétaires. "
        "Le système devait également fournir une vision consolidée permettant "
        "à la direction de piloter l'activité et d'identifier rapidement les "
        "anomalies opérationnelles ou financières."
    ),

    "solution": (
        "Conception d'une architecture modulaire reposant sur Django, PostgreSQL "
        "et Django REST Framework. Développement de modules dédiés à la gestion "
        "des cultures, au suivi des rendements, à la distribution terrain, "
        "aux ventes, aux stocks, à la trésorerie, à la paie, aux incentives, "
        "à l'audit financier, aux rapports journaliers et à l'analyse "
        "décisionnelle. Mise en œuvre d'API REST, de mécanismes "
        "d'historisation, d'alertes métier, de surveillance des prix "
        "et de tableaux de bord analytiques."
    ),

    "results": (
        "Plateforme déployée en production et utilisée quotidiennement par "
        "environ cinquante utilisateurs répartis entre direction, responsables "
        "des opérations, superviseurs, gestionnaires de stock, agents terrain "
        "et équipes commerciales. Le système permet le suivi des cultures, "
        "des rendements agricoles, des ventes, des mouvements de stock, "
        "des flux de trésorerie, de la paie et des incentives. "
        "Les équipes de direction disposent d'une vision consolidée de "
        "l'activité grâce aux tableaux de bord décisionnels, aux indicateurs "
        "de performance et aux mécanismes de surveillance des marges et "
        "des anomalies opérationnelles."
    ),

    "deep_dive": (
        "L'architecture distingue plusieurs domaines métier spécialisés : "
        "production agricole, distribution, finance, supervision, direction, "
        "surveillance et reporting. Les workflows intègrent des mécanismes "
        "de contrôle d'accès, d'historisation et d'audit permettant de "
        "sécuriser les flux financiers et logistiques. Une application "
        "analytique dédiée consomme les API REST du système principal afin "
        "de fournir des analyses décisionnelles, des comparaisons temporelles, "
        "des indicateurs de rendement agricole et des outils avancés de "
        "pilotage opérationnel."
    ),

    "lessons_learned": (
        "La traçabilité des flux métier doit être pensée dès la conception. "
        "L'association d'une architecture modulaire, d'une historisation "
        "systématique et d'une séparation claire entre opérations et analyse "
        "facilite fortement l'audit, la maintenance et l'évolution du système."
    ),

    "github_url": "",
    "demo_url": "",
    "featured": True,
    "start_date": "2024-10-06",

    "skills": [
        "Python",
        "Django",
        "Django REST Framework",
        "PostgreSQL",
        "Architecture Applicative",
        "Conception d'API REST",
        "Modélisation de Données",
        "RBAC",
        "Audit & Traçabilité",
        "Business Intelligence",
        "Metabase",
        "Docker & Docker Compose"
    ]


    },

    # =========================================================================
    # CATEGORIE 2 : CONSULTATIONS PONCTUELLES (INDÉPENDANT)
    # =========================================================================
    {
    "title": "AMEE — Plateforme de Gestion du Réseau d'Experts",
    "slug": "amee-network",
    "project_type": "CONSULTING",


    "summary": (
        "Plateforme institutionnelle permettant la gestion des adhésions, "
        "la qualification des experts, le pilotage du roster et la mise "
        "en relation entre consultants et organisations."
    ),

    "context": (
        "Conception d'une plateforme numérique pour l'Association Malienne "
        "des Évaluations Environnementales (AMEE) afin de structurer son "
        "réseau d'experts, moderniser ses processus d'adhésion et offrir "
        "un espace centralisé de gestion des opportunités, des membres "
        "et des contenus institutionnels."
    ),

    "role": "Consultant Indépendant / Architecte & Développeur",

    "problem": (
        "L'AMEE devait disposer d'un système capable de qualifier les experts, "
        "de garantir la fiabilité des profils publiés, de gérer les adhésions "
        "et cotisations, et de faciliter la mise en relation avec les "
        "institutions, ONG et entreprises recherchant des compétences "
        "en évaluation environnementale."
    ),

    "solution": (
        "Conception d'une architecture modulaire reposant sur Django et "
        "Django REST Framework. Développement d'un portail institutionnel, "
        "d'un système de gestion des adhésions, d'un moteur de validation "
        "du roster des consultants, d'un module de trésorerie, d'un espace "
        "de publication d'opportunités et d'un dispositif de contrôle qualité "
        "des prestations intégrant évaluations, signalements et mécanismes "
        "de certification interne."
    ),

    "results": (
        "Mise en place d'une plateforme unifiée regroupant le site "
        "institutionnel de l'association, la gestion des membres, le roster "
        "des experts et les services de mise en relation. Le système permet "
        "de gérer l'ensemble du cycle d'adhésion, de qualification et de "
        "suivi des consultants tout en assurant la traçabilité des "
        "cotisations, des évaluations et des interactions avec les "
        "organisations clientes."
    ),

    "deep_dive": (
        "L'architecture s'appuie sur plusieurs domaines métier spécialisés : "
        "adhésions, trésorerie, roster, missions, interactions, contrôle "
        "qualité et CMS. Le moteur de qualification applique des règles "
        "d'éligibilité basées sur les diplômes, l'expérience et la validation "
        "par le conseil de l'association. Le système intègre également des "
        "mécanismes de classement, de certification et de suivi de la qualité "
        "des prestations afin de renforcer la confiance entre les experts "
        "et les organisations utilisatrices."
    ),

    "lessons_learned": (
        "La formalisation rigoureuse des besoins et des règles métier est "
        "essentielle lorsqu'un système doit traduire des processus de "
        "gouvernance institutionnelle. Une architecture modulaire permet "
        "de faire évoluer progressivement les fonctionnalités tout en "
        "préservant la cohérence du système."
    ),

    "github_url": "",
    "demo_url": "https://amee-ml.com",
    "featured": True,

    "skills": [
        "Python",
        "Django",
        "Django REST Framework",
        "PostgreSQL",
        "Conception et intégration d'API REST",
        "Architecture Applicative",
        "Modélisation de Données",
        "RBAC",
        "CMS",
        "JavaScript"
    ],


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
        "featured": True,
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

PROFILE = {
    "full_name": "Mahamane Daouda Maïga",
    "title": "Architecte Applicatif & Data Engineer",
    "bio": (
        "Basé à Bamako (Mali), je conçois des systèmes d'information, "
        "des plateformes métiers et des architectures data permettant "
        "de transformer des besoins complexes en solutions fiables, "
        "évolutives et orientées décision."
    ),
    "about": (
        "Consultant BI et Data Engineer, je conçois et développe des "
        "systèmes d'information couvrant aussi bien les plateformes "
        "métiers que les architectures data. Mon expérience s'étend "
        "de l'analyse des besoins à la conception fonctionnelle, la "
        "modélisation des données, l'architecture applicative, le "
        "développement backend et le déploiement de solutions en production.\n\n"

        "J'interviens sur des projets variés : SIRH, ERP métier, "
        "plateformes institutionnelles, pipelines Data Engineering et "
        "outils décisionnels. Mon objectif est de construire des "
        "solutions robustes, maintenables et alignées sur les besoins "
        "opérationnels des organisations.\n\n"

        "À long terme, je souhaite évoluer vers des fonctions "
        "d'Architecte Data et Solution afin de concevoir des "
        "écosystèmes techniques où architecture, gouvernance des "
        "données et enjeux métier s'articulent de manière cohérente."
    ),
    "photo": "",
    "email": "mdmaiga01@gmail.com",
    "github_url": "https://github.com/dmaiga",
    "linkedin_url": "https://www.linkedin.com/in/mdmaiga",
    "cv": "",
}

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
            for folder in ("profile", "cv", "projects", "assets"):
                shutil.rmtree(media_root / folder, ignore_errors=True)
    
            self.stdout.write(
                self.style.SUCCESS("Données nettoyées avec succès.")
            )
    
        #
        # ------------------------------------------------------------------
        # Profil
        # ------------------------------------------------------------------
        #
        profile, _ = Profile.objects.get_or_create(
            full_name=PROFILE["full_name"]
        )
    
        for field, value in PROFILE.items():
            if field != "cv":
                setattr(profile, field, value)
    
        cv_path = options.get("cv")
        if cv_path:
            cv_file = Path(cv_path)
    
            if cv_file.exists():
                with open(cv_file, "rb") as f:
                    profile.cv.save(cv_file.name, File(f), save=False)
    
                self.stdout.write(f"CV enregistré : {cv_path}")
            else:
                self.stdout.write(
                    self.style.WARNING(f"CV introuvable : {cv_path}")
                )
    
        profile.save()
    
        self.stdout.write(
            self.style.SUCCESS(f"Profil synchronisé : {profile.full_name}")
        )
    
        #
        # ------------------------------------------------------------------
        # Compétences
        # ------------------------------------------------------------------
        #
        skill_map: dict[str, Skill] = {}
    
        for name, category in SKILLS:
            skill, created = Skill.objects.get_or_create(
                name=name,
                defaults={"category": category},
            )
    
            if not created and skill.category != category:
                skill.category = category
                skill.save(update_fields=["category"])
    
            skill_map[name] = skill
    
        self.stdout.write(
            self.style.SUCCESS(
                f"Référentiel de {len(skill_map)} compétences synchronisé."
            )
        )
    
        #
        # ------------------------------------------------------------------
        # Projets
        # ------------------------------------------------------------------
        #
        for project_data in PROJECTS:
        
            skills = project_data["skills"]
    
            fields = {
                k: v
                for k, v in project_data.items()
                if k != "skills"
            }
    
            project, created = Project.objects.get_or_create(
                slug=fields["slug"],
                defaults=fields,
            )
    
            if not created:
                for field, value in fields.items():
                    setattr(project, field, value)
    
                project.save()
    
            project.skills.set(
                [
                    skill_map[name]
                    for name in skills
                    if name in skill_map
                ]
            )
    
            self.stdout.write(
                f"  [{project.project_type}] "
                f"{'Créé' if created else 'Mis à jour'} : {project.title}"
            )
    
        self.stdout.write(
            self.style.SUCCESS(
                "\n✔ Base de données synchronisée avec succès."
            )
        )