import type { Metadata } from "next"
import type { Profile, Skill, ProjectSummary } from "@/lib/types"
import { PROJECT_TYPE_LABELS } from "@/lib/types"
import Image from "next/image"
import { FileText, ExternalLink, ArrowRight, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Markdown } from "@/components/markdown"
import { mediaUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Qui je suis, ma démarche de travail, mes compétences et mon parcours — Mahamane Daouda Maiga.",
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

// Renseigner NEXT_PUBLIC_REPO_URL une fois le dépôt poussé sur GitHub.
// Tant qu'il est vide, les artefacts s'affichent en libellés simples — jamais de lien mort.
const REPO_URL = process.env.NEXT_PUBLIC_REPO_URL ?? ""

function repoLink(path: string, isDir = false): string | null {
  if (!REPO_URL) return null
  return `${REPO_URL}/${isDir ? "tree" : "blob"}/HEAD/${path}`
}

type Artifact = { label: string; path: string; isDir?: boolean }

const DEMARCHE: Artifact[] = [
  { label: "Vision", path: "docs/00-vision.md" },
  { label: "Analyse", path: "docs/01-stakeholders.md" },
  { label: "Objectifs", path: "docs/02-objectifs.md" },
  { label: "Personas", path: "docs/03-personas.md" },
  { label: "Architecture", path: "docs/05-archi-info.md" },
  { label: "Backlog", path: "docs/08-backlog.md" },
  { label: "Sprints", path: "docs/sprints", isDir: true },
  { label: "Livraison", path: "docs/backlog-dev.md" },
]

const CONVENTIONS: Artifact[] = [
  { label: "Posture & auteur (ABOUT-ME)", path: "rules/ABOUT-ME.md" },
  { label: "Convention de commits (GIT)", path: "rules/GIT.md" },
  { label: "Stack officielle (STACK)", path: "rules/STACK.md" },
]

const ARTEFACTS: Artifact[] = [
  { label: "Architecture technique", path: "docs/ARCHITECTURE.md" },
  { label: "Orchestration (CLAUDE.md)", path: "CLAUDE.md" },
  { label: "Décisions d'architecture (ADR)", path: "docs/DECISIONS.md" },
  { label: "Backlog & critères d'acceptation", path: "docs/08-backlog.md" },
  { label: "Sprints", path: "docs/sprints", isDir: true },
]

function ArtifactList({ items }: { items: Artifact[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const href = repoLink(item.path, item.isDir)
        return (
          <li key={item.path}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-foreground transition-colors duration-200"
              >
                <FileText className="size-3.5 text-muted-foreground shrink-0" />
                {item.label}
                <ExternalLink className="size-3 text-muted-foreground" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="size-3.5 shrink-0" />
                {item.label}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 3600 } })
    if (!res.ok) return fallback
    return res.json()
  } catch {
    return fallback
  }
}

export default async function AProposPage() {
  const profileRes = await fetch(`${API}/api/profile/`, { next: { revalidate: 3600 } })
  if (!profileRes.ok) throw new Error("Impossible de charger le profil")
  const profile: Profile = await profileRes.json()

  const [skills, projects] = await Promise.all([
    getJson<Skill[]>("/api/skills/", []),
    getJson<ProjectSummary[]>("/api/projects/", []),
  ])

  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    ;(acc[skill.category] ??= []).push(skill)
    return acc
  }, {})

  // Parcours dérivé des projets datés (ordre API = -start_date).
  const parcours = projects.filter((p) => p.start_date)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-10 md:gap-12 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500">

        {/* ── Colonne gauche : identité (sticky) ───────────────────── */}
        <aside className="md:col-span-1 space-y-6 md:sticky md:top-20 md:self-start">
          {profile.photo && (
            <Image
              src={mediaUrl(profile.photo, API)}
              alt={profile.full_name}
              width={112}
              height={112}
              className="rounded-2xl object-cover ring-2 ring-brand/20 shadow-sm"
            />
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
        <div className="md:col-span-2 space-y-12">

          {/* Qui suis-je */}
          {profile.about && (
            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Qui suis-je
              </h2>
              <Markdown className="text-sm text-muted-foreground">{profile.about}</Markdown>
            </section>
          )}

          {/* Ma démarche */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Ma démarche
              </h2>
              <p className="text-sm text-muted-foreground">
                Owner avant Dev : intentions, décisions et specs versionnées dans le dépôt avant la
                moindre ligne de code. Chaque étape laisse une trace publique.
              </p>
            </div>

            {/* La démarche projet */}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
              {DEMARCHE.map((step, i) => {
                const href = repoLink(step.path, step.isDir)
                return (
                  <span key={step.path} className="inline-flex items-center gap-1.5">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-border px-2.5 py-1 text-sm hover:bg-muted transition-colors duration-200"
                      >
                        {step.label}
                      </a>
                    ) : (
                      <span className="rounded-md border border-border px-2.5 py-1 text-sm bg-muted/40">
                        {step.label}
                      </span>
                    )}
                    {i < DEMARCHE.length - 1 && (
                      <ArrowRight className="size-3.5 text-muted-foreground shrink-0" />
                    )}
                  </span>
                )
              })}
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Conventions
                </h3>
                <ArtifactList items={CONVENTIONS} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Artefacts
                </h3>
                <ArtifactList items={ARTEFACTS} />
              </div>
            </div>

            <div className="space-y-2 border-l-2 border-brand/30 pl-4">
              <h3 className="text-base font-semibold">Le rôle des agents IA</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Les agents IA sont utilisés comme outils de production, de revue et de réflexion. Ils
                participent à la génération de contenu technique mais ne remplacent ni les décisions
                produit, ni les choix d&apos;architecture, ni la validation finale. L&apos;objectif est
                de montrer leur usage concret dans le processus de travail, pas de proclamer leur
                présence.
              </p>
            </div>
          </section>

          {/* Compétences */}
          {skills.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Compétences
              </h2>
              <div className="space-y-4">
                {Object.entries(skillsByCategory).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <p className="text-sm font-medium">{category}</p>
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
