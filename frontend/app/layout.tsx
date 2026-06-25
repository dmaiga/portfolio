import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
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
                    Réalisations
                  </Link>
                  <Link href="/a-propos" className="hover:text-foreground transition-colors duration-200">
                    À propos
                  </Link>
                  <Link href="/contact" className="hover:text-foreground transition-colors duration-200">
                    Contact
                  </Link>
                </div>
                <ThemeToggle />
              </div>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
