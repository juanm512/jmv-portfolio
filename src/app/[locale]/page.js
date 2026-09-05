import { setRequestLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getProjectsByTier } from "@/lib/projects"
import { FeaturedProjectRow, SecondaryProjectRow } from "@/components/home/ProjectList"

export const metadata = {
  title: "Juan Manuel Vila - FullStack Developer",
  description:
    "Portfolio of Juan Manuel Vila - FullStack Developer specialized in building systems that solve real problems."
}

export default async function HomePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Home")

  const featured = getProjectsByTier("featured", locale)
  const secondary = getProjectsByTier("secondary", locale)
  const year = new Date().getFullYear()

  return (
    <main className="min-h-screen px-6 max-w-4xl mx-auto flex flex-col">
      <section className="pt-16 pb-10 md:pt-20 md:pb-14">
        <h1 className="text-2xl md:text-3xl font-semibold text-white/95 max-w-2xl leading-snug">
          {t("hero.title")}
        </h1>
        <Link
          href="/about"
          className="inline-block mt-4 text-sm md:text-base text-white/70 hover:text-green-glow transition-colors"
        >
          {t("cta.about")}
        </Link>
      </section>

      <section className="pb-16">
        <div className="flex flex-col divide-y divide-white/5">
          {featured.map((project) => (
            <FeaturedProjectRow key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="pb-24">
        <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">
          {t("projects.other")}
        </p>
        <div className="flex flex-col divide-y divide-white/5">
          {secondary.map((project) => (
            <SecondaryProjectRow key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <footer className="mt-auto py-8 border-t border-white/5">
        <p className="font-mono text-xs text-white/40">
          {t("footer.text", { year })}
        </p>
      </footer>
    </main>
  )
}
