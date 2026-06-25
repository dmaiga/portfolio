import type { Profile, ProjectSummary } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { Markdown } from "@/components/markdown"
import { mediaUrl } from "@/lib/utils"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

// Dépôt du portfolio (specs + code). Vide tant qu'il n'est pas poussé :
// le lien repo ne s'affiche alors pas — jamais de lien mort.
const REPO_URL = process.env.NEXT_PUBLIC_REPO_URL ?? ""

export default async function HomePage() {
  const [profileRes, projectsRes] = await Promise.all([
    fetch(`${API}/api/profile/`, { next: { revalidate: 3600 } }),
    fetch(`${API}/api/projects/`, { next: { revalidate: 3600 } }),
  ])

  if (!profileRes.ok || !projectsRes.ok) {
    throw new Error("Erreur lors du chargement des données")
  }

  const profile: Profile = await profileRes.json()
  const projects: ProjectSummary[] = await projectsRes.json()
  const featured = projects.filter((p) => p.featured)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-10 md:gap-12 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500">

        {/* ── Colonne gauche : identité + démarche (sticky) ────────── */}
        <aside className="md:col-span-1 space-y-6 md:sticky md:top-20 md:self-start">

          {/* Identité */}
          <div className="space-y-4">
            {profile.photo && (
              <Image
                src={mediaUrl(profile.photo, API)}
                alt={profile.full_name}
                width={96}
                height={96}
                className="rounded-2xl object-cover ring-2 ring-brand/20 shadow-sm"
                preload
              />
            )}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">{profile.full_name}</h1>
              <p className="text-muted-foreground">{profile.title}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              Bamako, Mali
            </span>
            <Markdown className="text-sm text-muted-foreground">{profile.bio}</Markdown>
          </div>

          {/* Démarche — courte, pointe vers le détail et le dépôt */}
          <div className="space-y-2 border-t pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Démarche
            </h2>
            <p className="text-sm text-muted-foreground">
              Owner avant Dev : intentions, décisions et specs versionnées dans le
              dépôt — avant la moindre ligne de code.
            </p>
            <div className="flex flex-col gap-1.5 pt-1 text-sm">
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-1.5 text-brand hover:underline underline-offset-4"
              >
                Voir ma démarche
                <ArrowRight className="size-3.5" />
              </Link>
              {REPO_URL && (
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Code &amp; specs sur GitHub
                  <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          </div>

          {/* Liens */}
          {(profile.github_url || profile.linkedin_url) && (
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
          )}
        </aside>

        {/* ── Colonne droite : projets mis en avant ────────────────── */}
        <section className="md:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Réalisations récentes
            </h2>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Voir tout →
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="space-y-4">
              {featured.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Les réalisations mises en avant arrivent bientôt.
            </p>
          )}

          <Link
            href="/projects"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
          >
            Voir toutes les réalisations
            <ArrowRight className="size-3.5" />
          </Link>
        </section>
      </div>
    </div>
  )
}
