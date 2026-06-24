import type { Metadata } from "next"
import type { ProjectDetail } from "@/lib/types"
import { PROJECT_TYPE_LABELS } from "@/lib/types"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Star, ExternalLink, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Markdown } from "@/components/markdown"
import { mediaUrl } from "@/lib/utils"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

async function fetchProject(slug: string): Promise<ProjectDetail | null> {
  const res = await fetch(`${API}/api/projects/${slug}/`, { cache: "no-store" })
  if (res.status === 404) return null
  if (!res.ok) throw new Error("Impossible de charger le projet")
  return res.json()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const project = await fetchProject(slug)
    if (project) {
      return {
        title: project.title,
        description: project.short_description,
      }
    }
  } catch {}
  return {}
}

const ASSET_ICONS: Record<string, typeof FileText> = {
  DOCUMENT: FileText,
  TDR: FileText,
  CAHIER_CHARGE: FileText,
  ARCHITECTURE: FileText,
  OTHER: FileText,
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await fetchProject(slug)

  if (!project) notFound()

  const imageAssets = project.assets.filter((a) => a.asset_type === "IMAGE")
  const docAssets = project.assets.filter((a) => a.asset_type !== "IMAGE")

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500">

      {/* Navigation retour */}
      <Link
        href="/projects"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        ← Tous les projets
      </Link>

      {/* Cover image */}
      {project.cover_image && (
        <div className="rounded-xl overflow-hidden border aspect-video relative">
          <Image
            src={mediaUrl(project.cover_image, API)}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      {/* En-tête */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight flex items-center gap-2">
            {project.title}
            {project.featured && (
              <Star className="size-5 fill-amber-400 text-amber-400 shrink-0" aria-label="Mis en avant" />
            )}
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
                <Button variant="outline" size="sm">
                  <ExternalLink className="size-3.5 mr-1.5" />
                  GitHub
                </Button>
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <ExternalLink className="size-3.5 mr-1.5" />
                  Démo
                </Button>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      {project.description && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Description
          </h2>
          <Markdown className="text-sm">{project.description}</Markdown>
        </section>
      )}

      {/* Challenge */}
      {project.challenge && (
        <section className="space-y-3 border-l-2 border-primary/30 pl-4">
          <h2 className="text-base font-semibold">Problème à résoudre</h2>
          <Markdown className="text-sm text-muted-foreground">{project.challenge}</Markdown>
        </section>
      )}

      {/* Solution */}
      {project.solution && (
        <section className="space-y-3 border-l-2 border-primary/30 pl-4">
          <h2 className="text-base font-semibold">Approche et solution</h2>
          <Markdown className="text-sm text-muted-foreground">{project.solution}</Markdown>
        </section>
      )}

      {/* Leçons apprises */}
      {project.lessons_learned && (
        <section className="space-y-3 border-l-2 border-primary/30 pl-4">
          <h2 className="text-base font-semibold">Leçons apprises</h2>
          <Markdown className="text-sm text-muted-foreground">{project.lessons_learned}</Markdown>
        </section>
      )}

      {/* Compétences */}
      {project.skills.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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

      {/* Galerie d'images */}
      {imageAssets.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Galerie
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {imageAssets.map((asset) => (
              <a
                key={asset.id}
                href={mediaUrl(asset.file, API)}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden border aspect-video relative hover:opacity-90 transition-opacity duration-200"
              >
                <Image
                  src={mediaUrl(asset.file, API)}
                  alt={asset.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 384px"
                  className="object-cover"
                />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Documents */}
      {docAssets.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Documents et ressources
          </h2>
          <ul className="space-y-2">
            {docAssets.map((asset) => {
              const Icon = ASSET_ICONS[asset.asset_type] ?? FileText
              return (
                <li key={asset.id}>
                  <a
                    href={mediaUrl(asset.file, API)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-foreground transition-colors duration-200"
                  >
                    <Icon className="size-3.5 text-muted-foreground shrink-0" />
                    {asset.title}
                    <span className="no-underline text-xs text-muted-foreground">({asset.asset_type})</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}
