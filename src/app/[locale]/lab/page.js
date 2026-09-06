import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import Arrow from "@/components/ui/Arrow"
import { VARIANTS } from "./variants"

export const metadata = { title: "Lab · portada inline", robots: { index: false } }

export default async function LabIndex({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <main className="min-h-screen px-6 max-w-7xl mx-auto pt-14 md:pt-20 pb-20">
      <h1 className="text-2xl md:text-3xl font-semibold text-ink max-w-[30ch] leading-[1.3]">
        Lab · portada inline en la fila
      </h1>
      <p className="mt-3 text-ink-2 max-w-[60ch]">
        Tres prototipos con la misma fila. Cambia una sola cosa: cómo entra la portada y qué hace el
        contenido. La altura de la fila nunca cambia; tecnologías quietas; sin globos ni popovers.
      </p>
      <div className="mt-10 border-t border-line">
        {Object.entries(VARIANTS).map(([n, v]) => (
          <Link
            key={n}
            href={`/lab/inline/${n}`}
            className="group grid grid-cols-[3.25rem_minmax(0,1fr)_auto] sm:grid-cols-[4rem_minmax(0,1fr)_auto] items-baseline gap-x-3 sm:gap-x-4 py-5 border-b border-line hover:border-line-strong transition-colors outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
          >
            <span className="font-mono text-xs text-ink-3 tabular-nums">0{n}</span>
            <span className="min-w-0">
              <span className="block text-lg font-semibold text-ink group-hover:text-green-glow transition-colors">
                {v.name}
              </span>
              <span className="block mt-1 text-sm text-ink-2 max-w-[60ch]">{v.diff}</span>
            </span>
            <span className="text-ink-3 group-hover:text-ink transition-[color,transform] duration-200 ease-out-expo group-hover:translate-x-0.5 motion-reduce:transform-none">
              <Arrow />
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
