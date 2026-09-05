"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { collectTargets } from "./labHooks"

/*
 * MagneticRing — a ring that follows the pointer and, within `snapRadius` px of
 * an interactive element, snaps to it, expands to wrap it and stretches a bit
 * toward the pointer.
 *
 * Tunables: ringSize, snapRadius, padding, pull (0..1, how much the ring
 * follows the pointer while snapped), spring { stiffness, damping }.
 */
export default function MagneticRing({
  ringSize = 28,
  snapRadius = 40,
  padding = 10,
  pull = 0.18,
  spring = { stiffness: 380, damping: 28, mass: 0.7 },
  color = "#00ff9c",
}) {
  const x = useSpring(useMotionValue(-200), spring)
  const y = useSpring(useMotionValue(-200), spring)
  const w = useSpring(useMotionValue(ringSize), spring)
  const h = useSpring(useMotionValue(ringSize), spring)
  const r = useSpring(useMotionValue(ringSize / 2), { stiffness: 300, damping: 30 })
  const sx = useSpring(useMotionValue(1), { stiffness: 300, damping: 20 })
  const sy = useSpring(useMotionValue(1), { stiffness: 300, damping: 20 })
  const dotX = useMotionValue(-200)
  const dotY = useMotionValue(-200)
  const glow = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })
  const targetsRef = useRef([])
  const rectsRef = useRef([])

  useEffect(() => {
    const refresh = () => {
      targetsRef.current = collectTargets()
      rectsRef.current = targetsRef.current.map((el) => el.getBoundingClientRect())
    }
    refresh()
    let px = -200
    let py = -200
    let raf = 0

    const update = () => {
      raf = 0
      dotX.set(px)
      dotY.set(py)
      // nearest target within snapRadius (distance to the rect, not the centre)
      let best = null
      let bestD = snapRadius
      const rects = rectsRef.current
      for (let i = 0; i < rects.length; i++) {
        const rc = rects[i]
        if (rc.width === 0 || rc.width > 700) continue
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
        x.set(cx + ox)
        y.set(cy + oy)
        w.set(best.width + padding * 2)
        h.set(best.height + padding * 2)
        r.set(Math.min(14, (best.height + padding * 2) / 2))
        // stretch toward the pointer
        sx.set(1 + Math.abs(ox) / (best.width + padding * 2))
        sy.set(1 + Math.abs(oy) / (best.height + padding * 2))
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
    const onMove = (e) => {
      px = e.clientX
      py = e.clientY
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onScroll = () => {
      refresh()
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [x, y, w, h, r, sx, sy, glow, dotX, dotY, snapRadius, padding, pull, ringSize])

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] border"
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
          borderColor: color,
          opacity: 0.9,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-[inherit]"
          style={{
            opacity: glow,
            boxShadow: `0 0 18px 0 ${color}66, inset 0 0 12px 0 ${color}22`,
            backgroundColor: `${color}0d`,
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%", backgroundColor: color }}
      />
    </>
  )
}
