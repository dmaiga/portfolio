import type { MetadataRoute } from "next"

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mdmaiga.dev"
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/methode`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ]

  try {
    const res = await fetch(`${API}/api/projects/`, { next: { revalidate: 3600 } })
    if (res.ok) {
      const projects: { slug: string }[] = await res.json()
      return [
        ...base,
        ...projects.map((p) => ({
          url: `${SITE}/projects/${p.slug}`,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
      ]
    }
  } catch {
    // API indisponible au moment du build — on retourne le sitemap de base
  }

  return base
}
