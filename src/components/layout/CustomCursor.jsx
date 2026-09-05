"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { useFinePointer } from "@/lib/useFinePointer"

/*
 * CustomCursor — a magnetic ring that follows the pointer with a spring and,
 * within `snapRadius` px of an interactive element, snaps to it, expands to
 * wrap it and stretches a little toward the pointer. The native cursor stays
 * visible: the ring is a follower, not a replacement. Not rendered on coarse
 * pointers or under prefers-reduced-motion.
 *
 * Tunables: ringSize, snapRadius, padding, pull (0..1, how much the ring
 * follows the pointer while snapped), spring { stiffness, damping, mass }.
 * Z-index: above the TV menu (100) and the help dialog (200).
 */
const TARGETS = "a, button, [role=button], [data-project-row]"

export default function CustomCursor(props) {
  const fine = useFinePointer()
  return fine ? <MagneticRing {...props} /> : null
}

function MagneticRing({
  ringSize = 28,
  snapRadius = 40,
  padding = 10,
  pull = 0.18,
  spring = { stiffness: 380, damping: 28, mass: 0.7 },
}) {
  const x = useSpring(useMotionValue(-200), spring)
  const y = useSpring(useMotionValue(-200), spring)
  const w = useSpring(useMotionValue(ringSize), spring)
  const h = useSpring(useMotionValue(ringSize), spring)
  const r = useSpring(useMotionValue(ringSize / 2), { stiffness: 300, damping: 30 })
  const sx = useSpring(useMotionValue(1), { stiffness: 300, damping: 20 })
  const sy = useSpring(useMotionValue(1), { stiffness: 300, damping: 20 })
  const glow = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })
  const opacity = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })
  const rectsRef = useRef([])
  const ringRef = useRef(null)

  useEffect(() => {
    let px = -200
    let py = -200
    let raf = 0
    let dirty = true

    const refresh = () => {
      const els = document.querySelectorAll(TARGETS)
      const rects = []
      for (const el of els) {
        const rc = el.getBoundingClientRect()
        if (rc.width > 0 && rc.height > 0) rects.push(rc)
      }
      rectsRef.current = rects
      dirty = false
    }

    const update = () => {
      raf = 0
      if (dirty) refresh()
      // nearest target within snapRadius (distance to the rect, not the centre)
      let best = null
      let bestD = snapRadius
      const rects = rectsRef.current
      for (let i = 0; i < rects.length; i++) {
        const rc = rects[i]
        const dx = Math.max(rc.left - px, 0, px - rc.right)
        const dy = Math.max(rc.top - py, 0, py - rc.bottom)
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < bestD) {
          bestD = d
          best = rc
        }
      }
      if (best) {
        const cx = best.left + best.width / 2
        const cy = best.top + best.height / 2
        const ox = (px - cx) * pull
        const oy = (py - cy) * pull
        const bw = best.width + padding * 2
        const bh = best.height + padding * 2
        x.set(cx + ox)
        y.set(cy + oy)
        w.set(bw)
        h.set(bh)
        r.set(Math.min(14, bh / 2))
        // stretch toward the pointer
        sx.set(1 + Math.abs(ox) / bw)
        sy.set(1 + Math.abs(oy) / bh)
        glow.set(1)
      } else {
        x.set(px)
        y.set(py)
        w.set(ringSize)
        h.set(ringSize)
        r.set(ringSize / 2)
        sx.set(1)
        sy.set(1)
        glow.set(0)
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onMove = (e) => {
      px = e.clientX
      py = e.clientY
      opacity.set(1)
      schedule()
    }
    const onLeave = () => opacity.set(0)
    const invalidate = () => {
      dirty = true
      schedule()
    }
    // Layout changes (menu, dialog, popover, route change) invalidate the rects.
    const mo = new MutationObserver((muts) => {
      // the ring's own style updates must not invalidate every frame
      const ring = ringRef.current
      if (muts.some((m) => !ring || !ring.contains(m.target))) invalidate()
    })
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style", "hidden"] })

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("scroll", invalidate, { passive: true })
    window.addEventListener("resize", invalidate)
    document.documentElement.addEventListener("mouseleave", onLeave)
    return () => {
      mo.disconnect()
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", invalidate)
      window.removeEventListener("resize", invalidate)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [x, y, w, h, r, sx, sy, glow, opacity, snapRadius, padding, pull, ringSize])

  return (
    <motion.div
      ref={ringRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[300] border border-green-glow"
      style={{
        x,
        y,
        width: w,
        height: h,
        borderRadius: r,
        scaleX: sx,
        scaleY: sy,
        translateX: "-50%",
        translateY: "-50%",
        opacity,
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          opacity: glow,
          boxShadow: "0 0 18px 0 rgba(0,255,156,0.4), inset 0 0 12px 0 rgba(0,255,156,0.13)",
          backgroundColor: "rgba(0,255,156,0.05)",
        }}
      />
    </motion.div>
  )
}
