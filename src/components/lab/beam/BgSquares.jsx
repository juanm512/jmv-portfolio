"use client"

import { useEffect, useRef } from "react"
import { blob, glowSprite, hexToRgb, roundedRectPath } from "./beamCore"
import { WINDOWS } from "./windows"
import { useReducedMotionMQ } from "../labHooks"

/*
 * BgSquares — full-page fixed canvas of slowly floating glowing squares behind
 * a clean content column (masked toward the content like ParticleField).
 *
 * variant 1: outlined/glowing squares 12–64px, some filled at very low alpha.
 * variant 2: big "windows" 120–260px (title bar + faux shell/code/browser
 *            content in Kode Mono, text alpha ≤ 0.25) drifting like squares.
 * variant 3: small squares + ≤6 windows, whole field parallaxes with a spring.
 *
 * Tunables: maxSquares, maxWindows, squareSize [min,max], windowSize [min,max],
 * peak [min,max] (alpha), speed [min,max] px/s, sway (px), contentWidth,
 * fade, parallax (px at the viewport edge), maxDpr, color.
 */
export default function BgSquares({
  variant = 1,
  maxSquares = 60,
  maxWindows = 10,
  squareSize = [12, 64],
  windowSize = [120, 260],
  peak = [0.1, 0.18],
  speed = [8, 22],
  sway = 14,
  contentWidth = 720,
  fade = 120,
  parallax = 0,
  maxDpr = 1.5,
  color = "#00ff9c",
}) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotionMQ()
  const sqKey = squareSize.join(",")
  const winKey = windowSize.join(",")
  const peakKey = peak.join(",")
  const speedKey = speed.join(",")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const rgb = hexToRgb(color)
    const sprite = glowSprite(rgb)
    const [sqMin, sqMax] = sqKey.split(",").map(Number)
    const [wMin, wMax] = winKey.split(",").map(Number)
    const [pMin, pMax] = peakKey.split(",").map(Number)
    const [vMin, vMax] = speedKey.split(",").map(Number)
    const wantSquares = variant === 2 ? 0 : maxSquares
    const wantWindows = variant === 1 ? 0 : variant === 3 ? Math.min(6, maxWindows) : maxWindows
    const font =
      (getComputedStyle(document.documentElement).getPropertyValue("--font-kode").trim() ||
        getComputedStyle(document.body).getPropertyValue("--font-kode").trim() ||
        "ui-monospace") + ", ui-monospace, Menlo, monospace"

    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let last = 0
    let hidden = document.hidden
    let L = 0
    let R = 0
    const items = [] // {x,y,vy,sway,phase,size,age,life,win,peak,filled,depth}
    let mx = 0.5
    let my = 0.5
    let ppx = 0 // parallax spring position/velocity
    let ppy = 0
    let pvx = 0
    let pvy = 0

    const COLORS = {
      g: `rgba(${rgb},0.25)`,
      i: "rgba(255,255,255,0.22)",
      b: "rgba(120,170,255,0.25)",
      d: "rgba(255,255,255,0.11)",
    }

    // Pre-render a window into an offscreen canvas once; drawn each frame
    // with drawImage + globalAlpha so text is never re-laid-out.
    const renderWindow = (tpl, size) => {
      const ww = Math.round(size)
      const wh = Math.round(size * 0.78)
      const fs = Math.max(8, Math.min(12, size / 18))
      const lh = fs * 1.5
      const bar = fs * 1.9
      const off = document.createElement("canvas")
      const s = Math.min(2, dpr * 1.2)
      off.width = Math.ceil(ww * s)
      off.height = Math.ceil(wh * s)
      const c = off.getContext("2d")
      c.scale(s, s)
      c.fillStyle = `rgba(${rgb},0.035)`
      roundedRectPath(c, 0.5, 0.5, ww - 1, wh - 1, 4)
      c.fill()
      c.strokeStyle = `rgba(${rgb},0.4)`
      c.lineWidth = 1
      c.stroke()
      // title bar
      c.fillStyle = `rgba(${rgb},0.06)`
      c.fillRect(1, 1, ww - 2, bar)
      c.font = `${fs}px ${font}`
      c.textBaseline = "middle"
      if (tpl.kind === "browser") {
        c.fillStyle = "rgba(255,255,255,0.08)"
        roundedRectPath(c, fs * 2.6, bar * 0.2, ww - fs * 3.4, bar * 0.6, bar * 0.3)
        c.fill()
        c.fillStyle = "rgba(255,255,255,0.2)"
        c.fillText(tpl.title, fs * 3.2, bar / 2 + 0.5)
        for (let k = 0; k < 2; k++) {
          c.fillStyle = "rgba(255,255,255,0.18)"
          c.fillRect(fs * 0.7 + k * fs * 1.1, bar / 2 - 0.5, fs * 0.6, 1)
        }
      } else {
        for (let k = 0; k < 3; k++) {
          c.fillStyle = k === 0 ? `rgba(${rgb},0.35)` : "rgba(255,255,255,0.18)"
          c.beginPath()
          c.arc(fs * 0.9 + k * fs * 0.95, bar / 2, fs * 0.26, 0, Math.PI * 2)
          c.fill()
        }
        c.fillStyle = "rgba(255,255,255,0.2)"
        c.fillText(tpl.title, fs * 3.6, bar / 2 + 0.5)
      }
      // body
      let y = bar + lh * 0.9
      if (tpl.kind === "browser") {
        const bigFs = fs * 1.5
        c.font = `${bigFs}px ${font}`
        y = bar + lh * 1.4
        for (const line of tpl.lines) {
          let x = fs * 1.2
          for (const tok of line) {
            c.fillStyle = COLORS[tok.c]
            c.fillText(tok.t, x, y)
            x += c.measureText(tok.t).width
          }
          y += bigFs * 1.6
          c.font = `${fs}px ${font}`
        }
        // faux content blocks
        const bw = ww - fs * 2.4
        for (let k = 0; k < 3 && y + fs < wh - fs; k++) {
          c.fillStyle = "rgba(255,255,255,0.05)"
          roundedRectPath(c, fs * 1.2, y, bw * (0.55 + 0.4 * ((k * 7) % 3) / 2), fs * 1.1, 2)
          c.fill()
          y += fs * 1.8
        }
      } else {
        for (const line of tpl.lines) {
          if (y > wh - fs * 0.6) break
          let x = fs * 0.9
          for (const tok of line) {
            c.fillStyle = COLORS[tok.c]
            c.fillText(tok.t, x, y)
            x += c.measureText(tok.t).width
          }
          y += lh
        }
      }
      return off
    }

    const spawn = (isWin, anywhere) => {
      const size = isWin ? wMin + Math.random() * (wMax - wMin) : sqMin + Math.random() * (sqMax - sqMin)
      const margins = L > 40 && w - R > 40
      const fromSide = !anywhere && Math.random() < 0.2
      let x
      if (margins) {
        const left = Math.random() < L / (L + (w - R))
        x = left ? Math.random() * L : R + Math.random() * (w - R)
      } else x = Math.random() * w
      let y = anywhere ? Math.random() * h : h + size
      let vx = 0
      if (fromSide) {
        const left = Math.random() < 0.5
        x = left ? -size : w + size
        y = h * (0.4 + Math.random() * 0.6)
        vx = (left ? 1 : -1) * (vMin * 0.6)
      }
      const vy = -(vMin + Math.random() * (vMax - vMin)) * (isWin ? 0.7 : 1)
      const life = (h + size * 2) / -vy + Math.random() * 6
      const tpl = isWin ? WINDOWS[Math.floor(Math.random() * WINDOWS.length)] : null
      items.push({
        x,
        y,
        vx,
        vy,
        sway: sway * (0.5 + Math.random()),
        phase: Math.random() * Math.PI * 2,
        freq: 0.25 + Math.random() * 0.35,
        size,
        age: anywhere ? Math.random() * life * 0.6 : 0,
        life,
        win: isWin ? renderWindow(tpl, size) : null,
        peak: isWin ? 0.55 + Math.random() * 0.3 : pMin + Math.random() * (pMax - pMin),
        filled: !isWin && Math.random() < 0.3,
        depth: 0.4 + (size - (isWin ? wMin : sqMin)) / ((isWin ? wMax : sqMax) - (isWin ? wMin : sqMin) || 1),
      })
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      L = Math.max(0, (w - contentWidth) / 2 - 24)
      R = Math.min(w, (w + contentWidth) / 2 + 24)
      if (items.length === 0) {
        for (let i = 0; i < wantSquares; i++) spawn(false, true)
        for (let i = 0; i < wantWindows; i++) spawn(true, true)
      }
      if (reduced) draw(0)
    }

    const envelope = (it) => {
      const t = it.age / it.life
      const inA = Math.min(1, t / 0.15)
      const outA = Math.min(1, (1 - t) / 0.3)
      const topFade = Math.min(1, Math.max(0, (it.y + it.size) / (h * 0.28)))
      return it.peak * inA * outA * topFade
    }

    const draw = (dt) => {
      ctx.clearRect(0, 0, w, h)
      let sq = 0
      let wn = 0
      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i]
        it.age += dt
        it.phase += dt * it.freq
        it.y += it.vy * dt
        it.x += it.vx * dt + Math.cos(it.phase) * it.sway * dt * 0.5
        if (it.age >= it.life || it.y < -it.size * 2) {
          items.splice(i, 1)
          continue
        }
        if (it.win) wn++
        else sq++
      }
      while (sq < wantSquares) {
        spawn(false, false)
        sq++
      }
      while (wn < wantWindows) {
        spawn(true, false)
        wn++
      }
      for (const it of items) {
        const a = envelope(it)
        if (a <= 0.003) continue
        const ox = ppx * it.depth
        const oy = ppy * it.depth
        const x = it.x + ox
        const y = it.y + oy
        const s = it.size
        ctx.globalCompositeOperation = "lighter"
        if (it.win) {
          blob(ctx, sprite, x + s / 2, y + s * 0.39, s * 0.45, s * 0.36, a * 0.16)
          ctx.globalCompositeOperation = "source-over"
          ctx.globalAlpha = a
          ctx.drawImage(it.win, Math.round(x), Math.round(y), s, s * 0.78)
          ctx.globalAlpha = 1
        } else {
          blob(ctx, sprite, x, y, s * 0.55, s * 0.55, a * 0.55)
          ctx.strokeStyle = `rgba(${rgb},${Math.min(0.5, a * 2.6).toFixed(3)})`
          ctx.lineWidth = 1
          ctx.strokeRect(Math.round(x - s / 2) + 0.5, Math.round(y - s / 2) + 0.5, Math.round(s), Math.round(s))
          if (it.filled) {
            ctx.fillStyle = `rgba(${rgb},${(a * 0.35).toFixed(3)})`
            ctx.fillRect(Math.round(x - s / 2), Math.round(y - s / 2), Math.round(s), Math.round(s))
          }
        }
      }
      ctx.globalCompositeOperation = "source-over"
    }

    const step = (now) => {
      raf = 0
      if (hidden) return
      const dt = Math.min(0.05, (now - last) / 1000) || 0.016
      last = now
      if (parallax) {
        const tx = (0.5 - mx) * parallax * 2
        const ty = (0.5 - my) * parallax * 2
        pvx += (tx - ppx) * 30 * dt
        pvy += (ty - ppy) * 30 * dt
        pvx *= 1 - Math.min(1, dt * 6)
        pvy *= 1 - Math.min(1, dt * 6)
        ppx += pvx * dt
        ppy += pvy * dt
      }
      draw(dt)
      raf = requestAnimationFrame(step)
    }

    const start = () => {
      if (reduced) return
      if (!raf && !hidden) {
        last = performance.now()
        raf = requestAnimationFrame(step)
      }
    }
    const onVis = () => {
      hidden = document.hidden
      if (hidden && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      } else start()
    }
    const onMove = (e) => {
      mx = e.clientX / w
      my = e.clientY / h
    }

    resize()
    start()
    window.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", onVis)
    if (parallax) window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVis)
      window.removeEventListener("mousemove", onMove)
    }
  }, [variant, maxSquares, maxWindows, sqKey, winKey, peakKey, speedKey, sway, contentWidth, parallax, maxDpr, color, reduced])

  const half = contentWidth / 2
  const mask = `linear-gradient(to right, #000 0, #000 calc(50% - ${half + fade}px), transparent calc(50% - ${half}px), transparent calc(50% + ${half}px), #000 calc(50% + ${half + fade}px), #000 100%)`

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    />
  )
}
