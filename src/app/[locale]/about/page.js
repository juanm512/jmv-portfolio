import { setRequestLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import ContributionGraphSVG from "@/components/home/ContributionGraphSVG"
import Arrow from "@/components/ui/Arrow"
import ContactBlock from "@/components/home/ContactBlock"

export async function generateMetadata() {
  const t = await getTranslations("About")
  return { title: t("title") }
}

export default async function AboutPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Home")
  const tAbout = await getTranslations("About")
  const year = new Date().getFullYear()

  const prose = "flex flex-col gap-5 text-ink-2 text-[1.0625rem] md:text-lg leading-[1.7]"

  return (
    <main className="min-h-screen px-6 pb-10 flex flex-col">
      <div className="max-w-[65ch] mx-auto">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 min-h-11 text-sm text-ink-2 hover:text-ink transition-colors mt-12 mb-10 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
        >
          <Arrow direction="left" className="transition-transform duration-200 ease-out-expo group-hover:-translate-x-0.5 motion-reduce:transform-none" />
          {tAbout("back")}
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold text-ink leading-[1.2] text-balance mb-8">
          {t("childhood.title")}
        </h1>

        <section className={`${prose} mb-20`}>
          <p>{t("childhood.text_1")}</p>
          <p>{t("childhood.text_2")}</p>
          <p>{t("childhood.text_3")}</p>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-ink leading-[1.25] text-balance mb-6">
            {t("abstract.title")}
          </h2>
          <div className={prose}>
            <p>{t("abstract.text_1")}</p>
            <p>{t("abstract.text_2")}</p>
            <p>{t("abstract.text_3")}</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-ink leading-[1.25] text-balance mb-6">
            {t("contributions.title")}
          </h2>
          <div className={prose}>
            <p>{t("contributions.text_1")}</p>
            <p>{t("contributions.text_2")}</p>
          </div>
        </section>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <ContributionGraphSVG locale={locale} />
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <ContactBlock className="mt-20" />
        <footer className="mt-auto pt-28">
          <p className="font-mono text-xs text-ink-3 pt-6 border-t border-line">
            {t("footer.text", { year })}
          </p>
        </footer>
      </div>
    </main>
  )
}
