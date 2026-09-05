"use client"

import { useEffect, useRef } from "react"

/*
 * ParticleField — slow drifting points with faint connecting lines, only in
 * the margins outside the content column. Optionally reacts to the mouse.
 *
 * Tunables: count (per 1M px² of margin area, default 90), linkDist (px),
 * speed (px/s), contentWidth (px, the clean column), fade (px, mask fade width),
 * mouse (bool), mouseRadius (px), mouseForce (>0 repels, <0 attracts),
 * maxDpr, color.
 */
export default function ParticleField({
  count = 90,
  linkDist = 110,
  speed = 14,
  contentWidth = 720,
  fade = 120,
  mouse = false,
  mouseRadius = 160,
  mouseForce = 900,
  maxDpr = 1.5,
  color = "0,255,156",
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let w = 0
    let h = 0
    let dpr = 1
    let pts = null // Float32Array: x, y, vx, vy
    let n = 0
    let raf = 0
    let last = 0
    let hidden = document.hidden
    let mx = -1e4
    let my = -1e4

    // margin bounds [0, L] and [R, w]
    let L = 0
    let R = 0

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
      const marginArea = (L + (w - R)) * h
      n = Math.min(400, Math.round((marginArea / 1e6) * count))
      pts = new Float32Array(n * 4)
      for (let i = 0; i < n; i++) spawn(i, true)
    }

    const spawn = (i, anywhere) => {
      const o = i * 4
      const leftSide = L > 0 && (w - R <= 0 || Math.random() < L / (L + (w - R)))
      pts[o] = leftSide ? Math.random() * L : R + Math.random() * (w - R)
      pts[o + 1] = anywhere ? Math.random() * h : Math.random() * h
      const a = Math.random() * Math.PI * 2
      const s = speed * (0.5 + Math.random())
      pts[o + 2] = Math.cos(a) * s
      pts[o + 3] = Math.sin(a) * s
    }

    const step = (now) => {
      raf = 0
      if (hidden) return
      const dt = Math.min(0.05, (now - last) / 1000) || 0.016
      last = now
      ctx.clearRect(0, 0, w, h)

      // integrate
      for (let i = 0; i < n; i++) {
        const o = i * 4
        let x = pts[o]
        let y = pts[o + 1]
        let vx = pts[o + 2]
        let vy = pts[o + 3]
        if (mouse) {
          const dx = x - mx
          const dy = y - my
          const d2 = dx * dx + dy * dy
          if (d2 < mouseRadius * mouseRadius && d2 > 1) {
            const d = Math.sqrt(d2)
            const f = (1 - d / mouseRadius) * mouseForce * dt
            vx += (dx / d) * f
            vy += (dy / d) * f
          }
          // damp back toward drift speed
          const sp = Math.sqrt(vx * vx + vy * vy)
          if (sp > speed * 1.5) {
            const k = 1 - Math.min(1, dt * 2.5)
            vx *= k
            vy *= k
          }
        }
        x += vx * dt
        y += vy * dt
        // wrap vertically, bounce off the content column and screen edges
        if (y < -10) y = h + 10
        else if (y > h + 10) y = -10
        const onLeft = x < w / 2
        if (onLeft) {
          if (x > L) {
            x = L
            vx = -Math.abs(vx)
          } else if (x < 0) {
            x = 0
            vx = Math.abs(vx)
          }
        } else if (x < R) {
          x = R
          vx = Math.abs(vx)
        } else if (x > w) {
          x = w
          vx = -Math.abs(vx)
        }
        pts[o] = x
        pts[o + 1] = y
        pts[o + 2] = vx
        pts[o + 3] = vy
      }

      // links (same side only)
      ctx.lineWidth = 1
      const ld2 = linkDist * linkDist
      for (let i = 0; i < n; i++) {
        const xi = pts[i * 4]
        const yi = pts[i * 4 + 1]
        for (let j = i + 1; j < n; j++) {
          const xj = pts[j * 4]
          if ((xi < w / 2) !== (xj < w / 2)) continue
          const dx = xi - xj
          if (dx > linkDist || dx < -linkDist) continue
          const dy = yi - pts[j * 4 + 1]
          const d2 = dx * dx + dy * dy
          if (d2 > ld2) continue
          const a = (1 - d2 / ld2) * 0.28
          ctx.strokeStyle = `rgba(${color},${a.toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(xi, yi)
          ctx.lineTo(xj, pts[j * 4 + 1])
          ctx.stroke()
        }
      }

      // points
      ctx.fillStyle = `rgba(${color},0.7)`
      for (let i = 0; i < n; i++) {
        const x = pts[i * 4]
        const y = pts[i * 4 + 1]
        ctx.fillRect(x - 1, y - 1, 2, 2)
      }
      raf = requestAnimationFrame(step)
    }

    const start = () => {
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
      mx = e.clientX
      my = e.clientY
    }
    const onLeave = () => {
      mx = -1e4
      my = -1e4
    }

    resize()
    start()
    window.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", onVis)
    if (mouse) {
      window.addEventListener("mousemove", onMove, { passive: true })
      document.documentElement.addEventListener("mouseleave", onLeave)
    }
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVis)
      window.removeEventListener("mousemove", onMove)
      document.documentElement.removeEventListener("mouseleave", onLeave)
    }
  }, [count, linkDist, speed, contentWidth, mouse, mouseRadius, mouseForce, maxDpr, color])

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
