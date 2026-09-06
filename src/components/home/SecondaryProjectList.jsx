"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring } from "motion/react"
import { SecondaryProjectRow } from "@/components/home/ProjectList"
import { coverSrc } from "@/components/home/FeaturedProjectRow"
import { usePopoverMode, useReducedMotionMQ } from "@/lib/useFinePointer"

const WIDTH = 220
const OFFSET = { x: 24, y: 18 }

// Secondary rows: on a fine pointer the cover floats and follows the cursor
// with a spring; on coarse pointers there is no cover at all (one-line rows,
// nothing to reveal). Only one cover element exists, keyed by the hovered slug.
export default function SecondaryProjectList({ projects }) {
  const mode = usePopoverMode()
  const reduced = useReducedMotionMQ()
  const [hovered, setHovered] = useState(null)
  const listRef = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = reduced ? { stiffness: 1000, damping: 100 } : { stiffness: 260, damping: 28, mass: 0.6 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const move = (e) => {
    const h = (WIDTH * 10) / 16
    const px = Math.min(e.clientX + OFFSET.x, window.innerWidth - WIDTH - 8)
    const py = Math.min(e.clientY + OFFSET.y, window.innerHeight - h - 8)
    x.set(px)
    y.set(py)
  }

  const project = hovered && mode === "desktop" ? projects.find((p) => p.slug === hovered) : null
  const src = project ? coverSrc(project) : null
  const active = mode === "desktop" && !!src

  return (
    <div
      ref={listRef}
      className="border-t border-line"
      onPointerMove={mode === "desktop" ? move : undefined}
      onPointerLeave={() => setHovered(null)}
    >
      {projects.map((p) => (
        <div
          key={p.slug}
          onPointerEnter={(e) => {
            if (mode !== "desktop") return
            move(e)
            sx.jump(x.get())
            sy.jump(y.get())
            setHovered(p.slug)
          }}
        >
          <SecondaryProjectRow project={p} />
        </div>
      ))}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.96 }}
        transition={{ duration: reduced ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: sx, y: sy, width: WIDTH, "--accent": project?.accentColor || "#00FF9C" }}
        className="pointer-events-none fixed left-0 top-0 z-40 aspect-[16/10] overflow-hidden border border-line-strong bg-ink/5 shadow-[0_0_40px_-12px_var(--accent)]"
      >
        {src && <Image src={src} alt="" fill sizes={`${WIDTH}px`} className="object-cover" />}
      </motion.div>
    </div>
  )
}
