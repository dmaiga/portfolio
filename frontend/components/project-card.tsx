import type { ProjectSummary } from "@/lib/types"
import { PROJECT_TYPE_LABELS } from "@/lib/types"
import Link from "next/link"

interface ProjectCardProps {
  project: ProjectSummary
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const visibleSkills = project.skills.slice(0, 4)
  const extraSkills = project.skills.length - visibleSkills.length
  const year = project.start_date ? new Date(project.start_date).getFullYear() : null

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 h-full"
      style={{ "--tw-animation-delay": `${index * 75}ms` } as React.CSSProperties}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-sm"
      >
        {/* Contexte (badge) + année */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
            {PROJECT_TYPE_LABELS[project.project_type]}
          </span>
          {year && <span className="text-xs text-muted-foreground shrink-0">{year}</span>}
        </div>

        {/* Titre */}
        <h3 className="mt-3 text-sm font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-brand">
          {project.title}
        </h3>

        {/* Accroche — résumé / problème résolu */}
        <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        {/* Technologies */}
        {visibleSkills.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1 pt-4">
            {visibleSkills.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
              >
                {skill.name}
              </span>
            ))}
            {extraSkills > 0 && (
              <span className="self-center text-xs text-muted-foreground">+{extraSkills}</span>
            )}
          </div>
        )}
      </Link>
    </div>
  )
}
