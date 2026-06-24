import type { Profile } from "@/lib/types"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

// Profil pour le footer. Tolérant aux pannes : si l'API est indisponible,
// on dégrade au lieu de casser le chrome présent sur toutes les pages.
async function getProfile(): Promise<Profile | null> {
  try {
    const res = await fetch(`${API}/api/profile/`, { cache: "no-store" })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

const linkClass = "hover:text-foreground transition-colors duration-200"

export async function SiteFooter() {
  const profile = await getProfile()

  return (
    <footer className="border-t">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} {profile?.full_name ?? "Mahamane Daouda Maiga"}</span>
        <div className="flex gap-6">
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className={linkClass}>
              Email
            </a>
          )}
          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
          )}
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
