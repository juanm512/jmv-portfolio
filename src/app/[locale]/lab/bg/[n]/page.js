import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getLabProjects, LAB_VARIANTS, labStaticParams } from "@/components/lab/labData"
import BgLab from "@/components/lab/BgLab"

export const metadata = { title: "Lab — background", robots: { index: false, follow: false } }

export function generateStaticParams() {
  return labStaticParams()
}

const LABELS = {
  1: "Background 1 — drifting points with faint links in the margins, autonomous.",
  2: "Background 2 — same field, points repelled by the mouse.",
  3: "Background 3 — breathing gradient blobs with mouse parallax.",
}

export default async function BgLabPage({ params }) {
  const { locale, n } = await params
  if (!LAB_VARIANTS.includes(n)) notFound()
  setRequestLocale(locale)
  const projects = getLabProjects(locale)

  return (
    <BgLab
      projects={projects}
      variant={Number(n)}
      title={LABELS[n]}
      intro="The content column stays clean; the effect lives only in the left/right margins and fades out toward the content. Compare /lab/bg/1, /2 and /3."
    />
  )
}
