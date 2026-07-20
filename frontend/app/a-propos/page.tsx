import type { Metadata } from "next"
import type { Profile, Skill, ProjectSummary } from "@/lib/types"
import { PROJECT_TYPE_LABELS } from "@/lib/types"
import Image from "next/image"
import {
  ExternalLink,
  Download,
  Database,
  Network,
  BarChart3,
  Code2,
  HardDrive,
  Cloud,
  Layers,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Markdown } from "@/components/markdown"
import { mediaUrl } from "@/lib/utils"
import { REVALIDATE } from "@/lib/config"
import { fetchGithubStats, githubUsername } from "@/lib/github"

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Qui je suis, ma démarche de travail, mes compétences et mon parcours — Mahamane Daouda Maiga.",
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

// Icône par catégorie de compétence (lecture visuelle rapide, pas de niveau/score).
const CATEGORY_ICONS: Record<string, typeof Layers> = {
  "Data Engineering & Analytics": Database,
  "Architecture & SI": Network,
  "ETL/ELT & BI": BarChart3,
  "Systèmes d'Information & Dev": Code2,
  "Bases de Données & Stockage": HardDrive,
  "Cloud & Infrastructure": Cloud,
}

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: REVALIDATE } })
    if (!res.ok) return fallback
    return res.json()
  } catch {
    return fallback
  }
}

export default async function AProposPage() {
  const profileRes = await fetch(`${API}/api/profile/`, { next: { revalidate: REVALIDATE } })
  if (!profileRes.ok) throw new Error("Impossible de charger le profil")
  const profile: Profile = await profileRes.json()

  const username = profile.github_url ? githubUsername(profile.github_url) : null

  const [skills, projects, githubStats] = await Promise.all([
    getJson<Skill[]>("/api/skills/", []),
    getJson<ProjectSummary[]>("/api/projects/", []),
    username ? fetchGithubStats(username) : Promise.resolve(null),
  ])

  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    ;(acc[skill.category] ??= []).push(skill)
    return acc
  }, {})

  // Parcours dérivé des projets datés (ordre API = -start_date).
  const parcours = projects.filter((p) => p.start_date)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500">

        {/* ── Colonne gauche : identité (sticky) ───────────────────── */}
        <aside className="min-w-0 md:col-span-1 space-y-6 md:sticky md:top-20 md:self-start">
          {profile.photo && (
            <div className="relative size-28 overflow-hidden rounded-2xl ring-2 ring-brand/20 shadow-sm">
              <Image
                src={mediaUrl(profile.photo, API)}
                alt={profile.full_name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
          )}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{profile.full_name}</h1>
            <p className="text-muted-foreground">{profile.title}</p>
          </div>

          <div className="flex flex-wrap gap-2 border-t pt-6">
            {profile.github_url && (
              <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <ExternalLink className="size-3.5 mr-1.5" />
                  GitHub
                </Button>
              </a>
            )}
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <ExternalLink className="size-3.5 mr-1.5" />
                  LinkedIn
                </Button>
              </a>
            )}
          </div>

          {profile.cv && (
            <a href={mediaUrl(profile.cv, API)} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Download className="size-3.5 mr-1.5" />
                Télécharger le CV
              </Button>
            </a>
          )}
        </aside>

        {/* ── Colonne droite : contenu ─────────────────────────────── */}
        <div className="min-w-0 md:col-span-2 space-y-12">

          {/* Qui suis-je */}
          {profile.about && (
            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Qui suis-je
              </h2>
              <Markdown className="max-w-prose text-sm text-muted-foreground">{profile.about}</Markdown>
            </section>
          )}

          {/* Ma démarche */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Ma démarche
            </h2>
            <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
              Je fonctionne en mode <em>Owner avant Dev</em> : je pose l&apos;intention avant le
              code. Chaque projet commence par une phase de cadrage (vision, parties prenantes,
              objectifs, backlog) versionnée et documentée, avant la moindre ligne de code. Les
              décisions techniques structurantes sont argumentées et tracées, pas prises à la
              volée.
            </p>
          </section>

          {/* Compétences */}
          {skills.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Compétences
              </h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {Object.entries(skillsByCategory).map(([category, items]) => {
                  const Icon = CATEGORY_ICONS[category] ?? Layers
                  return (
                    <div key={category} className="space-y-2">
                      <p className="flex items-center gap-1.5 text-sm font-medium">
                        <Icon className="size-4 text-brand shrink-0" />
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
                  )
                })}
              </div>
            </section>
          )}

          {/* GitHub */}
          {githubStats && (
            <section className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                GitHub
              </h2>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-brand transition-colors duration-200"
                >
                  <ExternalLink className="size-3.5" />@{githubStats.username}
                </a>
                <span>{githubStats.publicRepos} dépôts publics</span>
                <span>{githubStats.followers} followers</span>
                <span>Sur GitHub depuis {githubStats.memberSinceYear}</span>
                {githubStats.topLanguages.length > 0 && (
                  <span>{githubStats.topLanguages.join(" · ")}</span>
                )}
              </div>
              <div className="overflow-x-auto rounded-lg border bg-surface p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://ghchart.rshah.org/${githubStats.username}`}
                  alt={`Calendrier des contributions GitHub de ${githubStats.username}`}
                  loading="lazy"
                  className="min-w-[640px] w-full"
                />
              </div>
            </section>
          )}

          {/* Parcours */}
          {parcours.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Parcours
              </h2>
              <ul className="space-y-4">
                {parcours.map((p) => (
                  <li key={p.id} className="flex gap-4">
                    <span className="w-12 shrink-0 text-sm text-muted-foreground pt-0.5">
                      {p.start_date ? new Date(p.start_date).getFullYear() : ""}
                    </span>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">{p.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.role}
                        {p.role && " · "}
                        {PROJECT_TYPE_LABELS[p.project_type]}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
