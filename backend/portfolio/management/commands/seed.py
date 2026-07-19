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
        "l'automatisation de processus métiers au sein d'une plateforme unifiée. "
        "Le mandat s'étend à DAMS, société cliente d'Antarès RH, avec une "
        "plateforme de gestion opérationnelle et décisionnelle couvrant "
        "production, distribution, finance et pilotage."
    ),

    "context": (
        "Participation à la conception et au développement du SIRH Antarès RH, "
        "une plateforme modulaire destinée à couvrir l'ensemble du cycle de vie "
        "des talents : acquisition, recrutement, intégration, gestion documentaire "
        "et services RH. Le projet vise à fournir une base technologique évolutive "
        "capable de supporter à terme un ATS complet, un vivier de talents, "
        "des workflows RH avancés et des services d'automatisation documentaire.\n\n"

        "Dans le cadre des prestations de gestion opérationnelle assurées par "
        "Antarès RH pour DAMS, société de distribution de produits "
        "agroalimentaires, j'interviens également comme référent technique sur "
        "un système d'information couvrant la production agricole, la "
        "distribution terrain, les ventes, la trésorerie, les stocks, la paie "
        "et le pilotage décisionnel de l'entreprise."
    ),

    "role": "Référent Technique / Architecte Applicatif & Data",

    "problem": (
        "Les processus RH reposaient sur des outils dispersés, des traitements "
        "manuels et une faible centralisation des informations. L'objectif était "
        "de construire une plateforme unique capable de gérer les parcours "
        "candidats, les opportunités, les contenus RH, les dossiers documentaires "
        "et les futurs processus de recrutement tout en garantissant sécurité, "
        "traçabilité et évolutivité.\n\n"

        "Chez DAMS, l'enjeu était de centraliser les opérations agricoles, "
        "commerciales, logistiques et financières dans une plateforme unique, "
        "avec une traçabilité complète des flux physiques et monétaires et une "
        "vision consolidée permettant à la direction de piloter l'activité et "
        "d'identifier rapidement les anomalies."
    ),

    "solution": (
        "Conception d'une architecture modulaire sous Django et Django REST Framework. "
        "Développement d'un portail candidat autonome, d'un système de gestion "
        "des opportunités (emplois, appels d'offres, formations, événements), "
        "d'un espace collaborateur, d'un CMS RH multilingue, d'un espace "
        "d'administration RH et de mécanismes de gestion documentaire sécurisés. "
        "Développement d'un moteur Payroll Audit destiné à automatiser la "
        "préparation des paiements à partir des bulletins de paie et à réduire "
        "les risques d'erreurs opérationnelles.\n\n"

        "Pour DAMS, développement de modules dédiés à la gestion des cultures, "
        "au suivi des rendements, à la distribution terrain, aux ventes, aux "
        "stocks, à la trésorerie, à la paie, aux incentives, à l'audit "
        "financier, aux rapports journaliers et à l'analyse décisionnelle, "
        "avec API REST, historisation, alertes métier et tableaux de bord "
        "analytiques."
    ),

    "results": (
        "Plateforme Antarès RH déployée en production et déjà utilisée par des "
        "candidats et utilisateurs réels : vitrine institutionnelle, portail "
        "candidat, publication d'offres d'emploi, d'appels d'offres, de stages "
        "et de ressources RH, espace collaborateur et espace RH dédiés. Au "
        "cours des premières semaines d'exploitation, plus de 450 pages vues, "
        "206 visites et 125 visiteurs uniques, avec un temps moyen de "
        "consultation proche de cinq minutes par visite.\n\n"

        "La plateforme DAMS est déployée en production et utilisée "
        "quotidiennement par une cinquantaine d'utilisateurs : direction, "
        "responsables des opérations, superviseurs, gestionnaires de stock, "
        "agents terrain et équipes commerciales, avec suivi des cultures, "
        "des ventes, des stocks, de la trésorerie, de la paie et des "
        "incentives, et une vision consolidée de l'activité via tableaux de "
        "bord décisionnels."
    ),

    "deep_dive": (
        "L'écosystème Antarès RH repose sur plusieurs domaines spécialisés : "
        "site public, portail candidat, gestion des opportunités, gestion des "
        "collaborateurs, CMS RH multilingue, espace RH et moteur documentaire, "
        "avec isolation des données, contrôle d'accès et traçabilité. "
        "L'architecture prépare l'intégration progressive d'un ATS, d'un "
        "vivier de talents, de moteurs de matching et de services "
        "d'automatisation RH.\n\n"

        "Côté DAMS, l'architecture distingue production agricole, "
        "distribution, finance, supervision, direction, surveillance et "
        "reporting, avec contrôle d'accès, historisation et audit pour "
        "sécuriser les flux financiers et logistiques. Une application "
        "analytique dédiée consomme les API REST du système principal pour "
        "fournir analyses décisionnelles, comparaisons temporelles et "
        "indicateurs de rendement agricole."
    ),

        "lessons_learned": (
            "La maîtrise de la gouvernance documentaire et de l'alignement avec "
            "les besoins métiers est cruciale : l'isolation des rôles et la "
            "traçabilité des validations dès la conception évitent "
            "d'importantes réécritures d'architecture en production.\n\n"

            "Sur DAMS, la traçabilité des flux métier pensée dès la "
            "conception, associée à une architecture modulaire et une "
            "séparation claire entre opérations et analyse, facilite "
            "fortement l'audit, la maintenance et l'évolution du système."
        ),
        "github_url": "",
        "demo_url": "https://antares-rh.com/",
        "featured": True,
        "start_date": "2025-06-19",
        "skills": [
            "Python",
            "Django",
            "Django REST Framework",
            "PostgreSQL",
            "Docker & Docker Compose",
            "Git & GitHub Actions",
            "Architecture Applicative",
            "Conception et intégration d'API REST",
            "Modélisation de Données",
            "Contrôle d'Accès (RBAC)",
            "Audit & Traçabilité",
            "Metabase",
            "Architecture SIRH",
            "Gestion Documentaire",
        ],
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

    # =========================================================================
    # CATEGORIE 3 : PROJETS ACADÉMIQUES (MASTER 2 DATA SCIENCE)
    # =========================================================================
    {
    "title": "Projet d'Entreprise BI — AES Global Tech Market",
    "slug": "bi-aes-global",
    "project_type": "ACADEMIC",
    
    
    "summary": (
        "Conception d'une plateforme décisionnelle complète intégrant gouvernance "
        "des données, Data Warehouse multidimensionnel et pipelines ELT pour le "
        "pilotage commercial, logistique et financier."
    ),
    
    "context": (
        "Projet d'entreprise réalisé dans le cadre du Master autour de l'application "
        "transactionnelle Tassouma. L'objectif était de concevoir une plateforme "
        "BI répondant à des besoins réels de pilotage en partant de l'analyse "
        "métier, de la gouvernance des données et des exigences décisionnelles "
        "avant la conception technique."
    ),
    
    "role": "Data Engineer / Architecte BI",
    
    "problem": (
        "L'entreprise disposait de données opérationnelles réparties dans plusieurs "
        "domaines métiers mais ne possédait pas de plateforme analytique permettant "
        "de standardiser les KPI, consolider les indicateurs, séparer les usages "
        "transactionnels des usages décisionnels et garantir la qualité des données."
    ),
    
    "solution": (
        "Réalisation d'une étude des besoins décisionnels des directions "
        "commerciale, financière, logistique et générale afin de définir les "
        "indicateurs stratégiques, les règles de gouvernance et les modèles "
        "analytiques. Conception d'une architecture ELT multicouche "
        "(Staging → Warehouse → Data Marts), d'un schéma multidimensionnel "
        "en constellation, d'une politique de gouvernance des données, "
        "de plus de 155 tests dbt automatisés, d'une documentation analytique "
        "centralisée et d'un pipeline industrialisé alimentant les futurs "
        "tableaux de bord décisionnels."
    ),
    
    "results": (
        "Conception d'une plateforme BI complète comprenant un Data Warehouse "
        "centralisé, plusieurs Data Marts spécialisés (commercial, finance, "
        "supply chain, marketing et direction), une documentation analytique "
        "générée automatiquement, une stratégie Fail-Safe empêchant la "
        "publication de données invalides et un socle prêt à accueillir "
        "des usages avancés de Data Science et de prévision des ventes."
    ),
    
    "deep_dive": (
        "Le projet a débuté par une phase d'analyse métier et de gouvernance "
        "des données permettant d'identifier les besoins décisionnels, les "
        "KPI stratégiques, les responsabilités des acteurs et les règles "
        "de qualité des données. L'architecture repose ensuite sur une "
        "Modern Data Stack composée de PostgreSQL, dbt, pgloader, Docker "
        "et Metabase, avec une séparation stricte des couches Staging, "
        "Warehouse et Data Marts. La plateforme applique des conventions "
        "de nommage, une documentation automatique, des contrôles de qualité "
        "dbt, une gestion des accès par profil et une architecture pensée "
        "pour évoluer vers le streaming, le CDC, l'observabilité et les "
        "cas d'usage Data Science."
    ),
    
    "lessons_learned": (
        "La gouvernance et la qualité des données priment sur la simple "
        "tuyauterie. L'automatisation des tests sur dbt garantit la "
        "fiabilité des indicateurs transmis aux directions exécutives."
    ),
    
    "github_url": "",
    "demo_url": "",
    "featured": True,
    
    "skills": [
        "Python",
        "SQL",
        "PostgreSQL",
        "dbt Core",
        "Docker & Docker Compose",
        "Metabase",
        "Modélisation dimensionnelle",
        "Architecture Applicative",
        "Modélisation de Données",
        "Business Intelligence"
    ],
    
    
    },


]

