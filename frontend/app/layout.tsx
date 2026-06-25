import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })

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
    <html lang="fr" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <SiteNav />

          <main className="flex-1">{children}</main>

          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
