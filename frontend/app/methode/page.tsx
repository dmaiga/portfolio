import type { Metadata } from "next"
import { FileText, ExternalLink, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Méthode",
  description:
    "Comment ce portfolio et les projets présentés ont été conçus et réalisés : démarche, conventions, artefacts et rôle des agents IA.",
}

// Renseigner NEXT_PUBLIC_REPO_URL une fois le dépôt poussé sur GitHub
// (ex. https://github.com/dmaiga/portfolio). Tant qu'il est vide, les
// artefacts s'affichent en libellés simples — jamais de lien mort.
const REPO_URL = process.env.NEXT_PUBLIC_REPO_URL ?? ""

function repoLink(path: string, isDir = false): string | null {
  if (!REPO_URL) return null
  return `${REPO_URL}/${isDir ? "tree" : "blob"}/HEAD/${path}`
}

type Artifact = { label: string; path: string; isDir?: boolean }

// Les étapes de la démarche projet, chacune adossée à son artefact
const DEMARCHE: Artifact[] = [
  { label: "Vision", path: "docs/00-vision.md" },
  { label: "Analyse", path: "docs/01-stakeholders.md" },
  { label: "Objectifs", path: "docs/02-objectifs.md" },
  { label: "Personas", path: "docs/03-personas.md" },
  { label: "Architecture", path: "docs/05-archi-info.md" },
  { label: "Backlog", path: "docs/08-backlog.md" },
  { label: "Sprints", path: "docs/sprints", isDir: true },
  { label: "Livraison", path: "docs/backlog-dev.md" },
]

const CONVENTIONS: Artifact[] = [
  { label: "Posture & auteur (ABOUT-ME)", path: "rules/ABOUT-ME.md" },
  { label: "Convention de commits (GIT)", path: "rules/GIT.md" },
  { label: "Stack officielle (STACK)", path: "rules/STACK.md" },
]

const ARTEFACTS: Artifact[] = [
  { label: "Architecture technique", path: "docs/ARCHITECTURE.md" },
  { label: "Orchestration (CLAUDE.md)", path: "CLAUDE.md" },
  { label: "Décisions d'architecture (ADR)", path: "docs/DECISIONS.md" },
  { label: "Backlog & critères d'acceptation", path: "docs/08-backlog.md" },
  { label: "Sprints", path: "docs/sprints", isDir: true },
]

function ArtifactList({ items }: { items: Artifact[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const href = repoLink(item.path, item.isDir)
        return (
          <li key={item.path}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-foreground transition-colors duration-200"
              >
                <FileText className="size-3.5 text-muted-foreground shrink-0" />
                {item.label}
                <ExternalLink className="size-3 text-muted-foreground" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="size-3.5 shrink-0" />
                {item.label}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default function MethodePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500">

      {/* En-tête */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Méthode</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Comment ce portfolio et les projets présentés ont-ils été conçus et réalisés ? Cette
          page rend la démarche visible — pas seulement le résultat final.
        </p>
      </div>

      {/* La démarche projet */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          La démarche projet
        </h2>
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
          {DEMARCHE.map((step, i) => {
            const href = repoLink(step.path, step.isDir)
            return (
              <span key={step.path} className="inline-flex items-center gap-1.5">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border px-2.5 py-1 text-sm hover:bg-accent/40 transition-colors duration-200"
                  >
                    {step.label}
                  </a>
                ) : (
                  <span className="rounded-md border px-2.5 py-1 text-sm bg-muted/40">
                    {step.label}
                  </span>
                )}
                {i < DEMARCHE.length - 1 && (
                  <ArrowRight className="size-3.5 text-muted-foreground shrink-0" />
                )}
              </span>
            )
          })}
        </div>
      </section>

      {/* Conventions */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Conventions
        </h2>
        <ArtifactList items={CONVENTIONS} />
      </section>

      {/* Artefacts */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Artefacts
        </h2>
        <ArtifactList items={ARTEFACTS} />
      </section>

      {/* Rôle des agents IA */}
      <section className="space-y-3 border-l-2 border-primary/30 pl-4">
        <h2 className="text-base font-semibold">Le rôle des agents IA</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les agents IA sont utilisés comme outils de production, de revue et de réflexion. Ils
          participent à la génération de contenu technique mais ne remplacent ni les décisions
          produit, ni les choix d&apos;architecture, ni la validation finale. L&apos;objectif est de
          montrer leur usage concret dans le processus de travail, pas de proclamer leur présence.
        </p>
      </section>
    </div>
  )
}
