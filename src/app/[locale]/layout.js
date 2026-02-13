import "@/styles/globals.css"
import localFont from "next/font/local"
import { GeistSans } from "geist/font/sans"
import { NextIntlClientProvider, useMessages } from "next-intl"

import Header from "@/components/layout/Header"
import SmoothScroll from "@/components/layout/SmoothScroll"
import CustomCursor from "@/components/layout/CustomCursor"
import FPSCounter from "@/components/layout/FPSCounter"

const kodeMono = localFont({
  src: "../../../styles/Kode_Mono/KodeMono-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-kode"
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

export default function LocaleLayout({ children, params: { locale } }) {
  const messages = useMessages()

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${kodeMono.variable}`}
    >
      <head>
        <link
          rel="icon"
          href="/Ai2.jpg"
          type="image/jpg"
          sizes="32x32"
        />
        <link rel="canonical" href={`https://jmvila.com/${locale}`} />
      </head>
      <body className="relative font-sans w-full min-h-screen p-0 m-0 overflow-x-hidden bg-background-dark text-white">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <FPSCounter />
            <CustomCursor />
            <Header lang={locale} />
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
