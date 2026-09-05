import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getLabProjects, LAB_VARIANTS, labStaticParams } from "@/components/lab/labData"
import CursorLab from "@/components/lab/CursorLab"

export const metadata = { title: "Lab — cursor", robots: { index: false, follow: false } }

export function generateStaticParams() {
  return labStaticParams()
}

const LABELS = {
  1: "Cursor 1 — magnetic ring that snaps to and wraps interactive elements.",
  2: "Cursor 2 — spotlight that reveals a grid and brightens rows (native cursor stays).",
  3: "Cursor 3 — goo blob that squashes with motion and morphs over links.",
}

export default async function CursorLabPage({ params }) {
  const { locale, n } = await params
  if (!LAB_VARIANTS.includes(n)) notFound()
  setRequestLocale(locale)
  const projects = getLabProjects(locale)

  return (
    <CursorLab
      projects={projects}
      variant={Number(n)}
      title={LABELS[n]}
      intro="Move around, hover the buttons and the rows, then compare with /lab/cursor/1, /2 and /3. Back to /lab for the index."
    />
  )
}
