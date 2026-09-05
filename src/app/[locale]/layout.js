import "@/styles/globals.css"
import localFont from "next/font/local"
import { GeistSans } from "geist/font/sans"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"

import Header from "@/components/layout/Header"
import CustomCursor from "@/components/layout/CustomCursor"

const kodeMono = localFont({
  src: "../../../styles/Kode_Mono/KodeMono-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-kode-mono"
})

export const metadata = {
  metadataBase: new URL("https://jmvila.com"),
  title: {
    default: "Juan Manuel Vila - FullStack Developer",
    template: "%s | Juan Manuel Vila"
  },
  description:
    "Portfolio of Juan Manuel Vila - FullStack Developer specialized in building systems that solve real problems.",
  keywords: [
    "FullStack Developer",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "Frontend",
    "Backend"
  ],
  authors: [{ name: "Juan Manuel Vila" }],
  creator: "Juan Manuel Vila",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://jmvila.com",
    siteName: "Juan Manuel Vila Portfolio",
    title: "Juan Manuel Vila - FullStack Developer",
    description:
      "Portfolio of Juan Manuel Vila - FullStack Developer specialized in building systems that solve real problems.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Juan Manuel Vila Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Manuel Vila - FullStack Developer",
    description:
      "Portfolio of Juan Manuel Vila - FullStack Developer specialized in building systems that solve real problems.",
    images: ["/og-image.jpg"]
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${kodeMono.variable}`}
    >
      <head>
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link rel="canonical" href={`https://jmvila.com/${locale}`} />
      </head>
      <body className="relative font-sans w-full min-h-screen p-0 m-0 overflow-x-hidden bg-background-dark text-white">
        <NextIntlClientProvider>
          <CustomCursor />
          <Header lang={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
