"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import ParticleCover from "./ParticleCover"
import Balloons from "./Balloons"

// Optimized (downscaled) source for the canvas sampling, served by next/image.
export function canvasSrc(src, w = 640) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=70`
}

/*
 * ProjectPopover — the floating card: particle canvas that assembles the cover,
 * sharp <Image> crossfaded on top once settled, and stack balloons.
 *
 * Tunables: width (px), aspect (w/h), crossfadeMs, plus everything ParticleCover
 * and Balloons accept (forwarded via particleProps / balloonProps).
 */
export default function ProjectPopover({
  project,
  assembled,
  active = true,
  width = 340,
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

  // Any change of project or of the assembled flag hides the sharp image
  // immediately (state adjusted during render, per React docs).
  if (prev.slug !== project?.slug || prev.assembled !== assembled) {
    setPrev({ slug: project?.slug, assembled })
    setSettled(false)
  }

  const onSettled = useCallback((isAssembled) => {
    setSettled(isAssembled)
  }, [])

  if (!project) return null
  const showSharp = assembled && settled

  return (
    <div
      className={`relative rounded-xl border border-white/10 bg-background-darker/90 shadow-2xl ${className}`}
      style={{ width, "--accent": project.accent, ...style }}
    >
      <div
        className="relative overflow-hidden rounded-t-xl"
        style={{ width, height }}
      >
        <ParticleCover
          key={project.slug}
          src={project.image ? canvasSrc(project.image) : null}
          width={width}
          height={height}
          assembled={assembled}
          active={active}
          onSettled={onSettled}
          {...particleProps}
        />
        {project.image && (
          <Image
            src={project.image}
            alt=""
            fill
            sizes={`${width}px`}
            className="object-cover pointer-events-none"
            style={{
              opacity: showSharp ? 1 : 0,
              transition: `opacity ${crossfadeMs}ms ease`,
            }}
          />
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: "inset 0 0 40px 0 color-mix(in srgb, var(--accent) 22%, transparent)",
          }}
        />
      </div>
      <div className="flex items-baseline justify-between gap-3 px-3.5 py-2.5">
        <span className="text-sm font-semibold text-white/90">{project.title}</span>
        <span className="font-mono text-[11px] text-white/40">{project.year}</span>
      </div>
      <Balloons
        stack={project.stack}
        accent={project.accent}
        visible={assembled}
        {...balloonProps}
      />
    </div>
  )
}
