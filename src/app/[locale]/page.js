import { setRequestLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { OG_LOCALE, localizedPath, pageAlternates } from "@/lib/metadata"
import { getProjectsByTier } from "@/lib/projects"
import SecondaryProjectList from "@/components/home/SecondaryProjectList"
import FeaturedProjectList from "@/components/home/FeaturedProjectList"
import Arrow from "@/components/ui/Arrow"
import { ContactLinks } from "@/components/home/ContactBlock"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Meta" })
  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: pageAlternates(locale, "/"),
    openGraph: { url: localizedPath(locale, "/"), locale: OG_LOCALE[locale] }
  }
}

export default async function HomePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Home")
  const tProject = await getTranslations("Project")

  const featured = getProjectsByTier("featured", locale)
  const secondary = getProjectsByTier("secondary", locale)
  const year = new Date().getFullYear()

  return (
    <main className="min-h-screen px-6 max-w-7xl mx-auto flex flex-col">
      <section className="pt-14 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-2xl md:text-3xl font-semibold text-ink max-w-[30ch] leading-[1.3] text-balance">
          {t("hero.title")}
        </h1>
        <ContactLinks className="mt-5" />
        <Link
          href="/about"
          className="group inline-flex items-center gap-1.5 mt-4 min-h-11 md:min-h-9 -my-2 text-sm md:text-base text-ink-2 hover:text-green-glow transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
        >
          {t("cta.about")}
          <Arrow className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 motion-reduce:transform-none" />
        </Link>
      </section>

      <FeaturedProjectList projects={featured} label={t("projects.title")} stackLabel={tProject("stack")} />

      <section className="mt-20">
        <h2 className="text-sm text-ink-2 mb-2">{t("projects.other")}</h2>
        <SecondaryProjectList projects={secondary} />
      </section>

      <footer className="mt-auto pt-28 pb-10">
        <div className="pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-mono text-xs text-ink-3">{t("footer.text", { year })}</p>
          <ContactLinks className="text-xs" />
        </div>
      </footer>
    </main>
  )
}
