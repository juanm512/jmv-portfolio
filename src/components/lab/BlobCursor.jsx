"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from "motion/react"
import { collectTargets } from "./labHooks"

/*
 * BlobCursor — an SVG goo blob (leader + follower circles merged by a
 * blur/contrast filter) that squashes along its direction of motion and morphs
 * into a rounded rect over interactive elements. Rendered with
 * mix-blend-mode: difference.
 *
 * Tunables: size (px diameter), squash (0..1 how much velocity deforms it),
 * followLag (spring for the follower — lower stiffness = more stretch),
 * padding (rect padding around the element), gooBlur (px).
 */
export default function BlobCursor({
  size = 22,
  squash = 0.35,
  leadSpring = { stiffness: 900, damping: 60, mass: 0.4 },
  followLag = { stiffness: 260, damping: 26, mass: 0.6 },
  padding = 8,
  gooBlur = 5,
}) {
  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)
  const lx = useSpring(rawX, leadSpring)
  const ly = useSpring(rawY, leadSpring)
  const fx = useSpring(rawX, followLag)
  const fy = useSpring(rawY, followLag)
  const morph = useSpring(useMotionValue(0), { stiffness: 320, damping: 28 })
  const rw = useSpring(useMotionValue(size), { stiffness: 320, damping: 28 })
  const rh = useSpring(useMotionValue(size), { stiffness: 320, damping: 28 })
  const rcx = useSpring(useMotionValue(-200), { stiffness: 320, damping: 28 })
  const rcy = useSpring(useMotionValue(-200), { stiffness: 320, damping: 28 })
  const angle = useMotionValue(0)
  const sx = useSpring(useMotionValue(1), { stiffness: 400, damping: 30 })
  const sy = useSpring(useMotionValue(1), { stiffness: 400, damping: 30 })
  const rectsRef = useRef([])
  const hoverRef = useRef(null)

  // circle radius shrinks as the rect takes over
  const cr = useTransform(morph, [0, 1], [size / 2, size * 0.18])
  const rectRadius = useTransform(morph, [0, 1], [size / 2, 10])
  const rectW = useTransform([rw, morph], ([w, m]) => size + (w - size) * m)
  const rectH = useTransform([rh, morph], ([h, m]) => size + (h - size) * m)
  const rectX = useTransform([rcx, rectW], ([cx, w]) => cx - w / 2)
  const rectY = useTransform([rcy, rectH], ([cy, h]) => cy - h / 2)
  const rectOpacity = useTransform(morph, [0, 0.15, 1], [0, 1, 1])
  const leadTransform = useTransform(
    [lx, ly, angle, sx, sy],
    ([x, y, a, a1, a2]) => `translate(${x}px, ${y}px) rotate(${a}deg) scale(${a1}, ${a2})`
  )

  useEffect(() => {
    const refresh = () => {
      rectsRef.current = collectTargets().map((el) => el.getBoundingClientRect())
    }
    refresh()
    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      const px = e.clientX
      const py = e.clientY
      let hit = null
      for (const rc of rectsRef.current) {
        if (rc.width === 0 || rc.width > 700) continue
        if (px >= rc.left && px <= rc.right && py >= rc.top && py <= rc.bottom) {
          hit = rc
          break
        }
      }
      hoverRef.current = hit
      if (hit) {
        rw.set(hit.width + padding * 2)
        rh.set(hit.height + padding * 2)
        rcx.set(hit.left + hit.width / 2)
        rcy.set(hit.top + hit.height / 2)
        morph.set(1)
      } else {
        rcx.set(px)
        rcy.set(py)
        morph.set(0)
      }
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("scroll", refresh, { passive: true })
    window.addEventListener("resize", refresh)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", refresh)
      window.removeEventListener("resize", refresh)
    }
  }, [rawX, rawY, rw, rh, rcx, rcy, morph, padding])

  // Squash along velocity
  useAnimationFrame(() => {
    if (hoverRef.current) {
      sx.set(1)
      sy.set(1)
      return
    }
    const vx = lx.getVelocity()
    const vy = ly.getVelocity()
    const speed = Math.sqrt(vx * vx + vy * vy) // px/s
    const k = Math.min(1, speed / 2500) * squash
    if (speed > 20) angle.set((Math.atan2(vy, vx) * 180) / Math.PI)
    sx.set(1 + k)
    sy.set(1 / (1 + k))
  })

  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
      style={{ mixBlendMode: "difference" }}
    >
      <defs>
        <filter id="lab-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation={gooBlur} result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
      <g fill="#fff" filter="url(#lab-goo)">
        <motion.circle cx={fx} cy={fy} r={size * 0.36} />
        <motion.g style={{ transform: leadTransform, transformOrigin: "0 0" }}>
          <motion.circle cx={0} cy={0} r={cr} />
        </motion.g>
        <motion.rect
          x={rectX}
          y={rectY}
          width={rectW}
          height={rectH}
          rx={rectRadius}
          style={{ opacity: rectOpacity }}
        />
      </g>
    </svg>
  )
}
