import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getLabProjects, LAB_VARIANTS, labStaticParams } from "@/components/lab/labData"
import BgSqLab from "@/components/lab/beam/BgSqLab"

export const metadata = { title: "Lab — floating squares", robots: { index: false, follow: false } }

export function generateStaticParams() {
  return labStaticParams()
}

const LABELS = {
  1: "Squares 1 — empty glowing squares of mixed sizes (12–64px) float up through the margins; some filled at very low alpha.",
  2: "Squares 2 — big squares (120–260px) rendered as tiny fake windows (shell, code, browser) drifting like the squares.",
  3: "Squares 3 — small squares plus a few windows; the whole field parallaxes gently with the mouse (spring).",
}

export default async function BgSqLabPage({ params }) {
  const { locale, n } = await params
  if (!LAB_VARIANTS.includes(n)) notFound()
  setRequestLocale(locale)
  const projects = getLabProjects(locale)
  return (
    <BgSqLab
      projects={projects}
      variant={Number(n)}
      title={LABELS[n]}
      intro="The content column stays clean; squares spawn at the bottom and sides, drift up with a slight sway and dissipate at the top. Compare /lab/bgsq/1, /2 and /3."
    />
  )
}
