import Link from "next/link"

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24 text-center space-y-6">
      <p className="text-6xl font-bold text-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold">Page introuvable</h1>
      <p className="text-muted-foreground">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="inline-block text-sm underline underline-offset-4 hover:text-foreground transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
