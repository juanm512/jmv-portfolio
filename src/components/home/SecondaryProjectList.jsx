"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { SecondaryProjectRow } from "@/components/home/ProjectList"
import { coverSrc } from "@/components/home/FeaturedProjectRow"
import { usePopoverMode, useReducedMotionMQ } from "@/lib/useFinePointer"
import { useSpringXY } from "@/lib/useSpringXY"

const WIDTH = 220
const OFFSET = { x: 24, y: 18 }
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

// Secondary rows: on a fine pointer the cover floats and follows the cursor
// with a spring; on coarse pointers there is no cover at all (one-line rows,
// nothing to reveal). Only one cover element exists, keyed by the hovered slug.
export default function SecondaryProjectList({ projects }) {
  const mode = usePopoverMode()
  const reduced = useReducedMotionMQ()
  const [hovered, setHovered] = useState(null)
  const listRef = useRef(null)
  const coverRef = useRef(null)

  // Reduced motion: an almost critically-damped, very stiff spring (snaps).
  const spring = useSpringXY(
    coverRef,
    reduced ? { stiffness: 1000, damping: 100, mass: 1 } : { stiffness: 260, damping: 28, mass: 0.6 }
  )

  const target = (e) => {
    const h = (WIDTH * 10) / 16
    return [
      Math.min(e.clientX + OFFSET.x, window.innerWidth - WIDTH - 8),
      Math.min(e.clientY + OFFSET.y, window.innerHeight - h - 8)
    ]
  }
  const move = (e) => spring.set(...target(e))

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
            // Entering a row lands the cover in place; movement inside is sprung.
            spring.jump(...target(e))
            setHovered(p.slug)
          }}
        >
          <SecondaryProjectRow project={p} />
        </div>
      ))}
      {/* Position comes from the spring (transform); opacity/scale from CSS. */}
      <div
        ref={coverRef}
        aria-hidden="true"
        style={{
          width: WIDTH,
          "--accent": project?.accentColor || "#00FF9C",
          opacity: active ? 1 : 0,
          scale: active ? "1" : "0.96",
          transition: `opacity ${reduced ? 0 : 180}ms ${EASE}, scale ${reduced ? 0 : 180}ms ${EASE}`
        }}
        className="pointer-events-none fixed left-0 top-0 z-40 aspect-[16/10] overflow-hidden border border-line-strong bg-ink/5 shadow-[0_0_40px_-12px_var(--accent)]"
      >
        {src && <Image src={src} alt="" fill sizes={`${WIDTH}px`} className="object-cover" />}
      </div>
    </div>
  )
}
