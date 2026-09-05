import { getProjectsByTier } from "@/lib/projects"

// Plain, serializable subset of the featured projects for the lab prototypes.
export function getLabProjects(locale) {
  return getProjectsByTier("featured", locale).map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    year: p.year,
    stack: p.stack || [],
    accent: p.accentColor || "#00FF9C",
    image: p.hero?.src || null,
  }))
}

export const LAB_VARIANTS = ["1", "2", "3"]

export function labStaticParams() {
  return LAB_VARIANTS.map((n) => ({ n }))
}
