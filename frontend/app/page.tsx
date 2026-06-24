import type { Profile, Skill, ProjectSummary } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Mail, ArrowRight, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { Markdown } from "@/components/markdown"
import { DOMAINS } from "@/lib/domains"
import { mediaUrl } from "@/lib/utils"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export default async function HomePage() {
  const [profileRes, skillsRes, projectsRes] = await Promise.all([
    fetch(`${API}/api/profile/`, { next: { revalidate: 3600 } }),
    fetch(`${API}/api/skills/`, { next: { revalidate: 3600 } }),
    fetch(`${API}/api/projects/`, { next: { revalidate: 3600 } }),
  ])

  if (!profileRes.ok || !skillsRes.ok || !projectsRes.ok) {
    throw new Error("Erreur lors du chargement des données")
  }

  const profile: Profile = await profileRes.json()
  const skills: Skill[] = await skillsRes.json()
  const projects: ProjectSummary[] = await projectsRes.json()
  const featured = projects.filter((p) => p.featured)

  const missionCount = projects.filter(
    (p) => p.project_type === "PROFESSIONAL" || p.project_type === "CONSULTING",
  ).length

  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 space-y-8">

        {/* Badges contexte */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground border rounded-full px-3 py-1">
            <MapPin className="size-3" />
            Bamako, Mali
          </span>
        </div>

        {/* Profil principal */}
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {profile.photo && (
            <Image
              src={mediaUrl(profile.photo, API)}
              alt={profile.full_name}
              width={120}
              height={120}
              className="rounded-2xl object-cover shrink-0 ring-2 ring-primary/20 shadow-sm"
              preload
            />
          )}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{profile.full_name}</h1>
              <p className="text-lg text-muted-foreground mt-1">{profile.title}</p>
            </div>
            <Markdown className="text-sm text-muted-foreground max-w-xl">{profile.bio}</Markdown>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/projects">
                <Button size="sm">
                  Voir les projets
                  <ArrowRight className="size-3.5 ml-1.5" />
                </Button>
              </Link>
              {profile.email && (
                <a href={`mailto:${profile.email}`}>
                  <Button variant="outline" size="sm">
                    <Mail className="size-3.5 mr-1.5" />
                    Me contacter
                  </Button>
                </a>
              )}
              {profile.cv && (
                <a href={mediaUrl(profile.cv, API)} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm">
                    <Download className="size-3.5 mr-1.5" />
                    CV
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-border border rounded-xl">
          {[
            { value: projects.length, label: "projets réalisés" },
            { value: skills.length, label: "compétences" },
            { value: missionCount, label: "missions clientes" },
          ].map(({ value, label }) => (
            <div key={label} className="px-6 py-4 text-center">
              <div className="text-2xl font-bold text-primary">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Domaines */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {DOMAINS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-lg border px-4 py-3 bg-muted/40 hover:bg-accent/40 transition-colors duration-200"
            >
              <Icon className="size-4 text-primary shrink-0" />
              <span className="text-xs font-medium leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Compétences ──────────────────────────────────────── */}
      {skills.length > 0 && (
        <section
          className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 space-y-6"
          style={{ "--tw-animation-delay": "150ms" } as React.CSSProperties}
        >
          <h2 className="text-xl font-semibold">Compétences</h2>
          <div className="space-y-5">
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2.5">
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

      {/* ── Projets mis en avant ─────────────────────────────── */}
      {featured.length > 0 && (
        <section
          className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 space-y-6"
          style={{ "--tw-animation-delay": "300ms" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between">
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
