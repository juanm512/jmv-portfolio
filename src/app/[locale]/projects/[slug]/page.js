import { notFound } from "next/navigation"
import { unstable_setRequestLocale } from "next-intl/server"
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects"
import ProjectPage from "@/components/projects/ProjectPage"

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  const locales = ["es", "en"]

  const params = []
  for (const locale of locales) {
    for (const { slug } of slugs) {
      params.push({ locale, slug })
    }
  }
  return params
}

export async function generateMetadata({ params: { slug, locale } }) {
  const project = getProjectBySlug(slug, locale)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | Juan Manuel Vila`,
    description: project.description,
  }
}

export default function Project({ params: { slug, locale } }) {
  unstable_setRequestLocale(locale)
  const project = getProjectBySlug(slug, locale)

  if (!project) {
    notFound()
  }

  return <ProjectPage project={project} />
}
