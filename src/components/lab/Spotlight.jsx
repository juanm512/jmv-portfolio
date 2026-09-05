"use client"

import { useEffect, useRef } from "react"

/*
 * Spotlight — a soft radial light around the (native) pointer that reveals a
 * faint grid texture and a glow. Rows brighten via the same CSS variables
 * (--sx/--sy on <html>) consumed in CursorLab.
 *
 * Tunables: radius (px), gridSize (px), intensity (0..1), color.
 */
export default function Spotlight({
  radius = 240,
  gridSize = 28,
  intensity = 0.16,
  color = "0,255,156",
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let px = -9999
    let py = -9999
    const apply = () => {
      raf = 0
      el.style.setProperty("--sx", `${px}px`)
      el.style.setProperty("--sy", `${py}px`)
      document.documentElement.style.setProperty("--sx", `${px}px`)
      document.documentElement.style.setProperty("--sy", `${py}px`)
      // rows consume --rl/--rt to place their own glow in local coordinates
      const rows = document.querySelectorAll("[data-project-row]")
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i].getBoundingClientRect()
        rows[i].style.setProperty("--rl", `${r.left}px`)
        rows[i].style.setProperty("--rt", `${r.top}px`)
      }
    }
    const onMove = (e) => {
      px = e.clientX
      py = e.clientY
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      px = -9999
      py = -9999
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      if (raf) cancelAnimationFrame(raf)
      document.documentElement.style.removeProperty("--sx")
      document.documentElement.style.removeProperty("--sy")
    }
  }, [])

  const mask = `radial-gradient(circle ${radius}px at var(--sx, -9999px) var(--sy, -9999px), rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 100%)`

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{ "--sx": "-9999px", "--sy": "-9999px" }}
    >
      {/* grid texture revealed under the light */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(${color},0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(${color},0.22) 1px, transparent 1px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
      {/* soft glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle ${radius * 0.9}px at var(--sx) var(--sy), rgba(${color},${intensity}) 0%, rgba(${color},0) 70%)`,
        }}
      />
    </div>
  )
}
