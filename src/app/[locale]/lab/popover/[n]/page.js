import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getLabProjects, LAB_VARIANTS, labStaticParams } from "@/components/lab/labData"
import PopoverLab from "@/components/lab/PopoverLab"

export const metadata = { title: "Lab — popover", robots: { index: false, follow: false } }

export function generateStaticParams() {
  return labStaticParams()
}

const LABELS = {
  1: "Fixed panel at the right of the list (sticky in viewport).",
  2: "Anchored beside the hovered row (flips left when there is no room).",
  3: "Follows the cursor with spring lag, never covering the pointer.",
}

export default async function PopoverLabPage({ params }) {
  const { locale, n } = await params
  if (!LAB_VARIANTS.includes(n)) notFound()
  setRequestLocale(locale)
  const projects = getLabProjects(locale)
  const variant = Number(n)

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 pb-24 pt-16">
      <p className="font-mono text-xs uppercase tracking-widest text-white/40">
        <Link href="/lab" className="hover:text-green-glow">lab</Link> / popover / {n}
      </p>
      <h1 className="mt-2 text-xl font-semibold text-white/90">{LABELS[n]}</h1>
      <p className="mt-1 mb-10 text-sm text-white/50">
        Hover (or tab to) a row. Under 768px / touch: the row crossing the middle of the
        viewport opens the popover inline.
      </p>
      <PopoverLab projects={projects} variant={variant} />
    </main>
  )
}
