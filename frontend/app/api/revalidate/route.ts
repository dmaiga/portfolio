import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

// Revalidation à la demande, appelée par les signaux Django à chaque écriture
// de contenu. Purge tout l'arbre de routes (petit site) — simple et sûr.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ error: "Revalidation non configurée" }, { status: 500 })
  }

  let provided: string | null = null
  try {
    const body = (await request.json()) as { secret?: string }
    provided = body.secret ?? null
  } catch {
    provided = new URL(request.url).searchParams.get("secret")
  }

  if (provided !== secret) {
    return NextResponse.json({ error: "Secret invalide" }, { status: 401 })
  }

  revalidatePath("/", "layout")
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
