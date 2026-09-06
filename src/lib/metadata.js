import { routing } from "@/i18n/routing"

export const SITE_URL = "https://jmvila.com"

// `path` is locale-less ("/", "/about", "/projects/tuerca").
export function localizedPath(locale, path = "/") {
  return path === "/" ? `/${locale}` : `/${locale}${path}`
}

// Canonical + hreflang set for one page; resolved against metadataBase.
export function pageAlternates(locale, path = "/") {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, path)])
  )
  languages["x-default"] = localizedPath(routing.defaultLocale, path)
  return {
    canonical: localizedPath(locale, path),
    languages
  }
}

export const OG_LOCALE = { es: "es_ES", en: "en_US" }
