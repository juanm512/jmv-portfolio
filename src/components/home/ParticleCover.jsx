"use client"

import { useEffect, useRef } from "react"

/*
 * ParticleCover — draws an image as a grid of particles on a 2D canvas and
 * tweens between "dispersed" (1) and "assembled" (0).
 *
 * Tunables (props):
 *   maxParticles   — hard cap on particle count (default 4000)
 *   assembleMs     — duration of the 1 -> 0 tween (default 520)
 *   disperseMs     — duration of the 0 -> 1 tween (default 380)
 *   scatter        — how far particles fly, as a fraction of the box diagonal (default 0.55)
 *   stagger        — 0..1, how much per-particle delay spreads the motion (default 0.45)
 *   sampleWidth    — width the source image is sampled at (default 480, cap)
 *   maxDpr         — devicePixelRatio cap (default 1.5)
 */

const DATA_CACHE = new Map() // key -> Promise<ParticleData>

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}
function easeInCubic(t) {
  return t * t * t
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

async function buildParticles(src, w, h, maxParticles, scatter, sampleWidth) {
  const img = await loadImage(src)
  const boxAspect = w / h
  const imgAspect = img.naturalWidth / img.naturalHeight

  // Sample the image with "cover" cropping into a sampleWidth x sampleHeight bitmap
  const sw = Math.min(sampleWidth, img.naturalWidth)
  const sh = Math.max(1, Math.round(sw / boxAspect))
  const off = document.createElement("canvas")
  off.width = sw
  off.height = sh
  const octx = off.getContext("2d", { willReadFrequently: true })
  let sx, sy, sWidth, sHeight
  if (imgAspect > boxAspect) {
    sHeight = img.naturalHeight
    sWidth = sHeight * boxAspect
    sx = (img.naturalWidth - sWidth) / 2
    sy = 0
  } else {
    sWidth = img.naturalWidth
    sHeight = sWidth / boxAspect
    sx = 0
    sy = (img.naturalHeight - sHeight) / 2
  }
  octx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, sw, sh)
  const data = octx.getImageData(0, 0, sw, sh).data

  // Grid step so that cols*rows <= maxParticles
  const step = Math.max(2, Math.sqrt((w * h) / maxParticles))
  const cols = Math.floor(w / step)
  const rows = Math.floor(h / step)
  const count = cols * rows
  const diag = Math.sqrt(w * w + h * h)

  // Layout per particle: tx, ty, sx, sy, delay (Float32) + rgb (Uint8)
  const f = new Float32Array(count * 5)
  const c = new Uint8ClampedArray(count * 3)
  const cx = w / 2
  const cy = h / 2
  let i = 0
  for (let r = 0; r < rows; r++) {
    for (let q = 0; q < cols; q++) {
      const tx = (q + 0.5) * step
      const ty = (r + 0.5) * step
      const ix = Math.min(sw - 1, Math.floor((tx / w) * sw))
      const iy = Math.min(sh - 1, Math.floor((ty / h) * sh))
      const di = (iy * sw + ix) * 4
      // Scatter direction: radial from centre plus noise
      const ang = Math.atan2(ty - cy, tx - cx) + (Math.random() - 0.5) * 1.2
      const dist = diag * scatter * (0.35 + Math.random() * 0.65)
      const o = i * 5
      f[o] = tx
      f[o + 1] = ty
      f[o + 2] = tx + Math.cos(ang) * dist
      f[o + 3] = ty + Math.sin(ang) * dist
      f[o + 4] = Math.random()
      c[i * 3] = data[di]
      c[i * 3 + 1] = data[di + 1]
      c[i * 3 + 2] = data[di + 2]
      i++
    }
  }
  return { f, c, count, step }
}

