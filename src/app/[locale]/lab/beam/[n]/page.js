import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getLabProjects, LAB_VARIANTS, labStaticParams } from "@/components/lab/labData"
import BeamLab from "@/components/lab/beam/BeamLab"

export const metadata = { title: "Lab — beam", robots: { index: false, follow: false } }

export function generateStaticParams() {
  return labStaticParams()
}

const LABELS = {
  1: "Beam 1 — edge beam: a Gaussian band on the bottom edge follows the cursor; squares boil upward from the peak.",
  2: "Beam 2 — sweep beam: a vertical band sweeps left to right on enter (600ms, ease-out-expo), leaving a trail of squares.",
  3: "Beam 3 — halo beam: the glow wraps the outline and pulses; squares leave from random points of the outline.",
}

export default async function BeamLabPage({ params }) {
  const { locale, n } = await params
  if (!LAB_VARIANTS.includes(n)) notFound()
  setRequestLocale(locale)
  const projects = getLabProjects(locale)
  return (
    <BeamLab
      projects={projects}
      variant={Number(n)}
      title={LABELS[n]}
      intro="Hover or focus a row or a button. Rows use their project accent; buttons use green-glow. Compare /lab/beam/1, /2 and /3."
    />
  )
}
