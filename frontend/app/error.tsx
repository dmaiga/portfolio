"use client"

export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24 text-center space-y-6">
      <h1 className="text-2xl font-semibold">Service temporairement indisponible</h1>
      <p className="text-muted-foreground">
        Impossible de charger les données. Réessaie dans quelques instants.
      </p>
      <button
        onClick={unstable_retry}
        className="text-sm underline underline-offset-4 hover:text-foreground transition-colors"
      >
        Réessayer
      </button>
    </div>
  )
}
