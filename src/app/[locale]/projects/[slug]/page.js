import { notFound } from "next/navigation"
import { unstable_setRequestLocale } from "next-intl/server"
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects"
import ProjectPage from "@/components/projects/ProjectPage"

// Generate static params for all projects
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

// Generate metadata for each project
export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug)

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

export default function Project({ params }) {
  unstable_setRequestLocale(params.locale)
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectPage project={project} locale={params.locale} />
}
