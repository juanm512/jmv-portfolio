import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { getProjectBySlug, getAllProjectSlugs, getAdjacentProjects } from "@/lib/projects"
import ProjectPage from "@/components/projects/ProjectPage"

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()

  const params = []
  for (const locale of routing.locales) {
    for (const { slug } of slugs) {
      params.push({ locale, slug })
    }
  }
  return params
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params
  const project = getProjectBySlug(slug, locale)

  if (!project) {
    return {
      title: "Project Not Found"
    }
  }

  return {
    title: project.title,
    description: project.description
  }
}

export default async function Project({ params }) {
  const { slug, locale } = await params
  setRequestLocale(locale)
  const project = getProjectBySlug(slug, locale)

  if (!project) {
    notFound()
  }

  const { next: nextProject, prev: prevProject } = getAdjacentProjects(slug, locale)

  return (
    <ProjectPage
      project={project}
      nextProject={nextProject}
      prevProject={prevProject}
      locale={locale}
    />
  )
}
