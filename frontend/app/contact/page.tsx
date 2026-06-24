import type { Metadata } from "next"
import type { Profile } from "@/lib/types"
import { Mail, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mediaUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Contact",
  description: "Me contacter : email, CV, GitHub et LinkedIn.",
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export default async function ContactPage() {
  const res = await fetch(`${API}/api/profile/`, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error("Impossible de charger le profil")
  const profile: Profile = await res.json()

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Contact</h1>
        <p className="text-base text-muted-foreground">
          Une question, une mission, un échange entre pairs ? Voici comment me joindre.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {profile.email && (
          <a href={`mailto:${profile.email}`}>
            <Button size="sm">
              <Mail className="size-3.5 mr-1.5" />
              {profile.email}
            </Button>
          </a>
        )}
        {profile.cv && (
          <a href={mediaUrl(profile.cv, API)} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <Download className="size-3.5 mr-1.5" />
              Télécharger le CV
            </Button>
          </a>
        )}
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
    </div>
  )
}
