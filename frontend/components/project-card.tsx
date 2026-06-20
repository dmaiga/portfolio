import type { ProjectSummary, ProjectType } from "@/lib/types"
import Link from "next/link"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: ProjectSummary
  index?: number
}

const TYPE_CONFIG: Record<ProjectType, { label: string; badge: string; border: string }> = {
  PROFESSIONAL: {
    label: "Expérience pro",
    badge: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/80 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-800/60",
    border: "border-l-blue-500",
  },
  CONSULTING: {
    label: "Mission conseil",
    badge: "bg-violet-50 text-violet-700 ring-1 ring-violet-200/80 dark:bg-violet-950/40 dark:text-violet-300 dark:ring-violet-800/60",
    border: "border-l-violet-500",
  },
  ACADEMIC: {
    label: "Académique",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-800/60",
    border: "border-l-amber-500",
  },
  PERSONAL: {
    label: "Projet personnel",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800/60",
    border: "border-l-emerald-500",
  },
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const config = TYPE_CONFIG[project.project_type]
  const visibleSkills = project.skills.slice(0, 3)
  const extraSkills = project.skills.length - 3

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 h-full"
      style={{ "--tw-animation-delay": `${index * 75}ms` } as React.CSSProperties}
    >
      <Link href={`/projects/${project.slug}`} className="h-full block group">
        <Card
          className={cn(
            "h-full transition-all duration-200 border-l-[3px]",
            "group-hover:shadow-md group-hover:-translate-y-0.5",
            config.border,
          )}
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-sm font-semibold leading-snug">
                {project.title}
              </CardTitle>
              <div className="flex items-center gap-1.5 shrink-0">
                {project.featured && (
                  <Star className="size-3.5 fill-amber-400 text-amber-400" aria-label="Mis en avant" />
                )}
                <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", config.badge)}>
                  {config.label}
                </span>
              </div>
            </div>
            <CardDescription className="text-xs mt-1 line-clamp-2">
              {project.short_description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1">
                {visibleSkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center rounded px-1.5 py-0.5 text-xs bg-muted text-muted-foreground"
                  >
                    {skill.name}
                  </span>
                ))}
                {extraSkills > 0 && (
                  <span className="text-xs text-muted-foreground self-center">+{extraSkills}</span>
                )}
              </div>
              {project.start_date && (
                <span className="text-xs text-muted-foreground shrink-0">
                  {new Date(project.start_date).getFullYear()}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
