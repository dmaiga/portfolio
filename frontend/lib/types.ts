export interface Profile {
  full_name: string
  title: string
  bio: string
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

export interface ProjectSummary {
  id: number
  title: string
  slug: string
  short_description: string
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
  description: string
  role: string
  challenge: string
  solution: string
  results: string
  lessons_learned: string
  github_url: string
  demo_url: string
  skills: Skill[]
  assets: ProjectAsset[]
}
