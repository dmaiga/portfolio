import type { Profile, Skill, ProjectSummary } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ProjectCard } from "@/components/project-card"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export default async function HomePage() {
  const [profileRes, skillsRes, projectsRes] = await Promise.all([
    fetch(`${API}/api/profile/`, { cache: "no-store" }),
    fetch(`${API}/api/skills/`, { cache: "no-store" }),
    fetch(`${API}/api/projects/`, { cache: "no-store" }),
  ])

  if (!profileRes.ok || !skillsRes.ok || !projectsRes.ok) {
    throw new Error("Erreur lors du chargement des données")
  }

  const profile: Profile = await profileRes.json()
  const skills: Skill[] = await skillsRes.json()
  const projects: ProjectSummary[] = await projectsRes.json()
  const featured = projects.filter((p) => p.featured)

  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      {/* Profil */}
      <section className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
        {profile.photo && (
          <Image
            src={`${API}${profile.photo}`}
            alt={profile.full_name}
            width={112}
            height={112}
            className="rounded-full object-cover shrink-0 ring-2 ring-border"
          />
        )}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{profile.full_name}</h1>
          <p className="text-lg text-muted-foreground">{profile.title}</p>
          <p className="text-sm leading-relaxed max-w-2xl text-muted-foreground">{profile.bio}</p>
        </div>
      </section>

      {/* Compétences */}
      {skills.length > 0 && (
        <section
          className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500"
          style={{ "--tw-animation-delay": "150ms" } as React.CSSProperties}
        >
          <h2 className="text-xl font-semibold mb-6">Compétences</h2>
          <div className="space-y-5">
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill.id} variant="secondary">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projets mis en avant */}
      {featured.length > 0 && (
        <section
          className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500"
          style={{ "--tw-animation-delay": "300ms" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Projets mis en avant</h2>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Voir tous →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
