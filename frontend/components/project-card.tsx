import type { ProjectSummary } from "@/lib/types"
import { PROJECT_TYPE_LABELS } from "@/lib/types"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  project: ProjectSummary
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const delay = index * 75

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 h-full"
      style={{ "--tw-animation-delay": `${delay}ms` } as React.CSSProperties}
    >
      <Link href={`/projects/${project.slug}`} className="h-full block">
        <Card className="hover:ring-foreground/20 transition-all duration-200 h-full cursor-pointer">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base leading-snug">{project.title}</CardTitle>
              <Badge variant="outline" className="shrink-0 text-xs">
                {PROJECT_TYPE_LABELS[project.project_type]}
              </Badge>
            </div>
            <CardDescription>{project.short_description}</CardDescription>
          </CardHeader>
          {(project.start_date || project.end_date) && (
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {project.start_date && new Date(project.start_date).getFullYear()}
                {project.start_date && project.end_date && " – "}
                {project.end_date && new Date(project.end_date).getFullYear()}
              </p>
            </CardContent>
          )}
        </Card>
      </Link>
    </div>
  )
}
