"use client"

import { useEffect, useState } from "react"

// Damped spring on two axes written straight to an element's transform on
// requestAnimationFrame: no React state per frame, no animation library.
function createSpring(ref) {
  const s = { x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0, raf: 0, last: 0 }
  let cfg = { stiffness: 260, damping: 28, mass: 0.6 }

  const apply = () => {
    if (ref.current) ref.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`
  }

  const step = (now) => {
    const { stiffness: k, damping: c, mass: m } = cfg
    // Clamp the frame to keep the integration stable after a background tab,
    // and sub-step at 1ms so stiff springs stay stable.
    let dt = Math.min((now - s.last) / 1000, 0.064)
    s.last = now
    while (dt > 0) {
      const h = Math.min(dt, 0.001)
      s.vx += ((-k * (s.x - s.tx) - c * s.vx) / m) * h
      s.vy += ((-k * (s.y - s.ty) - c * s.vy) / m) * h
      s.x += s.vx * h
      s.y += s.vy * h
      dt -= h
    }
    const settled =
      Math.abs(s.x - s.tx) < 0.05 && Math.abs(s.y - s.ty) < 0.05 && Math.abs(s.vx) < 0.05 && Math.abs(s.vy) < 0.05
    if (settled) {
      s.x = s.tx
      s.y = s.ty
      s.vx = s.vy = 0
      s.raf = 0
    } else {
      s.raf = requestAnimationFrame(step)
    }
    apply()
  }

  return {
    configure(next) {
      cfg = { ...cfg, ...next }
    },
    // Animate towards (x, y).
    set(x, y) {
      s.tx = x
      s.ty = y
      if (!s.raf) {
        s.last = performance.now()
        s.raf = requestAnimationFrame(step)
      }
    },
    // Jump to (x, y) with no animation (motion's `.jump()`).
    jump(x, y) {
      s.x = s.tx = x
      s.y = s.ty = y
      s.vx = s.vy = 0
      if (s.raf) {
        cancelAnimationFrame(s.raf)
        s.raf = 0
      }
      apply()
    },
    stop() {
      if (s.raf) cancelAnimationFrame(s.raf)
      s.raf = 0
    }
  }
}

// Defaults match the previous motion useSpring config (260 / 28 / 0.6).
export function useSpringXY(ref, { stiffness = 260, damping = 28, mass = 0.6 } = {}) {
  const [spring] = useState(() => createSpring(ref))

  useEffect(() => {
    spring.configure({ stiffness, damping, mass })
  }, [spring, stiffness, damping, mass])

  useEffect(() => () => spring.stop(), [spring])

  return spring
}
