"use client"

import { useRef } from "react"
import LabRow from "../LabRow"
import BeamCanvas from "./BeamCanvas"

const MODES = { 1: "edge", 2: "sweep", 3: "halo" }

// Per-mode defaults; the same tunables are exposed as BeamCanvas props.
const ROW_OPTS = {
  edge: { sigma: 70, intensity: 1, emitRate: 90, squareSize: [3, 8], lifetime: 1.2, drift: 45 },
  sweep: { sigma: 28, intensity: 1, emitRate: 320, squareSize: [3, 7], lifetime: 1.6, drift: 30 },
  halo: { sigma: 10, intensity: 0.9, emitRate: 40, squareSize: [3, 7], lifetime: 1.4, drift: 32, radius: 6 },
}
const BTN_OPTS = {
  edge: { sigma: 30, intensity: 1, emitRate: 60, squareSize: [3, 6], lifetime: 1, drift: 40 },
  sweep: { sigma: 16, intensity: 1, emitRate: 200, squareSize: [3, 6], lifetime: 1, drift: 30, sweepOnClick: true },
  halo: { sigma: 7, intensity: 1, emitRate: 30, squareSize: [3, 6], lifetime: 1.2, drift: 30, radius: 8 },
}

function BeamRow({ project, mode }) {
  const ref = useRef(null)
  return (
    <LabRow ref={ref} project={project} className="relative">
      <BeamCanvas hostRef={ref} mode={mode} color={project.accent} {...ROW_OPTS[mode]} />
    </LabRow>
  )
}

function BeamButton({ mode, children, primary = false }) {
  const ref = useRef(null)
  return (
    <button
      ref={ref}
      type="button"
      className={`relative rounded-md border px-4 py-2 font-kode text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark ${
        primary
          ? "border-green-glow/60 bg-green-glow/10 text-green-glow hover:bg-green-glow/15"
          : "border-white/15 text-white/80 hover:border-white/30 hover:text-white"
      }`}
    >
      <BeamCanvas hostRef={ref} mode={mode} bleed={28} {...BTN_OPTS[mode]} />
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default function BeamLab({ projects, variant = 1, title, intro }) {
  const mode = MODES[variant] || "edge"
  return (
    <main className="relative z-10 mx-auto min-h-screen max-w-[720px] px-6">
      <section className="pb-10 pt-16 md:pb-14 md:pt-20">
        <h1 className="max-w-2xl text-2xl font-semibold leading-snug text-white/95 md:text-3xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">{intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <BeamButton mode={mode} primary>
            Ver proyecto
          </BeamButton>
          <BeamButton mode={mode}>Descargar CV</BeamButton>
          <BeamButton mode={mode}>Menú</BeamButton>
        </div>
      </section>
      <section className="pb-24">
        <div className="flex flex-col divide-y divide-white/5">
          {projects.map((p) => (
            <BeamRow key={p.slug} project={p} mode={mode} />
          ))}
        </div>
      </section>
    </main>
  )
}
