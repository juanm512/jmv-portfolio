"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useReducedMotionMQ } from "./labHooks"

/*
 * GradientBlobs — layered soft gradient blobs (CSS blur) that slowly breathe,
 * only in the margins; the mouse gently parallaxes them.
 *
 * Tunables: blobs[] (size, colour, position, breathe duration), blur (px),
 * parallax (px of max shift for the deepest layer), contentWidth, fade.
 */
const DEFAULT_BLOBS = [
  { x: "6%", y: "12%", size: 520, color: "rgba(0,255,156,0.16)", dur: 11, depth: 1 },
  { x: "-4%", y: "62%", size: 420, color: "rgba(27,94,60,0.35)", dur: 14, depth: 0.6 },
  { x: "82%", y: "8%", size: 460, color: "rgba(0,255,156,0.12)", dur: 13, depth: 0.8 },
  { x: "88%", y: "58%", size: 560, color: "rgba(46,125,87,0.28)", dur: 16, depth: 0.45 },
  { x: "74%", y: "88%", size: 360, color: "rgba(0,255,156,0.10)", dur: 10, depth: 1.2 },
]

function Blob({ b, px, py, blur, parallax, reduced }) {
  const x = useTransform(px, (v) => v * parallax * b.depth)
  const y = useTransform(py, (v) => v * parallax * b.depth)
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: b.x,
        top: b.y,
        width: b.size,
        height: b.size,
        marginLeft: -b.size / 2,
        marginTop: -b.size / 2,
        background: `radial-gradient(circle at 50% 50%, ${b.color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        x,
        y,
        willChange: "transform",
      }}
      animate={reduced ? undefined : { scale: [1, 1.18, 0.94, 1], opacity: [0.85, 1, 0.75, 0.85] }}
      transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

export default function GradientBlobs({
  blobs = DEFAULT_BLOBS,
  blur = 60,
  parallax = 28,
  contentWidth = 720,
  fade = 140,
}) {
  const reduced = useReducedMotionMQ()
  const rawX = useMotionValue(0) // -1..1
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 40, damping: 18, mass: 1.2 })
  const py = useSpring(rawY, { stiffness: 40, damping: 18, mass: 1.2 })

  useEffect(() => {
    const onMove = (e) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1)
      rawY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [rawX, rawY])

  const half = contentWidth / 2
  const mask = `linear-gradient(to right, #000 0, #000 calc(50% - ${half + fade}px), transparent calc(50% - ${half}px), transparent calc(50% + ${half}px), #000 calc(50% + ${half + fade}px), #000 100%)`

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    >
      {blobs.map((b, i) => (
        <Blob key={i} b={b} px={px} py={py} blur={blur} parallax={parallax} reduced={reduced} />
      ))}
    </div>
  )
}
