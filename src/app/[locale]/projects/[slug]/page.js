import { notFound } from "next/navigation"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { OG_LOCALE, localizedPath, pageAlternates } from "@/lib/metadata"
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
    const t = await getTranslations({ locale, namespace: "Project" })
    return { title: t("projectNotFound"), robots: { index: false, follow: false } }
  }

  const path = `/projects/${slug}`
  const title = project.tagline ? `${project.title}: ${project.tagline}` : project.title
  return {
    title,
    description: project.description,
    alternates: pageAlternates(locale, path),
    openGraph: {
      url: localizedPath(locale, path),
      locale: OG_LOCALE[locale],
      title: `${title} | Juan Manuel Vila`,
      description: project.description
    }
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
