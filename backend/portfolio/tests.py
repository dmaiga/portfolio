from django.test import TestCase
from django.core.exceptions import ValidationError

from .models import Profile, Skill, Project, ProjectType


class ProfileEndpointTests(TestCase):
    url = "/api/profile/"

    def test_returns_404_when_no_profile(self):
        self.assertEqual(self.client.get(self.url).status_code, 404)

    def test_returns_profile_fields(self):
        Profile.objects.create(
            full_name="Test", title="Dev", bio="bio",
            about="**à propos**", email="t@example.com",
        )
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["full_name"], "Test")
        self.assertIn("about", data)


class ProfileSingletonTests(TestCase):
    def test_only_one_profile_allowed(self):
        Profile.objects.create(full_name="A", title="t", bio="b", email="a@a.com")
        with self.assertRaises(ValidationError):
            Profile.objects.create(full_name="B", title="t", bio="b", email="b@b.com")


class SkillsEndpointTests(TestCase):
    def test_lists_skills(self):
        Skill.objects.create(name="Python", category="Langages")
        res = self.client.get("/api/skills/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.json()), 1)


class ProjectsApiTests(TestCase):
    def setUp(self):
        self.skill = Skill.objects.create(name="Django", category="Backend")
        self.project = Project.objects.create(
            project_type=ProjectType.PROFESSIONAL,
            title="Big Data", slug="big-data",
            summary="résumé", context="contexte",
            role="Lead", problem="le problème", results="des résultats",
        )
        self.project.skills.add(self.skill)

    def test_list_returns_projects_with_skills(self):
        res = self.client.get("/api/projects/")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(len(data), 1)
        item = data[0]
        self.assertEqual(item["slug"], "big-data")
        self.assertEqual(item["summary"], "résumé")
        self.assertEqual(item["project_type"], "PROFESSIONAL")
        self.assertEqual(len(item["skills"]), 1)
        # results n'appartient qu'au détail, pas à la liste
        self.assertNotIn("results", item)

    def test_detail_returns_full_fields(self):
        res = self.client.get("/api/projects/big-data/")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["context"], "contexte")
        self.assertEqual(data["problem"], "le problème")
        self.assertEqual(data["results"], "des résultats")
        # nouveaux champs du parcours exposés par le contrat
        for field in ("summary", "deep_dive", "lessons_learned", "assets"):
            self.assertIn(field, data)

    def test_detail_returns_404_for_unknown_slug(self):
        self.assertEqual(self.client.get("/api/projects/inconnu/").status_code, 404)
