import Link from "next/link"
import { setRequestLocale } from "next-intl/server"
import { getAllProjects } from "@/lib/projects"

export const metadata = {
  title: "Juan Manuel Vila - FullStack Developer",
  description:
    "Portfolio of Juan Manuel Vila - FullStack Developer specialized in building systems that solve real problems."
}

export default async function HomePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const projects = getAllProjects(locale)

  return (
    <main className="min-h-screen px-6 py-24">
      <h1 className="text-4xl font-bold">Juan Manuel Vila</h1>
      <ul className="mt-8 flex flex-col gap-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/${locale}/projects/${project.slug}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
