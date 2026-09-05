"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { useLanguageToggle } from "@/lib/useLanguageToggle"
import { openTvMenu } from "@/lib/tvMenuStore"
import Kbd from "@/components/ui/Kbd"

function LangIcon() {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h7" />
      <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
      <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
      <path d="M12 20l4 -9l4 9" />
      <path d="M19.1 18h-6.2" />
    </svg>
  )
}

const navButton =
  "flex items-center gap-2 h-9 min-h-11 md:min-h-9 px-2 -mx-1 rounded-sm text-sm text-ink-2 hover:text-ink transition-colors outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"

export default function Navbar() {
  const t = useTranslations("Menu")
  const tLocales = useTranslations("Locales")
  const { nextLocale, toggleLanguage } = useLanguageToggle()

  return (
    <header className="relative z-40">
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between border-b border-line">
        <Link
          href="/"
          className="inline-flex items-center min-h-11 font-kode text-sm sm:text-base text-ink hover:text-green-glow transition-colors tracking-tight rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
        >
          Juan Manuel Vila
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <span className="flex items-center gap-1.5">
            <button type="button" onClick={(e) => openTvMenu(e.currentTarget)} className={navButton}>
              {t("button")}
              <Kbd className="hidden md:inline-flex">{t("buttonHint")}</Kbd>
            </button>
            {/* "?" opens the shortcuts help; the cap makes the key visible. */}
            <span className="hidden md:inline-flex items-center" title={t("helpHint")}>
              <Kbd>?</Kbd>
              <span className="sr-only">{t("helpHint")}</span>
            </span>
          </span>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t("switchLanguage", { locale: tLocales(nextLocale) })}
            className={navButton}
          >
            <LangIcon />
            <span className="hidden sm:inline uppercase text-xs font-mono">{nextLocale}</span>
            <Kbd className="hidden md:inline-flex">L</Kbd>
          </button>
        </div>
      </nav>
    </header>
  )
}
