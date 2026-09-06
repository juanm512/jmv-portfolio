import { projects } from "@/data/projects"

// Helper to merge common data with locale-specific data
function getLocalizedProject(project, locale = "en") {
  if (!project) return null
  
  const localeData = project.locales[locale] || project.locales["en"]
  
  return {
    ...project,
    ...localeData,
    locales: undefined // Remove the raw locales object from the result
  }
}

// Home order: featured tier first, then secondary, each by year desc.
const TIER_RANK = { featured: 0, secondary: 1 }

export function getAllProjects(locale = "en") {
  return projects
    .map(p => getLocalizedProject(p, locale))
    .sort((a, b) => {
      const tierDiff = (TIER_RANK[a.tier] ?? 9) - (TIER_RANK[b.tier] ?? 9)
      if (tierDiff !== 0) return tierDiff
      const yearA = parseInt(a.year) || 0
      const yearB = parseInt(b.year) || 0
      return yearB - yearA
    })
}

export function getProjectsByTier(tier, locale = "en") {
  return getAllProjects(locale).filter((p) => p.tier === tier)
}

export function getProjectBySlug(slug, locale = "en") {
  const project = projects.find((p) => p.slug === slug)
  return getLocalizedProject(project, locale)
}

export function getAllProjectSlugs() {
  return projects.map((p) => ({ slug: p.slug }))
}

// Prev/next follow the same order the home list uses (see getAllProjects).
export function getAdjacentProjects(slug, locale = "en") {
  const ordered = getAllProjects(locale)
  const idx = ordered.findIndex((p) => p.slug === slug)
  if (idx === -1) return { next: null, prev: null }

  const nextIdx = (idx + 1) % ordered.length
  const prevIdx = (idx - 1 + ordered.length) % ordered.length

  return {
    next: ordered[nextIdx],
    prev: ordered[prevIdx],
  }
}
