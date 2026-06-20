import type { ProjectDetail } from "@/lib/types"
import { PROJECT_TYPE_LABELS } from "@/lib/types"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const res = await fetch(`${API}/api/projects/${slug}/`, { cache: "no-store" })

  if (res.status === 404) {
    notFound()
  }

  if (!res.ok) {
    throw new Error("Impossible de charger le projet")
  }

  const project: ProjectDetail = await res.json()

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500">
      {/* Navigation retour */}
      <Link
        href="/projects"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        ← Tous les projets
      </Link>

      {/* En-tête */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
            {project.title}
          </h1>
          <Badge variant="outline" className="shrink-0 mt-1">
            {PROJECT_TYPE_LABELS[project.project_type]}
          </Badge>
        </div>

        <p className="text-base sm:text-lg text-muted-foreground">{project.short_description}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {project.role && (
            <span>
              Rôle :{" "}
              <strong className="text-foreground font-medium">{project.role}</strong>
            </span>
          )}
          {project.start_date && (
            <span>
              {new Date(project.start_date).getFullYear()}
              {project.end_date && ` – ${new Date(project.end_date).getFullYear()}`}
            </span>
          )}
        </div>

        {(project.github_url || project.demo_url) && (
          <div className="flex flex-wrap gap-3 pt-1">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">GitHub</Button>
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">Démo</Button>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      {project.description && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold uppercase tracking-widest text-muted-foreground">
            Description
          </h2>
          <p className="text-sm leading-relaxed">{project.description}</p>
        </section>
      )}

      {/* Challenge */}
      {project.challenge && (
        <section className="space-y-3 border-l-2 border-border pl-4">
          <h2 className="text-base font-semibold">Problème à résoudre</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{project.challenge}</p>
        </section>
      )}

      {/* Solution */}
      {project.solution && (
        <section className="space-y-3 border-l-2 border-border pl-4">
          <h2 className="text-base font-semibold">Approche et solution</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
        </section>
      )}

      {/* Leçons apprises */}
      {project.lessons_learned && (
        <section className="space-y-3 border-l-2 border-border pl-4">
          <h2 className="text-base font-semibold">Leçons apprises</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{project.lessons_learned}</p>
        </section>
      )}

      {/* Compétences */}
      {project.skills.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold uppercase tracking-widest text-muted-foreground">
            Technologies utilisées
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Badge key={skill.id} variant="secondary">
                {skill.name}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Assets */}
      {project.assets.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold uppercase tracking-widest text-muted-foreground">
            Documents et ressources
          </h2>
          <ul className="space-y-2">
            {project.assets.map((asset) => (
              <li key={asset.id}>
                <a
                  href={`${API}${asset.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline underline-offset-4 hover:text-foreground transition-colors duration-200"
                >
                  {asset.title}
                  <span className="text-xs text-muted-foreground ml-2">({asset.asset_type})</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
