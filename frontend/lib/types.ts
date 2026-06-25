export interface Profile {
  full_name: string
  title: string
  bio: string
  about: string
  photo: string
  email: string
  github_url: string
  linkedin_url: string
  cv: string
}

export interface Skill {
  id: number
  name: string
  category: string
  icon: string
}

export type ProjectType = "PROFESSIONAL" | "CONSULTING" | "ACADEMIC" | "PERSONAL"

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  PROFESSIONAL: "Expérience pro",
  CONSULTING: "Mission conseil",
  ACADEMIC: "Académique",
  PERSONAL: "Projet personnel",
}

// Catégories de la page Réalisations, dans l'ordre d'affichage.
// Titres alignés sur docs/05-archi-info.md.
export const PROJECT_CATEGORY_ORDER: { type: ProjectType; title: string }[] = [
  { type: "PROFESSIONAL", title: "Expériences professionnelles" },
  { type: "CONSULTING", title: "Consultations ponctuelles" },
  { type: "ACADEMIC", title: "Projets académiques" },
  { type: "PERSONAL", title: "Projets personnels" },
]

export interface ProjectSummary {
  id: number
  title: string
  slug: string
  summary: string
  cover_image: string
  featured: boolean
  project_type: ProjectType
  start_date: string | null
  end_date: string | null
  skills: Skill[]
}

export interface ProjectAsset {
  id: number
  title: string
  file: string
  asset_type: string
}

export interface ProjectDetail extends ProjectSummary {
  context: string
  role: string
  problem: string
  solution: string
  results: string
  deep_dive: string
  lessons_learned: string
  github_url: string
  demo_url: string
  skills: Skill[]
  assets: ProjectAsset[]
}