export default function ParticleCover({
  src,
  width,
  height,
  assembled,
  active = true,
  onSettled,
  maxParticles = 4000,
  assembleMs = 520,
  disperseMs = 380,
  scatter = 0.55,
  stagger = 0.45,
  sampleWidth = 480,
  maxDpr = 1.5,
  className = "",
}) {
  const canvasRef = useRef(null)
  const dataRef = useRef(null)
  const rafRef = useRef(0)
  const stateRef = useRef({ value: 1, from: 1, to: 1, start: 0, dur: 0 })
  const onSettledRef = useRef(onSettled)
  onSettledRef.current = onSettled
  const assembledRef = useRef(assembled)
  assembledRef.current = assembled
  const activeRef = useRef(active)
  activeRef.current = active

  // Load / build particle data (cached per src+size)
  useEffect(() => {
    if (!src) return
    let cancelled = false
    const key = `${src}|${width}x${height}|${maxParticles}`
    let p = DATA_CACHE.get(key)
    if (!p) {
      p = buildParticles(src, width, height, maxParticles, scatter, sampleWidth)
      DATA_CACHE.set(key, p)
      p.catch(() => DATA_CACHE.delete(key))
    }
    p.then((d) => {
      if (cancelled) return
      dataRef.current = d
      kick()
    }).catch(() => {})
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, width, height, maxParticles, scatter, sampleWidth])

  // Size the canvas for DPR
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    const ctx = canvas.getContext("2d")
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (dataRef.current) draw(stateRef.current.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, maxDpr])

  function draw(value) {
    const canvas = canvasRef.current
    const d = dataRef.current
    if (!canvas || !d) return
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, width, height)
    const { f, c, count, step } = d
    const size = step * 1.05
    const S = stagger
    let lastColor = -1
    for (let i = 0; i < count; i++) {
      const o = i * 5
      const delay = f[o + 4] * S
      // local progress 0 (at target) .. 1 (scattered), staggered per particle
      let lp = value * (1 + S) - delay
      lp = lp < 0 ? 0 : lp > 1 ? 1 : lp
      if (lp >= 1) continue
      const e = easeInCubic(lp)
      const x = f[o] + (f[o + 2] - f[o]) * e
      const y = f[o + 1] + (f[o + 3] - f[o + 1]) * e
      const a = 1 - lp
      const s = size * (1 - lp * 0.5)
      const r = c[i * 3]
      const g = c[i * 3 + 1]
      const b = c[i * 3 + 2]
      // Quantize alpha to reduce fillStyle churn
      const qa = Math.round(a * 8) / 8
      const key = ((r >> 3) << 12) | ((g >> 3) << 7) | ((b >> 3) << 2)
      const ck = key * 9 + Math.round(qa * 8)
      if (ck !== lastColor) {
        ctx.fillStyle = `rgba(${r},${g},${b},${qa})`
        lastColor = ck
      }
      ctx.fillRect(x - s / 2, y - s / 2, s, s)
    }
  }

  function tick(now) {
    rafRef.current = 0
    const st = stateRef.current
    const t = st.dur > 0 ? Math.min(1, (now - st.start) / st.dur) : 1
    const eased = st.to < st.from ? easeOutCubic(t) : easeInCubic(t)
    st.value = st.from + (st.to - st.from) * eased
    draw(st.value)
    if (t < 1) {
      if (activeRef.current) rafRef.current = requestAnimationFrame(tick)
    } else {
      st.value = st.to
      onSettledRef.current?.(st.to === 0)
    }
  }

  function kick() {
    const st = stateRef.current
    const target = assembledRef.current ? 0 : 1
    if (st.to === target && st.value === target) {
      draw(st.value)
      if (st.value === 0) onSettledRef.current?.(true)
      return
    }
    st.from = st.value
    st.to = target
    st.start = performance.now()
    const full = target === 0 ? assembleMs : disperseMs
    st.dur = full * Math.abs(st.to - st.from)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (activeRef.current) rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (dataRef.current) kick()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assembled])

  useEffect(() => {
    if (!active) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    } else if (dataRef.current && stateRef.current.value !== stateRef.current.to) {
      // resume a tween that was paused mid-way
      const st = stateRef.current
      st.from = st.value
      st.start = performance.now()
      st.dur = (st.to === 0 ? assembleMs : disperseMs) * Math.abs(st.to - st.from)
      rafRef.current = requestAnimationFrame(tick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width, height, display: "block" }}
      aria-hidden
    />
  )
}
