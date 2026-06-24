import type { Metadata } from "next"
import type { ProjectSummary } from "@/lib/types"
import { PROJECT_CATEGORY_ORDER } from "@/lib/types"
import { ProjectCard } from "@/components/project-card"

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Toutes les réalisations — expériences professionnelles, consultations ponctuelles, projets académiques et personnels.",
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export default async function ProjectsPage() {
  const res = await fetch(`${API}/api/projects/`, { next: { revalidate: 3600 } })

  if (!res.ok) {
    throw new Error("Impossible de charger les projets")
  }

  const projects: ProjectSummary[] = await res.json()

  const featuredCount = projects.filter((p) => p.featured).length

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <div
        className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 space-y-2"
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Réalisations</h1>
        {projects.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {projects.length} réalisation{projects.length > 1 ? "s" : ""}
            {featuredCount > 0 && ` · ${featuredCount} mise${featuredCount > 1 ? "s" : ""} en avant`}
          </p>
        )}
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">Aucune réalisation pour le moment.</p>
      ) : (
        <div className="space-y-12">
          {PROJECT_CATEGORY_ORDER.map(({ type, title }) => {
            const items = projects.filter((p) => p.project_type === type)
            if (items.length === 0) return null
            return (
              <section key={type} className="space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {title}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
