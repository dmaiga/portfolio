import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })

export const metadata: Metadata = {
  title: {
    template: "%s | Mahamane Daouda Maiga",
    default: "Mahamane Daouda Maiga — Portfolio",
  },
  description: "Data Engineer & Architecte Applicatif basé à Bamako, Mali. Spécialisé en ingénierie des données, BI et systèmes d'information.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Mahamane Daouda Maiga",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
            <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
              <Link href="/" className="font-semibold text-sm shrink-0">
                MDMaiga
              </Link>
              <div className="flex items-center gap-1 sm:gap-4">
                <div className="flex gap-3 sm:gap-6 text-sm text-muted-foreground">
                  <Link href="/" className="hover:text-foreground transition-colors duration-200">
                    Accueil
                  </Link>
                  <Link href="/projects" className="hover:text-foreground transition-colors duration-200">
                    Projets
                  </Link>
                </div>
                <ThemeToggle />
              </div>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t">
            <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <span>© 2026 Mahamane Daouda Maiga</span>
              <div className="flex gap-6">
                <a
                  href="mailto:mdmaiga01@gmail.com"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Email
                </a>
                <a
                  href="https://github.com/dmaiga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/mdmaiga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
