import { getLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import NavButtons from "@/components/layout/NavButtons"

// Server component: static markup, the two buttons are the client island.
export default async function Navbar() {
  const locale = await getLocale()
  const t = await getTranslations("Menu")
  const tLocales = await getTranslations("Locales")
  const nextLocale = locale === "es" ? "en" : "es"

  return (
    <header className="relative z-40">
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between border-b border-line">
        <Link
          href="/"
          className="inline-flex items-center min-h-11 font-kode text-sm sm:text-base text-ink hover:text-green-glow transition-colors tracking-tight rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
        >
          Juan Manuel Vila
        </Link>

        <NavButtons
          menuLabel={t("button")}
          menuHint={t("buttonHint")}
          switchLabel={t("switchLanguage", { locale: tLocales(nextLocale) })}
        />
      </nav>
    </header>
  )
}