PROFILE = {
    "full_name": "Mahamane Daouda Maïga",
    "title": "Systèmes d'Information | Data | Automatisation",
    "bio": (
        "Basé à Bamako (Mali), je conçois des systèmes d'information, "
        "des plateformes métiers et des architectures data permettant "
        "de transformer des besoins complexes en solutions fiables, "
        "évolutives et orientées décision."
    ),
    "about": (
        "Je conçois, développe, déploie et fais évoluer des plateformes "
        "numériques, à l'intersection des systèmes d'information, du "
        "développement applicatif, de la donnée et de l'automatisation "
        "des processus métier.\n\n"

        "J'interviens aujourd'hui comme Assistant Data et Informatique "
        "chez Antarès SARL, cabinet de gestion des ressources humaines "
        "basé à Bamako, mais ce qui me définit tient moins à un "
        "intitulé qu'à un spectre de compétences : porter une solution "
        "de bout en bout, de l'analyse du besoin jusqu'à la maintenance. "
        "J'interviens sur l'ensemble du cycle de vie d'une plateforme : "
        "analyse des besoins, conception fonctionnelle, modélisation "
        "des données, architecture applicative, développement, "
        "déploiement, maintenance.\n\n"

        "Mes réalisations couvrent les systèmes d'information RH, les "
        "plateformes opérationnelles et décisionnelles, les portails "
        "métiers collaboratifs, les plateformes commerciales, ainsi que "
        "l'ingénierie des données et la Business Intelligence.\n\n"

        "À terme, je vise des fonctions d'architecte data et solutions "
        " concevoir des écosystèmes techniques où architecture, "
        "gouvernance des données et enjeux métier s'articulent de "
        "manière cohérente. Ma progression se mesure à la qualité des "
        "systèmes que je sais concevoir et défendre, pas à un titre."
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