"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Arrow from "@/components/ui/Arrow"
import { routing } from "@/i18n/routing"
import es from "../../../messages/es.json"
import en from "../../../messages/en.json"

const MESSAGES = { es, en }

// Outside the locale layout there is no next-intl provider, so the locale is
// read from the URL and the strings come straight from the message files.
export default function RootNotFound() {
  const pathname = usePathname() || "/"
  const first = pathname.split("/")[1]
  const locale = routing.locales.includes(first) ? first : routing.defaultLocale
  const t = MESSAGES[locale].NotFound

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <main className="min-h-screen px-6 max-w-4xl mx-auto flex flex-col justify-center py-20">
      <p className="font-mono text-sm text-green-glow mb-4">{t.code}</p>
      <h1 className="text-2xl md:text-3xl font-semibold text-ink leading-[1.25] mb-3">{t.title}</h1>
      <p className="text-ink-2 max-w-[48ch] leading-[1.6] mb-8">{t.text}</p>
      <a
        href={`/${locale}`}
        className="group inline-flex items-center gap-1.5 min-h-11 self-start text-sm text-ink-2 hover:text-ink transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
      >
        <Arrow direction="left" className="transition-transform duration-200 ease-out-expo group-hover:-translate-x-0.5 motion-reduce:transform-none" />
        {t.back}
      </a>
    </main>
  )
}
