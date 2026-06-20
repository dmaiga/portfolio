import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// DRF sérialise les FileField/ImageField en URL absolues quand la requête est dans le contexte.
// Cette fonction gère les deux cas (URL absolue ou chemin relatif).
export function mediaUrl(path: string, api: string): string {
  if (!path) return ""
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return `${api}${path}`
}
