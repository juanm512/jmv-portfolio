import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"

export const metadata = { title: "Lab", robots: { index: false, follow: false } }

const GROUPS = [
  {
    name: "A. Project hover popover",
    base: "/lab/popover",
    note: "Cover assembles from particles, stack chips float out as balloons. Variants differ only in WHERE the popover sits.",
    items: [
      "1 — fixed panel at the right (list left ~55%, panel sticky in viewport)",
      "2 — anchored beside the hovered row (right, vertically centred, flips left if no room)",
      "3 — follows the cursor with spring lag (offset so it never covers the pointer, clamped to viewport)",
    ],
  },
  {
    name: "B. Cursor (no trails)",
    base: "/lab/cursor",
    note: "Same content on every page. Global cursor hidden on these pages.",
    items: [
      "1 — magnetic ring: snaps and stretches toward interactive elements within ~40px, wraps them",
      "2 — spotlight: soft radial light reveals a grid and brightens rows; native cursor stays",
      "3 — morphing goo blob: squashes with motion, morphs into a rounded rect over links (difference blend)",
    ],
  },
  {
    name: "C. Background in the margins",
    base: "/lab/bg",
    note: "Content column (~720px) stays clean; effect fades out under a mask toward the content.",
    items: [
      "1 — drifting points with faint green links, autonomous",
      "2 — same field, points repelled by the mouse within a radius",
      "3 — no particles: blurred gradient blobs that breathe; mouse parallax",
    ],
  },
  {
    name: "D. Beam (Overwatch)",
    base: "/lab/beam",
    note: "Energy beam with a Gaussian profile that sheds glowing squares, on rows (project accent) and buttons (green-glow). Variants differ only in WHERE the beam lives.",
    items: [
      "1 — edge beam: band on the bottom edge follows the cursor, squares boil upward from the peak",
      "2 — sweep beam: vertical band sweeps left to right once on enter/click, leaving a trail of squares",
      "3 — halo beam: glow wraps the outline and pulses, squares leave from random points of it",
    ],
  },
  {
    name: "E. Fondo cuadrados",
    base: "/lab/bgsq",
    note: "Floating glowing squares in the margins, low alpha, dissipate at the top. Variants differ only in WHAT the squares are.",
    items: [
      "1 — empty squares of mixed sizes (12–64px), some filled at very low alpha",
      "2 — big squares (120–260px) rendered as tiny fake windows: shell, code, browser",
      "3 — mixed: small squares + a few windows, whole field parallaxes with the mouse",
    ],
  },
]

export default async function LabIndex({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 pb-24 pt-16">
      <h1 className="text-2xl font-semibold text-white/95 md:text-3xl">Lab — effect prototypes</h1>
      <p className="mt-3 max-w-2xl text-sm text-white/60">
        Throwaway pages to pick effects. Max 3 variants per effect, each differing in one
        parameter. Resize under 768px (or use a touch device) to check the mobile behaviour.
      </p>
      {GROUPS.map((g) => (
        <section key={g.base} className="mt-12">
          <h2 className="text-lg font-semibold text-white/90">{g.name}</h2>
          <p className="mt-1 text-sm text-white/50">{g.note}</p>
          <ul className="mt-4 flex flex-col divide-y divide-white/5">
            {g.items.map((label, i) => (
              <li key={i}>
                <Link
                  href={`${g.base}/${i + 1}`}
                  className="block py-3 text-sm text-white/80 transition-colors hover:text-green-glow"
                >
                  <span className="font-mono text-xs text-white/40">{g.base}/{i + 1}</span>
                  <span className="ml-3">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}
