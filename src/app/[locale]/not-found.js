import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import Arrow from "@/components/ui/Arrow"

// Rendered inside the locale layout (navbar, shortcuts, menu) when a page
// calls notFound(), e.g. /es/projects/nope.
export default async function NotFound() {
  const t = await getTranslations("NotFound")
  return (
    <main className="min-h-[calc(100vh-3.5rem)] px-6 max-w-4xl mx-auto flex flex-col justify-center py-20">
      <p className="font-mono text-sm text-green-glow mb-4">{t("code")}</p>
      <h1 className="text-2xl md:text-3xl font-semibold text-ink leading-[1.25] mb-3">{t("title")}</h1>
      <p className="text-ink-2 max-w-[48ch] leading-[1.6] mb-8">{t("text")}</p>
      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 min-h-11 self-start text-sm text-ink-2 hover:text-ink transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
      >
        <Arrow direction="left" className="transition-transform duration-200 ease-out-expo group-hover:-translate-x-0.5 motion-reduce:transform-none" />
        {t("back")}
      </Link>
    </main>
  )
}
