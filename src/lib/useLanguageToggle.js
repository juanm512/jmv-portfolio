"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"

// Shared logic for switching between es/en while keeping the current path.
export function useLanguageToggle() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const nextLocale = locale === "es" ? "en" : "es"

  const toggleLanguage = () => {
    router.replace(pathname, { locale: nextLocale })
  }

  return { locale, nextLocale, toggleLanguage }
}
