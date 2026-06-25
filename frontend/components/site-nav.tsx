"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

// 4 entrées (DoD Étape 3) ; l'ordre suit le parcours de lecture du site.
const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Ferme le menu mobile à chaque changement de route (reset d'état pendant
  // le rendu via le pathname précédent, pattern React recommandé — pas d'effet).
  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    if (open) setOpen(false)
  }

  // Ferme sur clic en dehors du header et sur Escape.
  useEffect(() => {
    if (!open) return

    function onPointerDown(e: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm"
    >
      <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-semibold text-sm text-foreground shrink-0 tracking-tight"
        >
          M. Maiga
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          {/* Liens inline — desktop (md et plus) */}
          <div className="hidden md:flex gap-3 sm:gap-6 text-sm">
            {LINKS.map(({ href, label }) => {
              const active = isActive(pathname, href)
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "transition-colors duration-200",
                    active
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          <ThemeToggle />

          {/* Hamburger — mobile (sous md) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Panneau mobile */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-border bg-background animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col">
            {LINKS.map(({ href, label }) => {
              const active = isActive(pathname, href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "py-2.5 text-sm transition-colors duration-200",
                    active
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
