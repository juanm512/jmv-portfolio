// Shared primitives for the beam / floating-squares prototypes.
// Everything is drawn from one cached Gaussian sprite (a radial bell curve),
// stretched with drawImage — no filters, no shadowBlur, additive blending.

export const SPRITE = 128 // px
const SPRITE_SIGMA = SPRITE / 8 // 4σ fits in the sprite

const spriteCache = new Map()

export function hexToRgb(hex) {
  if (!hex) return "0,255,156"
  if (hex.includes(",")) return hex
  let h = hex.replace("#", "")
  if (h.length === 3) h = h.split("").map((c) => c + c).join("")
  const n = parseInt(h, 16)
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`
}

// Offscreen canvas holding an isotropic Gaussian glow in `rgb`.
export function glowSprite(rgb) {
  let s = spriteCache.get(rgb)
  if (s) return s
  s = document.createElement("canvas")
  s.width = s.height = SPRITE
  const c = s.getContext("2d")
  const half = SPRITE / 2
  const g = c.createRadialGradient(half, half, 0, half, half, half)
  for (let i = 0; i <= 8; i++) {
    const r = (i / 8) * 4 // in sigmas
    const a = Math.exp(-(r * r) / 2)
    g.addColorStop(i / 8, `rgba(${rgb},${(i === 8 ? 0 : a).toFixed(4)})`)
  }
  c.fillStyle = g
  c.fillRect(0, 0, SPRITE, SPRITE)
  spriteCache.set(rgb, s)
  return s
}

// Gaussian blob centred at (x,y) with σx, σy in px and peak alpha `a`.
export function blob(ctx, sprite, x, y, sx, sy, a) {
  if (a <= 0.002) return
  const kx = sx / SPRITE_SIGMA
  const ky = sy / SPRITE_SIGMA
  ctx.globalAlpha = a
  ctx.drawImage(sprite, x - (SPRITE / 2) * kx, y - (SPRITE / 2) * ky, SPRITE * kx, SPRITE * ky)
  ctx.globalAlpha = 1
}

// Horizontal linear gradient with a Gaussian alpha profile centred at cx.
export function gaussGradientX(ctx, rgb, cx, sigma, a) {
  const g = ctx.createLinearGradient(cx - 3.5 * sigma, 0, cx + 3.5 * sigma, 0)
  for (let i = 0; i <= 10; i++) {
    const r = (i / 10 - 0.5) * 7
    g.addColorStop(i / 10, `rgba(${rgb},${(a * Math.exp(-(r * r) / 2)).toFixed(4)})`)
  }
  return g
}

export const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

export function roundedRectPath(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.lineTo(x + w - rr, y)
  ctx.arcTo(x + w, y, x + w, y + rr, rr)
  ctx.lineTo(x + w, y + h - rr)
  ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr)
  ctx.lineTo(x + rr, y + h)
  ctx.arcTo(x, y + h, x, y + h - rr, rr)
  ctx.lineTo(x, y + rr)
  ctx.arcTo(x, y, x + rr, y, rr)
  ctx.closePath()
}

// Point + outward normal at perimeter fraction t of a rect (0..1).
export function perimeterPoint(t, x, y, w, h) {
  const p = (w + h) * 2
  let d = t * p
  if (d < w) return { x: x + d, y, nx: 0, ny: -1 }
  d -= w
  if (d < h) return { x: x + w, y: y + d, nx: 1, ny: 0 }
  d -= h
  if (d < w) return { x: x + w - d, y: y + h, nx: 0, ny: 1 }
  d -= w
  return { x, y: y + h - d, nx: -1, ny: 0 }
}

// Fixed-size square particle pool. Fields per particle: x,y,vx,vy,size,age,life
export class SquarePool {
  constructor(max = 160) {
    this.max = max
    this.data = new Float32Array(max * 7)
    this.n = 0
  }
  emit(x, y, vx, vy, size, life) {
    if (this.n >= this.max) return
    const o = this.n++ * 7
    const d = this.data
    d[o] = x; d[o + 1] = y; d[o + 2] = vx; d[o + 3] = vy
    d[o + 4] = size; d[o + 5] = 0; d[o + 6] = life
  }
  // integrate; drag/gravity optional. Returns live count.
  step(dt, drag = 0.98, gy = 0) {
    const d = this.data
    let i = 0
    while (i < this.n) {
      const o = i * 7
      d[o + 5] += dt
      if (d[o + 5] >= d[o + 6]) {
        const last = (this.n - 1) * 7
        for (let k = 0; k < 7; k++) d[o + k] = d[last + k]
        this.n--
        continue
      }
      d[o + 2] *= drag
      d[o + 3] = d[o + 3] * drag + gy * dt
      d[o] += d[o + 2] * dt
      d[o + 1] += d[o + 3] * dt
      i++
    }
    return this.n
  }
  // Glowing squares: sprite halo + solid core, alpha fades with age.
  draw(ctx, sprite, rgb, intensity) {
    const d = this.data
    for (let i = 0; i < this.n; i++) {
      const o = i * 7
      const t = d[o + 5] / d[o + 6]
      const a = (1 - t) * (1 - t) * intensity
      const s = d[o + 4]
      const x = d[o]
      const y = d[o + 1]
      blob(ctx, sprite, x, y, s * 1.4, s * 1.4, a * 0.6)
      ctx.fillStyle = `rgba(${rgb},${Math.min(1, a).toFixed(3)})`
      ctx.fillRect(Math.round(x - s / 2), Math.round(y - s / 2), s, s)
    }
  }
}
