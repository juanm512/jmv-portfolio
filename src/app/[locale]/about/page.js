import { setRequestLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { OG_LOCALE, localizedPath, pageAlternates } from "@/lib/metadata"
import Arrow from "@/components/ui/Arrow"
import ContactBlock from "@/components/home/ContactBlock"
import ProjectMention from "@/components/about/ProjectMention"
import { timeline } from "@/data/timeline"

// "[[slug]]" or "[[slug|label]]" -> ProjectMention. split() with a capture
// group leaves the matches at odd indexes.
function withMentions(text, locale) {
  return text.split(/\[\[([^\]]+)\]\]/).map((part, i) => {
    if (i % 2 === 0) return part
    const [slug, label] = part.split("|")
    return <ProjectMention key={i} slug={slug} label={label} locale={locale} />
  })
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "About" })
  return {
    title: t("title"),
    alternates: pageAlternates(locale, "/about"),
    openGraph: { url: localizedPath(locale, "/about"), locale: OG_LOCALE[locale] }
  }
}

export default async function AboutPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Home")
  const tAbout = await getTranslations("About")
  const year = new Date().getFullYear()

  const prose = "flex flex-col gap-5 max-w-[65ch] text-ink-2 text-[1.0625rem] md:text-lg leading-[1.7]"

  return (
    <main className="min-h-screen px-6 pb-10 flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 min-h-11 text-sm text-ink-2 hover:text-ink transition-colors mt-12 mb-10 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
        >
          <Arrow direction="left" className="transition-transform duration-200 ease-out-expo group-hover:-translate-x-0.5 motion-reduce:transform-none" />
          {tAbout("back")}
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold text-ink leading-[1.2] text-balance mb-12">
          {tAbout("title")}
        </h1>

        <ol className="mb-20">
          {timeline.map((e, i) => {
            const l = e.locales[locale] || e.locales.es
            return (
              <li key={i} className="relative border-l border-line pl-8 pb-14 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[6px] top-2.5 size-[11px] rounded-full border-2 bg-background-dark ${e.kind === "life" ? "border-ink-3" : "border-green-glow"}`}
                />
                <h2 className="text-xl md:text-2xl font-semibold text-ink leading-[1.25] text-balance">{l.title}</h2>
                {l.subtitle && <p className="mt-1 text-ink-3">{l.subtitle}</p>}
                <div className={`${prose} mt-4`}>
                  {l.text.split("\n\n").map((para, j) => <p key={j}>{withMentions(para, locale)}</p>)}
                </div>
              </li>
            )
          })}
        </ol>

      </div>

      <div className="max-w-7xl mx-auto w-full">
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
