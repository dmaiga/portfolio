import { REVALIDATE } from "@/lib/config"

export interface GithubStats {
  username: string
  publicRepos: number
  followers: number
  memberSinceYear: number
  topLanguages: string[]
}

interface GithubRepo {
  language: string | null
  fork: boolean
}

// Best-effort : l'API GitHub non authentifiée est limitée à 60 req/h par IP.
// La revalidation ISR (1h, cf lib/config.ts) borne le nombre d'appels réels.
// En cas d'échec (rate limit, réseau), on retourne null — la section GitHub
// ne s'affiche simplement pas, jamais d'état d'erreur visible.
export async function fetchGithubStats(username: string): Promise<GithubStats | null> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { next: { revalidate: REVALIDATE } }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        next: { revalidate: REVALIDATE },
      }),
    ])

    if (!userRes.ok || !reposRes.ok) return null

    const user = await userRes.json()
    const repos: GithubRepo[] = await reposRes.json()

    const languageCounts = repos
      .filter((r) => !r.fork && r.language)
      .reduce<Record<string, number>>((acc, r) => {
        acc[r.language as string] = (acc[r.language as string] ?? 0) + 1
        return acc
      }, {})

    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([lang]) => lang)

    return {
      username,
      publicRepos: user.public_repos,
      followers: user.followers,
      memberSinceYear: new Date(user.created_at).getFullYear(),
      topLanguages,
    }
  } catch {
    return null
  }
}

// Extrait le login GitHub d'une URL de profil (https://github.com/dmaiga -> dmaiga).
export function githubUsername(githubUrl: string): string | null {
  try {
    const path = new URL(githubUrl).pathname.replace(/^\/|\/$/g, "")
    return path || null
  } catch {
    return null
  }
}
