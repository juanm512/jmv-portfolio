"use client"

import { useFinePointer } from "./labHooks"
import LabRow from "./LabRow"
import MagneticRing from "./MagneticRing"
import Spotlight from "./Spotlight"
import BlobCursor from "./BlobCursor"
import styles from "./lab.module.css"

/*
 * CursorLab — same content for every variant so the cursors can be compared.
 * variant: 1 magnetic ring | 2 spotlight (native cursor stays) | 3 goo blob
 * On touch devices or prefers-reduced-motion the custom cursor is not rendered
 * and the native cursor is restored (data-lab-cursor="off").
 */
export default function CursorLab({ projects, variant = 1, title, intro }) {
  const fine = useFinePointer()
  const mode = fine ? String(variant) : "off"

  return (
    <main
      data-lab-cursor={mode}
      className={`${styles.labCursor} relative z-10 mx-auto min-h-screen max-w-4xl px-6`}
    >
      {fine && variant === 1 && <MagneticRing />}
      {fine && variant === 2 && <Spotlight />}
      {fine && variant === 3 && <BlobCursor />}

      <section className="pb-10 pt-16 md:pb-14 md:pt-20">
        <h1 className="max-w-2xl text-2xl font-semibold leading-snug text-white/95 md:text-3xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">{intro}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-md border border-green-glow/60 px-4 py-2 font-mono text-xs uppercase tracking-wider text-green-glow transition-colors hover:bg-green-glow/10"
          >
            Primary action
          </button>
          <button
            type="button"
            className="rounded-md border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/70 transition-colors hover:border-white/40"
          >
            Secondary
          </button>
        </div>
      </section>

      <section className="pb-24">
        <div className="flex flex-col divide-y divide-white/5">
          {projects.map((p) => (
            <LabRow
              key={p.slug}
              project={p}
              className={variant === 2 ? "lab-spot-row" : ""}
              style={
                variant === 2
                  ? {
                      backgroundImage:
                        "radial-gradient(320px circle at calc(var(--sx, -9999px) - var(--rl, 0px)) calc(var(--sy, -9999px) - var(--rt, 0px)), color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </section>
    </main>
  )
}
