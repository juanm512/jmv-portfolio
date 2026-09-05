import "@/styles/globals.css"
import localFont from "next/font/local"
import { GeistSans } from "geist/font/sans"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { SITE_URL, OG_LOCALE, localizedPath, pageAlternates } from "@/lib/metadata"

import Navbar from "@/components/layout/Navbar"
import Shortcuts from "@/components/layout/Shortcuts"
import CustomCursor from "@/components/layout/CustomCursor"
import TvMenu from "@/components/layout/TvMenu"
import { getAllProjects } from "@/lib/projects"

const kodeMono = localFont({
  src: "../../../styles/Kode_Mono/KodeMono-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-kode-mono"
})

const KEYWORDS = [
  "FullStack Developer",
  "Web Development",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "JavaScript",
  "Frontend",
  "Backend"
]

export async function generateMetadata({ params }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: "Meta" })
  const title = t("title")
  const description = t("description")

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s | Juan Manuel Vila" },
    description,
    keywords: KEYWORDS,
    authors: [{ name: "Juan Manuel Vila" }],
    creator: "Juan Manuel Vila",
    alternates: pageAlternates(locale, "/"),
    icons: { icon: [{ url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" }] },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url: localizedPath(locale, "/"),
      siteName: "Juan Manuel Vila",
      title,
      description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: t("ogAlt") }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const projects = getAllProjects(locale).map((p) => ({
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
    year: p.year,
    tier: p.tier,
    accentColor: p.accentColor
  }))

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${kodeMono.variable}`}
    >
      <body className="relative font-sans w-full min-h-screen p-0 m-0 overflow-x-hidden bg-background-dark text-ink">
        <NextIntlClientProvider>
          <CustomCursor />
          <Navbar />
          <Shortcuts />
          <TvMenu projects={projects} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
