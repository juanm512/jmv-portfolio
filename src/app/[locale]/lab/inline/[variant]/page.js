import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getProjectsByTier } from "@/lib/projects"
import { routing } from "@/i18n/routing"
import InlineList from "@/components/lab/InlineList"
import Arrow from "@/components/ui/Arrow"
import { VARIANTS } from "../../variants"

export const metadata = { robots: { index: false } }

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(VARIANTS).map((variant) => ({ locale, variant }))
  )
}

const link =
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark transition-colors"

export default async function LabInlinePage({ params }) {
  const { locale, variant } = await params
  setRequestLocale(locale)
  const v = VARIANTS[variant]
  if (!v) notFound()
  const featured = getProjectsByTier("featured", locale)

  return (
    <main className="min-h-screen px-6 max-w-7xl mx-auto pt-14 md:pt-20 pb-20">
      <Link href="/lab" className={`group inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink ${link}`}>
        <Arrow
          direction="left"
          className="transition-transform duration-200 ease-out-expo group-hover:-translate-x-0.5 motion-reduce:transform-none"
        />
        Lab
      </Link>
      <h1 className="mt-6 text-2xl md:text-3xl font-semibold text-ink leading-[1.3]">
        <span className="font-mono text-xs text-ink-3 tabular-nums mr-3">0{variant}</span>
        {v.name}
      </h1>
      <p className="mt-2 text-ink-2 text-sm max-w-[60ch]">{v.diff}</p>
      <nav className="mt-6 flex gap-x-4 font-mono text-xs text-ink-3">
        {Object.entries(VARIANTS).map(([n, o]) => (
          <Link
            key={n}
            href={`/lab/inline/${n}`}
            aria-current={n === variant ? "page" : undefined}
            className={`hover:text-ink aria-[current=page]:text-ink ${link}`}
          >
            0{n} {o.name}
          </Link>
        ))}
      </nav>
      <div className="mt-10">
        <InlineList projects={featured} label="Proyectos" variant={v.key} />
      </div>
    </main>
  )
}
