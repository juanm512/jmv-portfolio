import { setRequestLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getProjectsByTier } from "@/lib/projects"
import { FeaturedProjectRow, SecondaryProjectRow } from "@/components/home/ProjectList"
import Arrow from "@/components/ui/Arrow"

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
      <section className="pt-14 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-2xl md:text-3xl font-semibold text-ink max-w-[30ch] leading-[1.3] text-balance">
          {t("hero.title")}
        </h1>
        <Link
          href="/about"
          className="group inline-flex items-center gap-1.5 mt-5 text-sm md:text-base text-ink-2 hover:text-green-glow transition-colors"
        >
          {t("cta.about")}
          <Arrow className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 motion-reduce:transform-none" />
        </Link>
      </section>

      <section aria-label={t("projects.title")} className="border-t border-line">
        {featured.map((project) => (
          <FeaturedProjectRow key={project.slug} project={project} />
        ))}
      </section>

      <section className="mt-20">
        <h2 className="text-sm text-ink-2 mb-2">{t("projects.other")}</h2>
        <div className="border-t border-line">
          {secondary.map((project) => (
            <SecondaryProjectRow key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <footer className="mt-auto pt-28 pb-10">
        <p className="font-mono text-xs text-ink-3 pt-6 border-t border-line">
          {t("footer.text", { year })}
        </p>
      </footer>
    </main>
  )
}
