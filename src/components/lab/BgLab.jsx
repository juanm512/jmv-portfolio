"use client"

import LabRow from "./LabRow"
import ParticleField from "./ParticleField"
import GradientBlobs from "./GradientBlobs"

/*
 * BgLab — heading + rows in a clean ~720px column, abstract background only in
 * the margins. variant: 1 autonomous particles | 2 mouse-reactive particles |
 * 3 breathing gradient blobs with mouse parallax.
 */
export default function BgLab({ projects, variant = 1, title, intro }) {
  return (
    <>
      {variant === 1 && <ParticleField />}
      {variant === 2 && <ParticleField mouse />}
      {variant === 3 && <GradientBlobs />}
      <main className="relative z-10 mx-auto min-h-screen max-w-[720px] px-6">
        <section className="pb-10 pt-16 md:pb-14 md:pt-20">
          <h1 className="max-w-2xl text-2xl font-semibold leading-snug text-white/95 md:text-3xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">{intro}</p>
        </section>
        <section className="pb-24">
          <div className="flex flex-col divide-y divide-white/5">
            {projects.map((p) => (
              <LabRow key={p.slug} project={p} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
