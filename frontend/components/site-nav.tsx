"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-semibold text-sm text-foreground shrink-0 tracking-tight"
        >
          M. Maiga
        </Link>
        <div className="flex items-center gap-1 sm:gap-4">
          <div className="flex gap-3 sm:gap-6 text-sm">
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
        </div>
      </nav>
    </header>
  )
}
