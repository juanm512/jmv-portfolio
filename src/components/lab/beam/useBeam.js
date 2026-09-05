"use client"

import { useEffect, useRef } from "react"
import {
  SquarePool,
  blob,
  easeOutExpo,
  gaussGradientX,
  glowSprite,
  hexToRgb,
  perimeterPoint,
  roundedRectPath,
} from "./beamCore"

/*
 * useBeam(hostRef, opts) — drives a canvas overlaid on hostRef.current.
 * Returns the canvas ref to attach. The canvas must be absolutely positioned
 * inside the host with `-bleed` insets (BeamCanvas does that).
 *
 * mode: "edge"  — Gaussian band on the bottom edge, centred under the cursor
 *                  (lagged), squares boil upward from the peak.
 *       "sweep" — vertical band sweeps left to right once per enter/click
 *                  (600ms, ease-out-expo), leaving a trail of squares.
 *       "halo"  — Gaussian glow wraps the outline, pulsing; squares emit from
 *                  random points on the outline.
 * Tunables: sigma, intensity, emitRate (squares/s), squareSize [min,max],
 * lifetime (s), drift (px/s), color, bleed, radius (corner), maxDpr,
 * sweepMs, sweepOnClick. reduced = static glow, no squares, no rAF.
 */
export function useBeam(
  hostRef,
  {
    mode = "edge",
    sigma = 60,
    intensity = 1,
    emitRate = 70,
    squareSize = [3, 8],
    lifetime = 1.1,
    drift = 40,
    color = "#00ff9c",
    bleed = 40,
    radius = 6,
    maxDpr = 1.5,
    sweepMs = 600,
    sweepOnClick = false,
    reduced = false,
  } = {}
) {
  const canvasRef = useRef(null)
  const sizeKey = squareSize.join(",")

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const ctx = canvas.getContext("2d")
    const rgb = hexToRgb(color)
    const sprite = glowSprite(rgb)
    const [sMin, sMax] = sizeKey.split(",").map(Number)
    const pool = new SquarePool(200)

    let w = 0 // host size in css px
    let h = 0
    let dpr = 1
    let raf = 0
    let last = 0
    let hovered = false
    let focused = false
    let px = 0 // lagged pointer x (host coords)
    let tx = 0
    let emitAcc = 0
    let sweepT = -1 // -1 idle, else progress
    let clock = 0

    const clear = () => ctx.clearRect(-bleed, -bleed, w + bleed * 2, h + bleed * 2)

    const drawStatic = () => {
      clear()
      ctx.globalCompositeOperation = "lighter"
      if (!(hovered || focused)) return
      if (mode === "edge") {
        blob(ctx, sprite, w / 2, h - 1, sigma * 2, 9, 0.5 * intensity)
        ctx.fillStyle = gaussGradientX(ctx, rgb, w / 2, sigma, 0.9 * intensity)
        ctx.fillRect(0, h - 2, w, 2)
      } else if (mode === "sweep") {
        blob(ctx, sprite, w / 2, h / 2, w / 3, h / 2, 0.35 * intensity)
      } else {
        ctx.strokeStyle = `rgba(${rgb},0.8)`
        ctx.lineWidth = 1.2
        roundedRectPath(ctx, 0, 0, w, h, radius)
        ctx.stroke()
        blob(ctx, sprite, w / 2, h / 2, w / 2, h / 1.5, 0.25 * intensity)
      }
    }

    const resize = () => {
      const r = host.getBoundingClientRect()
      w = r.width
      h = r.height
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      canvas.width = Math.round((w + bleed * 2) * dpr)
      canvas.height = Math.round((h + bleed * 2) * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, bleed * dpr, bleed * dpr)
      if (reduced) drawStatic()
    }

    const active = () => hovered || focused || sweepT >= 0 || pool.n > 0

    const emit = (x, y, nx, ny) => {
      const s = sMin + Math.random() * (sMax - sMin)
      const sp = drift * (0.5 + Math.random())
      const tang = (Math.random() - 0.5) * drift * 0.6
      pool.emit(x, y, nx * sp + ny * tang, ny * sp + nx * tang, s, lifetime * (0.6 + Math.random() * 0.6))
    }

    const drawEdge = (dt) => {
      const y = h - 1
      px += (tx - px) * Math.min(1, dt * 10) // lagged follow
      blob(ctx, sprite, px, y, sigma, 9, 0.55 * intensity)
      blob(ctx, sprite, px, y, sigma * 0.55, 2.2, 0.9 * intensity)
      ctx.fillStyle = gaussGradientX(ctx, rgb, px, sigma * 0.5, 0.95 * intensity)
      ctx.fillRect(px - 3.5 * sigma, y - 1, 7 * sigma, 2)
      emitAcc += emitRate * dt
      while (emitAcc >= 1) {
        emitAcc--
        let g = 0 // approx. normal sample along the bell
        for (let k = 0; k < 4; k++) g += Math.random()
        emit(px + (g - 2) * sigma * 0.9, y - 1, 0, -1)
      }
    }

    const drawSweep = (dt) => {
      if (sweepT < 0) return
      const prev = sweepT
      sweepT += (dt * 1000) / sweepMs
      const e0 = easeOutExpo(Math.min(1, prev))
      const e1 = easeOutExpo(Math.min(1, sweepT))
      const x0 = -sigma + (w + sigma * 2) * e0
      const x1 = -sigma + (w + sigma * 2) * e1
      const fade = sweepT >= 1 ? Math.max(0, 1 - (sweepT - 1) * 3) : 1
      ctx.save()
      roundedRectPath(ctx, 0, 0, w, h, radius)
      ctx.clip()
      ctx.fillStyle = gaussGradientX(ctx, rgb, x1, sigma, 0.7 * intensity * fade)
      ctx.fillRect(x1 - 3.5 * sigma, 0, 7 * sigma, h)
      ctx.fillStyle = gaussGradientX(ctx, rgb, x1, sigma * 0.25, 0.9 * intensity * fade)
      ctx.fillRect(x1 - sigma, 0, sigma * 2, h)
      ctx.restore()
      blob(ctx, sprite, x1, h / 2, sigma * 1.2, h * 0.8, 0.25 * intensity * fade)
      emitAcc += emitRate * dt * (x1 - x0 > 0.2 ? 1 : 0.15) * fade
      while (emitAcc >= 1) {
        emitAcc--
        const ex = x0 + Math.random() * Math.max(1, x1 - x0)
        emit(ex, Math.random() * h, -0.3, (Math.random() - 0.5) * 0.4)
      }
      if (sweepT >= 1.34) sweepT = -1
    }

    const drawHalo = (dt) => {
      const a = intensity * (0.72 + 0.28 * Math.sin(clock * 2.6))
      ctx.lineJoin = "round"
      const steps = 7 // stacked strokes approximate a Gaussian cross-section
      for (let i = steps; i >= 1; i--) {
        const r = (i / steps) * 3
        ctx.strokeStyle = `rgba(${rgb},${(a * Math.exp(-(r * r) / 2) * 0.32).toFixed(4)})`
        ctx.lineWidth = r * sigma * 0.5
        roundedRectPath(ctx, 0, 0, w, h, radius)
        ctx.stroke()
      }
      ctx.strokeStyle = `rgba(${rgb},${(a * 0.9).toFixed(3)})`
      ctx.lineWidth = 1.2
      roundedRectPath(ctx, 0, 0, w, h, radius)
      ctx.stroke()
      emitAcc += emitRate * dt
      while (emitAcc >= 1) {
        emitAcc--
        const p = perimeterPoint(Math.random(), 0, 0, w, h)
        emit(p.x, p.y, p.nx, p.ny)
      }
    }

    const step = (now) => {
      raf = 0
      const dt = Math.min(0.05, (now - last) / 1000) || 0.016
      last = now
      clock += dt
      clear()
      ctx.globalCompositeOperation = "lighter"
      const on = hovered || focused
      if (mode === "edge" && on) drawEdge(dt)
      else if (mode === "sweep") drawSweep(dt)
      else if (mode === "halo" && on) drawHalo(dt)
      pool.step(dt, 0.985, mode === "edge" ? -12 : 0)
      pool.draw(ctx, sprite, rgb, intensity)
      if (active()) raf = requestAnimationFrame(step)
      else clear()
    }

    const start = () => {
      if (reduced) return drawStatic()
      if (!raf) {
        last = performance.now()
        raf = requestAnimationFrame(step)
      }
    }
    const startSweep = () => {
      if (reduced) return drawStatic()
      sweepT = 0
      emitAcc = 0
      start()
    }
    const trigger = () => (mode === "sweep" ? startSweep() : start())

    const onEnter = (e) => {
      hovered = true
      tx = px = e.clientX - host.getBoundingClientRect().left
      trigger()
    }
    const onMove = (e) => {
      tx = e.clientX - host.getBoundingClientRect().left
    }
    const onLeave = () => {
      hovered = false
      if (reduced) drawStatic()
    }
    const onFocus = () => {
      focused = true
      tx = px = w / 2
      trigger()
    }
    const onBlur = () => {
      focused = false
      if (reduced) drawStatic()
    }
    const onClick = () => {
      if (mode === "sweep" && sweepOnClick) startSweep()
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    host.addEventListener("pointerenter", onEnter)
    host.addEventListener("pointermove", onMove, { passive: true })
    host.addEventListener("pointerleave", onLeave)
    host.addEventListener("focus", onFocus)
    host.addEventListener("blur", onBlur)
    host.addEventListener("click", onClick)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      host.removeEventListener("pointerenter", onEnter)
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
      host.removeEventListener("focus", onFocus)
      host.removeEventListener("blur", onBlur)
      host.removeEventListener("click", onClick)
    }
  }, [hostRef, mode, sigma, intensity, emitRate, sizeKey, lifetime, drift, color, bleed, radius, maxDpr, sweepMs, sweepOnClick, reduced])

  return canvasRef
}
