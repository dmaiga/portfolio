import type { Metadata } from "next"
import type { Profile } from "@/lib/types"
import { Mail, Download, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mediaUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Contact",
  description: "Me contacter : email, LinkedIn, GitHub et CV.",
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

const displayUrl = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

type Channel = { label: string; value: string; href: string; external?: boolean }

export default async function ContactPage() {
  const res = await fetch(`${API}/api/profile/`, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error("Impossible de charger le profil")
  const profile: Profile = await res.json()

  const channels: Channel[] = []
  if (profile.email) channels.push({ label: "Email", value: profile.email, href: `mailto:${profile.email}` })
  if (profile.linkedin_url)
    channels.push({ label: "LinkedIn", value: displayUrl(profile.linkedin_url), href: profile.linkedin_url, external: true })
  if (profile.github_url)
    channels.push({ label: "GitHub", value: displayUrl(profile.github_url), href: profile.github_url, external: true })

  return (
    <div className="max-w-lg mx-auto px-4 py-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Contact</h1>
        <p className="text-base text-muted-foreground">
          Une mission, une question, un échange entre pairs ? Écrivez-moi directement — je réponds.
        </p>
      </div>

      {/* Canaux de contact */}
      {channels.length > 0 && (
        <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center justify-between gap-4 px-4 py-3.5 hover:bg-muted transition-colors duration-200"
            >
              <span className="flex items-center gap-2.5 text-sm font-medium">
                {c.label === "Email" && <Mail className="size-4 text-muted-foreground" />}
                {c.label}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground truncate">
                <span className="truncate">{c.value}</span>
                {c.external && (
                  <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                )}
              </span>
            </a>
          ))}
        </div>
      )}

      {/* CV — toujours accessible depuis Contact et À propos */}
      {profile.cv && (
        <div className="border-t pt-6">
          <a href={mediaUrl(profile.cv, API)} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <Download className="size-3.5 mr-1.5" />
              Télécharger le CV
            </Button>
          </a>
        </div>
      )}
    </div>
  )
}
