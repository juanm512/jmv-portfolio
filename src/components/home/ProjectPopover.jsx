"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import ParticleCover from "./ParticleCover"
import Balloons from "./Balloons"

// Downscaled source for the canvas sampling, served by next/image.
export function canvasSrc(src, w = 640) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=60`
}

/*
 * ProjectPopover — the project cover beside a featured row: a particle canvas
 * assembles the image, the sharp <Image> crossfades on top once settled, and
 * the stack chips float out. Plain image, 1px hairline, low-alpha accent glow;
 * no card, no side stripe.
 *
 * Props:
 *   project     — { slug, hero: { src }, stack, accentColor }
 *   assembled   — true while the row is hovered/focused; false disperses
 *   active      — pauses the rAF loop when false (default true)
 *   reduced     — reduced motion: no particles, no balloons, image just fades
 *   width       — px (default 300); aspect (w/h, default 16/10)
 *   crossfadeMs — sharp image fade (default 260)
 *   particleProps / balloonProps — forwarded to ParticleCover / Balloons
 */
export default function ProjectPopover({
  project,
  assembled,
  active = true,
  reduced = false,
  width = 300,
  aspect = 16 / 10,
  crossfadeMs = 260,
  particleProps,
  balloonProps,
  className = "",
  style,
}) {
  const height = Math.round(width / aspect)
  const [settled, setSettled] = useState(false)
  const [prev, setPrev] = useState({ slug: project?.slug, assembled })

  // A change of project or of `assembled` hides the sharp image immediately
  // (state adjusted during render, per React docs).
  if (prev.slug !== project?.slug || prev.assembled !== assembled) {
    setPrev({ slug: project?.slug, assembled })
    setSettled(false)
  }

  const onSettled = useCallback((isAssembled) => setSettled(isAssembled), [])

  if (!project) return null
  const src = project.hero?.src || null
  const showSharp = assembled && (reduced || settled || !src)

  return (
    <div
      className={`relative ${className}`}
      style={{ width, "--accent": project.accentColor || "#00FF9C", ...style }}
    >
      <div
        className="relative overflow-hidden rounded-sm border border-line-strong bg-background-darker"
        style={{ width, height }}
      >
        {src && !reduced && (
          <ParticleCover
            key={project.slug}
            src={canvasSrc(src)}
            width={width - 2}
            height={height - 2}
            assembled={assembled}
            active={active}
            onSettled={onSettled}
            {...particleProps}
          />
        )}
        {src && (
          <Image
            src={src}
            alt=""
            fill
            sizes={`${width}px`}
            className="pointer-events-none object-cover"
            style={{ opacity: showSharp ? 1 : 0, transition: `opacity ${crossfadeMs}ms ease` }}
          />
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 32px 0 color-mix(in srgb, var(--accent) 14%, transparent)" }}
        />
      </div>
      {!reduced && (
        <Balloons stack={project.stack} visible={assembled} spread={width - 24} {...balloonProps} />
      )}
    </div>
  )
}
