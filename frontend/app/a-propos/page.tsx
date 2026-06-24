import type { Metadata } from "next"
import type { Profile } from "@/lib/types"
import Image from "next/image"
import { DOMAINS } from "@/lib/domains"
import { Markdown } from "@/components/markdown"
import { mediaUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "À propos",
  description: "Parcours, positionnement et domaines d'intervention de Mahamane Daouda Maiga.",
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export default async function AProposPage() {
  const res = await fetch(`${API}/api/profile/`, { cache: "no-store" })
  if (!res.ok) throw new Error("Impossible de charger le profil")
  const profile: Profile = await res.json()

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500">

      {/* En-tête : positionnement */}
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        {profile.photo && (
          <Image
            src={mediaUrl(profile.photo, API)}
            alt={profile.full_name}
            width={120}
            height={120}
            className="rounded-2xl object-cover shrink-0 ring-2 ring-primary/20 shadow-sm"
          />
        )}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{profile.full_name}</h1>
          <p className="text-lg text-muted-foreground">{profile.title}</p>
        </div>
      </div>

      {/* Parcours détaillé */}
      {profile.about && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Parcours
          </h2>
          <Markdown className="text-sm text-muted-foreground">{profile.about}</Markdown>
        </section>
      )}

      {/* Domaines d'intervention */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Domaines d&apos;intervention
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {DOMAINS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-lg border px-4 py-3 bg-muted/40"
            >
              <Icon className="size-4 text-primary shrink-0" />
              <span className="text-xs font-medium leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
