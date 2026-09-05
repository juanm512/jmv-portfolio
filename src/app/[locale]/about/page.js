import { setRequestLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import ContributionGraphSVG from "@/components/home/ContributionGraphSVG"

export async function generateMetadata() {
  const t = await getTranslations("About")
  return { title: t("title") }
}

export default async function AboutPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Home")
  const tAbout = await getTranslations("About")

  return (
    <main className="min-h-screen px-6 pb-24">
      <div className="max-w-[65ch] mx-auto">
        <Link
          href="/"
          className="inline-block text-sm text-white/60 hover:text-white transition-colors pt-12 pb-8"
        >
          ← {tAbout("back")}
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-14">
          {t("childhood.title")}
        </h1>

        <section className="mb-20">
          <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
            {t("childhood.subtitle")}
          </p>
          <div className="flex flex-col gap-6 text-white/70 leading-relaxed text-lg">
            <p>{t("childhood.text_1")}</p>
            <p>{t("childhood.text_2")}</p>
            <p>{t("childhood.text_3")}</p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            {t("abstract.title")}
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
            {t("abstract.subtitle")}
          </p>
          <div className="flex flex-col gap-6 text-white/70 leading-relaxed text-lg">
            <p>{t("abstract.text_1")}</p>
            <p>{t("abstract.text_2")}</p>
            <p>{t("abstract.text_3")}</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            {t("contributions.title")}
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
            {t("contributions.subtitle")}
          </p>
          <div className="flex flex-col gap-6 text-white/70 leading-relaxed text-lg">
            <p>{t("contributions.text_1")}</p>
            <p>{t("contributions.text_2")}</p>
          </div>
        </section>
      </div>

      <div className="max-w-4xl mx-auto">
        <ContributionGraphSVG />
      </div>
    </main>
  )
}
