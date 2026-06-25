"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  // Les icônes sont pilotées par CSS via la classe `.dark` (posée par
  // next-themes avant l'hydratation) : pas besoin d'état `mounted`.
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Basculer le thème"
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
