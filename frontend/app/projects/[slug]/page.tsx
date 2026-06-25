import type { Metadata } from "next"
import type { ProjectDetail, ProjectSummary } from "@/lib/types"
import { PROJECT_TYPE_LABELS } from "@/lib/types"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Markdown } from "@/components/markdown"
import { mediaUrl } from "@/lib/utils"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

const ASSET_TYPE_LABELS: Record<string, string> = {
  IMAGE: "Image",
  DOCUMENT: "Document",
  TDR: "TDR",
  CAHIER_CHARGE: "Cahier des charges",
  ARCHITECTURE: "Architecture",
  OTHER: "Autre",
}

// On affiche inline tout asset dont le FICHIER est une image (schéma
// d'architecture, capture…), quel que soit son asset_type ; le reste
// (PDF, doc) part en lien document.
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|avif)$/i
const isImageFile = (path: string) => IMAGE_EXT.test(path.split("?")[0])

async function fetchProject(slug: string): Promise<ProjectDetail | null> {
  const res = await fetch(`${API}/api/projects/${slug}/`, { next: { revalidate: 3600 } })
  if (res.status === 404) return null
  if (!res.ok) throw new Error("Impossible de charger le projet")
  return res.json()
}

async function fetchProjects(): Promise<ProjectSummary[]> {
  try {
    const res = await fetch(`${API}/api/projects/`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

// Prérend les pages projet connues au build ; les nouveaux slugs sont
// rendus à la demande puis mis en cache (ISR).
export async function generateStaticParams() {
  const projects = await fetchProjects()
  return projects.map((p) => ({ slug: p.slug }))
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
      return { title: project.title, description: project.summary }
    }
  } catch {}
  return {}
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [project, allProjects] = await Promise.all([fetchProject(slug), fetchProjects()])

  if (!project) notFound()

  // Voisins pour la navigation entre projets (ordre de la liste = -start_date).
  const idx = allProjects.findIndex((p) => p.slug === slug)
  const prev = idx > 0 ? allProjects[idx - 1] : null
  const next = idx >= 0 && idx < allProjects.length - 1 ? allProjects[idx + 1] : null

  const imageAssets = project.assets.filter((a) => isImageFile(a.file))
  const docAssets = project.assets.filter((a) => !isImageFile(a.file))

  const hasDeepContent =
    !!project.deep_dive ||
    !!project.lessons_learned ||
    imageAssets.length > 0 ||
    docAssets.length > 0

  // Ancres « Sur cette page » — uniquement les sections réellement présentes.
  const sections = [
    { id: "resume", label: "Résumé", show: !!project.summary },
    { id: "contexte", label: "Contexte", show: !!project.context },
    { id: "probleme", label: "Problème", show: !!project.problem },
    { id: "solution", label: "Solution", show: !!project.solution },
    { id: "resultats", label: "Résultats", show: !!project.results },
    { id: "technologies", label: "Technologies", show: project.skills.length > 0 },
    { id: "approfondir", label: "Approfondir", show: hasDeepContent },
  ].filter((s) => s.show)

  const Links = (
    <div className="flex flex-wrap gap-2">
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
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Navigation retour */}
      <Link
        href="/projects"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        ← Toutes les réalisations
      </Link>

      <div className="mt-8 grid lg:grid-cols-4 gap-8 lg:gap-10">
        {/* ── Colonne gauche : ancre sticky ──────────────────────── */}
        <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-20 lg:self-start space-y-6">
          <nav>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Sur cette page
            </p>
            <div className="space-y-0.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block border-l-2 border-border pl-3 py-1 text-sm text-muted-foreground hover:border-brand hover:text-foreground transition-colors duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
          {(project.github_url || project.demo_url) && Links}
        </aside>

        {/* ── Colonne droite : contenu ───────────────────────────── */}
        <article className="lg:col-span-3 space-y-10 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500">

          {/* En-tête */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="outline">{PROJECT_TYPE_LABELS[project.project_type]}</Badge>
              {project.start_date && (
                <span>
                  {new Date(project.start_date).getFullYear()}
                  {project.end_date && ` – ${new Date(project.end_date).getFullYear()}`}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              {project.title}
            </h1>
            {project.role && (
              <p className="text-sm text-muted-foreground">
                Rôle : <strong className="text-foreground font-medium">{project.role}</strong>
              </p>
            )}
            {/* Liens en repli sur mobile (l'ancre gauche est masquée < lg) */}
            {(project.github_url || project.demo_url) && (
              <div className="pt-1 lg:hidden">{Links}</div>
            )}
          </div>

          {/* Résumé */}
          {project.summary && (
            <section id="resume" className="scroll-mt-24 space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Résumé
              </h2>
              <p className="text-base text-muted-foreground">{project.summary}</p>
            </section>
          )}

          {/* Cover image */}
          {project.cover_image && (
            <div className="rounded-xl overflow-hidden border aspect-video relative">
              <Image
                src={mediaUrl(project.cover_image, API)}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
            </div>
          )}

          {/* Contexte */}
          {project.context && (
            <section id="contexte" className="scroll-mt-24 space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Contexte
              </h2>
              <Markdown className="text-sm">{project.context}</Markdown>
            </section>
          )}

          {/* Problème */}
          {project.problem && (
            <section id="probleme" className="scroll-mt-24 space-y-3 border-l-2 border-brand/30 pl-4">
              <h2 className="text-base font-semibold">Problème à résoudre</h2>
              <Markdown className="text-sm text-muted-foreground">{project.problem}</Markdown>
            </section>
          )}

          {/* Solution */}
          {project.solution && (
            <section id="solution" className="scroll-mt-24 space-y-3 border-l-2 border-brand/30 pl-4">
              <h2 className="text-base font-semibold">Approche et solution</h2>
              <Markdown className="text-sm text-muted-foreground">{project.solution}</Markdown>
            </section>
          )}

          {/* Résultats */}
          {project.results && (
            <section id="resultats" className="scroll-mt-24 space-y-3 border-l-2 border-brand/30 pl-4">
              <h2 className="text-base font-semibold">Résultats</h2>
              <Markdown className="text-sm text-muted-foreground">{project.results}</Markdown>
            </section>
          )}

          {/* Technologies */}
          {project.skills.length > 0 && (
            <section id="technologies" className="scroll-mt-24 space-y-3">
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

          {/* ── Bifurcation Approfondir ── */}
          {hasDeepContent && (
            <div id="approfondir" className="scroll-mt-24 pt-4">
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Approfondir
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Détails techniques, schémas et artefacts
              </p>
            </div>
          )}

          {/* Approfondissement (texte libre Markdown) */}
          {project.deep_dive && (
            <section className="space-y-3 border-l-2 border-brand/30 pl-4">
              <h2 className="text-base font-semibold">Approfondissement</h2>
              <Markdown className="text-sm text-muted-foreground">{project.deep_dive}</Markdown>
            </section>
          )}

          {/* Schémas & galerie (assets image, affichés inline) */}
          {imageAssets.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Schémas & galerie
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {imageAssets.map((asset) => (
                  <figure key={asset.id} className="space-y-1.5">
                    <a
                      href={mediaUrl(asset.file, API)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg overflow-hidden border bg-surface aspect-video relative hover:opacity-90 transition-opacity duration-200"
                    >
                      <Image
                        src={mediaUrl(asset.file, API)}
                        alt={asset.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 350px"
                        className="object-contain"
                      />
                    </a>
                    <figcaption className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded border border-border px-1.5 py-0.5">
                        {ASSET_TYPE_LABELS[asset.asset_type] ?? asset.asset_type}
                      </span>
                      <span>{asset.title}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Documents & ressources */}
          {docAssets.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Documents & ressources
              </h2>
              <ul className="space-y-2">
                {docAssets.map((asset) => (
                  <li key={asset.id}>
                    <a
                      href={mediaUrl(asset.file, API)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-foreground transition-colors duration-200"
                    >
                      <FileText className="size-3.5 text-muted-foreground shrink-0" />
                      {asset.title}
                      <span className="no-underline text-xs text-muted-foreground">
                        ({ASSET_TYPE_LABELS[asset.asset_type] ?? asset.asset_type})
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Leçons apprises (rétrospective) */}
          {project.lessons_learned && (
            <section className="space-y-3 border-l-2 border-brand/30 pl-4">
              <h2 className="text-base font-semibold">Leçons apprises</h2>
              <Markdown className="text-sm text-muted-foreground">{project.lessons_learned}</Markdown>
            </section>
          )}

          {/* Navigation entre projets */}
          {(prev || next) && (
            <nav className="flex justify-between gap-4 border-t pt-6 text-sm">
              {prev ? (
                <Link
                  href={`/projects/${prev.slug}`}
                  className="group max-w-[45%] text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span className="block text-xs">← Précédent</span>
                  <span className="block font-medium truncate">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/projects/${next.slug}`}
                  className="group max-w-[45%] text-right text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span className="block text-xs">Suivant →</span>
                  <span className="block font-medium truncate">{next.title}</span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </article>
      </div>
    </div>
  )
}
