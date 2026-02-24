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

export function getAllProjects(locale = "en") {
  return projects
    .map(p => getLocalizedProject(p, locale))
    .sort((a, b) => {
      const yearA = parseInt(a.year) || 0
      const yearB = parseInt(b.year) || 0
      return yearB - yearA
    })
}

export function getProjectBySlug(slug, locale = "en") {
  const project = projects.find((p) => p.slug === slug)
  return getLocalizedProject(project, locale)
}

export function getAllProjectSlugs() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function getAdjacentProjects(slug, locale = "en") {
  const idx = projects.findIndex((p) => p.slug === slug)
  if (idx === -1) return { next: null, prev: null }

  const nextIdx = (idx + 1) % projects.length
  const prevIdx = (idx - 1 + projects.length) % projects.length

  return {
    next: getLocalizedProject(projects[nextIdx], locale),
    prev: getLocalizedProject(projects[prevIdx], locale),
  }
}
