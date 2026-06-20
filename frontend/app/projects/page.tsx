import type { Metadata } from "next"
import type { ProjectSummary } from "@/lib/types"
import { ProjectCard } from "@/components/project-card"

export const metadata: Metadata = {
  title: "Projets",
  description: "Tous les projets réalisés — expériences professionnelles, missions de conseil et projets académiques.",
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export default async function ProjectsPage() {
  const res = await fetch(`${API}/api/projects/`, { cache: "no-store" })

  if (!res.ok) {
    throw new Error("Impossible de charger les projets")
  }

  const projects: ProjectSummary[] = await res.json()

  const featuredCount = projects.filter((p) => p.featured).length

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div
        className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 space-y-2"
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Projets</h1>
        {projects.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {projects.length} projet{projects.length > 1 ? "s" : ""}
            {featuredCount > 0 && ` · ${featuredCount} mis en avant`}
          </p>
        )}
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">Aucun projet pour le moment.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
