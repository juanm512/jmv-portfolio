"use client"

import { useBeam } from "./useBeam"
import { useReducedMotionMQ } from "../labHooks"

/*
 * BeamCanvas — absolutely positioned canvas overlaying its host (which must be
 * `position: relative`), with `bleed` px of margin so glow and squares can
 * spill outside the element. pointer-events: none. Tunables: see useBeam
 * (mode, sigma, intensity, emitRate, squareSize, lifetime, drift, color, ...).
 */
export default function BeamCanvas({ hostRef, bleed = 40, ...opts }) {
  const reduced = useReducedMotionMQ()
  const canvasRef = useBeam(hostRef, { ...opts, bleed, reduced })
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute z-0"
      style={{
        top: -bleed,
        left: -bleed,
        width: `calc(100% + ${bleed * 2}px)`,
        height: `calc(100% + ${bleed * 2}px)`,
      }}
    />
  )
}
