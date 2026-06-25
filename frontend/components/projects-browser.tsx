"use client"

import { useState } from "react"
import type { ProjectSummary, ProjectType } from "@/lib/types"
import { PROJECT_TYPE_LABELS, PROJECT_CATEGORY_ORDER } from "@/lib/types"
import { ProjectCard } from "@/components/project-card"
import { cn } from "@/lib/utils"

type Filter = ProjectType | "ALL"

export function ProjectsBrowser({ projects }: { projects: ProjectSummary[] }) {
  const [filter, setFilter] = useState<Filter>("ALL")

  // Types réellement présents, dans l'ordre canonique — pas de filtre vide.
  const presentTypes = PROJECT_CATEGORY_ORDER.map((c) => c.type).filter((t) =>
    projects.some((p) => p.project_type === t),
  )

  const pills: { key: Filter; label: string }[] = [
    { key: "ALL", label: "Tous" },
    ...presentTypes.map((t) => ({ key: t, label: PROJECT_TYPE_LABELS[t] })),
  ]

  const filtered =
    filter === "ALL" ? projects : projects.filter((p) => p.project_type === filter)

  return (
    <div className="space-y-6">
      {/* Filtre par contexte (pas par techno) */}
      <div className="flex flex-wrap gap-2">
        {pills.map(({ key, label }) => {
          const active = filter === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={active}
              className={cn(
                "rounded-full border border-border px-3 py-1 text-sm transition-colors duration-200",
                active
                  ? "bg-secondary text-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Grille */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
