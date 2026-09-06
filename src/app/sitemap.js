import { routing } from "@/i18n/routing"
import { getAllProjectSlugs } from "@/lib/projects"
import { SITE_URL, localizedPath } from "@/lib/metadata"

function entry(path, changeFrequency, priority) {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}${localizedPath(l, path)}`])
  )
  return routing.locales.map((locale) => ({
    url: `${SITE_URL}${localizedPath(locale, path)}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages }
  }))
}

export default function sitemap() {
  return [
    ...entry("/", "monthly", 1),
    ...entry("/about", "yearly", 0.7),
    ...getAllProjectSlugs().flatMap(({ slug }) => entry(`/projects/${slug}`, "yearly", 0.8))
  ]
}
