"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import Arrow from "@/components/ui/Arrow"

/*
 * InlineRow — FeaturedProjectRow markup with the cover inline in the row.
 * ONE parameter differs between variants: how the cover enters and what the
 * text does. Row height never changes: at rest a ResizeObserver locks it as
 * `min-height`, and title/description clamp so nothing wraps to a new line.
 *
 * Tunables (props): trackDesktop / trackMobile (px, push & compress),
 * curtainWidth (CSS width, curtain desktop), durationMs, restLines / openLines
 * (description clamp).
 */
export const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

const focus =
  "outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark rounded-none"

const CLAMP = { 1: "line-clamp-1", 2: "line-clamp-2", 3: "line-clamp-3" }

export function coverSrc(project) {
  const h = project?.hero
  if (!h) return null
  return h.type === "video" ? h.poster : h.src
}

function Year({ year }) {
  return (
    <span className="font-mono text-xs text-ink-3 tabular-nums self-baseline pt-1 sm:pt-0">{year}</span>
  )
}

function RowArrow({ className = "" }) {
  return (
    <span
      className={`text-ink-3 group-hover:text-[var(--accent)] transition-[color,transform] duration-200 ease-out-expo translate-x-0 group-hover:translate-x-0.5 motion-reduce:transform-none ${className}`}
    >
      <Arrow />
    </span>
  )
}

// Title + description + static mono stack line. `lines` clamps the description.
function Body({ project, lines, titleClass = "" }) {
  const t = useTranslations("Project")
  return (
    <div className="min-w-0">
      <h2
        className={`text-xl md:text-2xl font-semibold text-ink leading-[1.25] group-hover:text-[var(--accent)] transition-colors duration-200 ${titleClass}`}
      >
        {project.title}
        {project.tagline && (
          <span className="block sm:inline sm:ml-3 text-base md:text-lg font-normal text-ink-2 sm:before:content-['·'] sm:before:mr-3 sm:before:text-ink-3">
            {project.tagline}
          </span>
        )}
      </h2>
      <p className={`mt-2 text-ink-2 text-sm md:text-base max-w-[60ch] leading-[1.6] ${CLAMP[lines] || ""}`}>
        {project.description}
      </p>
      {project.stack?.length > 0 && (
        <p className="hidden sm:block mt-3 font-mono text-xs text-ink-3 truncate">
          <span className="sr-only">{t("stack")}: </span>
          {project.stack.join(" · ")}
        </p>
      )}
    </div>
  )
}

// The cover: next/image, object-cover, 1px strong hairline, no radius.
function Cover({ project, sizes, className = "" }) {
  const src = coverSrc(project)
  if (!src) return null
  return (
    <div className={`relative overflow-hidden border border-line-strong bg-ink/5 ${className}`}>
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
    </div>
  )
}

// Locks the resting height: measured only while inactive, so a viewport
// change re-locks but the open state can never grow the row.
function useRestHeight(ref, active) {
  const [h, setH] = useState(null)
  useEffect(() => {
    if (active || !ref.current) return
    const el = ref.current
    const measure = () => setH(Math.round(el.getBoundingClientRect().height))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, active])
  return h
}

export default function InlineRow({
  project,
  variant = "push",
  active = false,
  reduced = false,
  trackDesktop = 220,
  trackMobile = 96,
  curtainWidth = "45%",
  durationMs = 420,
  restLines = 2,
  openLines = 1,
  ref,
  ...rest
}) {
  const inner = useRef(null)
  const setRefs = (el) => {
    inner.current = el
    if (typeof ref === "function") ref(el)
    else if (ref) ref.current = el
  }
  const restH = useRestHeight(inner, active)

  const dur = reduced ? 0 : durationMs
  const transition = { duration: (reduced ? 200 : durationMs) / 1000, ease: [0.16, 1, 0.3, 1] }
  const base = `group relative overflow-hidden border-b border-line hover:border-line-strong px-4 sm:px-5 sm:-mx-5 py-6 ${focus}`
  const vars = {
    "--accent": project.accentColor || "#00FF9C",
    "--open": active ? 1 : 0,
    "--track-d": `${trackDesktop}px`,
    "--track-m": `${trackMobile}px`,
    minHeight: restH ?? undefined,
    transitionTimingFunction: EASE,
    transitionDuration: `${dur}ms`,
  }
  const common = {
    ref: setRefs,
    href: `/projects/${project.slug}`,
    id: `project-${project.slug}`,
    "data-project-row": true,
    "data-slug": project.slug,
    "data-active": active ? "true" : "false",
    ...rest,
  }
  const trackSizes = `(min-width: 640px) ${trackDesktop}px, ${trackMobile}px`

  // 1 · Empuje: a leading track grows and shoves year + text to the right.
  // The text column keeps its width (calc from the row), so nothing reflows;
  // whatever leaves the row is clipped. Arrow stays pinned at the right.
  if (variant === "push") {
    return (
      <Link
        {...common}
        style={{
          ...vars,
          gridTemplateColumns:
            "calc(var(--open) * var(--track)) var(--year) calc(100% - var(--year) - 2.5rem)",
        }}
        className={`${base} grid items-baseline [--year:4rem] sm:[--year:5rem] [--track:var(--track-m)] sm:[--track:var(--track-d)] transition-[grid-template-columns,border-color]`}
      >
        <div className="relative self-stretch overflow-hidden">
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={transition}
            className="absolute inset-y-0 left-0 w-[calc(var(--track)-0.75rem)] sm:w-[calc(var(--track)-1rem)]"
          >
            <Cover project={project} sizes={trackSizes} className="h-full" />
          </motion.div>
        </div>
        <Year year={project.year} />
        <Body project={project} lines={restLines} titleClass="truncate" />
        <RowArrow className="absolute right-4 sm:right-5 top-6 mt-1.5" />
      </Link>
    )
  }

  // 4 · Empuje desde la derecha: the cover slides in at the right edge (before
  // the arrow) and shoves year + text to the left by the same distance. Text
  // width never changes, so nothing reflows; what leaves the row is clipped.
  if (variant === "push-right") {
    return (
      <Link {...common} style={vars} className={`${base} block [--track:var(--track-m)] sm:[--track:var(--track-d)]`}>
        <div
          style={{
            transform: "translateX(calc(-1 * var(--open) * var(--track)))",
            gridTemplateColumns: "var(--year) calc(100% - var(--year) - 2.5rem)",
          }}
          className="grid items-baseline [--year:3.25rem] sm:[--year:4rem] transition-transform"
        >
          <Year year={project.year} />
          <Body project={project} lines={restLines} titleClass="truncate" />
        </div>
        <div className="absolute inset-y-6 right-12 sm:right-14 w-[calc(var(--track)-0.75rem)] sm:w-[calc(var(--track)-1rem)] overflow-hidden pointer-events-none">
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0, x: active ? "0%" : "100%" }}
            transition={transition}
            className="absolute inset-0"
          >
            <Cover project={project} sizes={trackSizes} className="h-full" />
          </motion.div>
        </div>
        <RowArrow className="absolute right-4 sm:right-5 top-6 mt-1.5" />
      </Link>
    )
  }

  // 2 · Compresión: year and text keep their left edge; a track opens between
  // text and arrow, and the text column shrinks (description reflows to fewer
  // clamped lines). Height locked, nothing else moves.
  if (variant === "compress") {
    return (
      <Link
        {...common}
        style={{
          ...vars,
          gridTemplateColumns: "var(--year) minmax(0,1fr) calc(var(--open) * var(--track)) auto",
        }}
        className={`${base} grid items-baseline gap-x-3 sm:gap-x-4 [--year:3.25rem] sm:[--year:4rem] [--track:var(--track-m)] sm:[--track:var(--track-d)] transition-[grid-template-columns,border-color]`}
      >
        <Year year={project.year} />
        <Body project={project} lines={active ? openLines : restLines} titleClass="truncate" />
        <div className="relative self-stretch overflow-hidden">
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={transition}
            className="absolute inset-y-0 right-0 w-[var(--track)]"
          >
            <Cover project={project} sizes={trackSizes} className="h-full" />
          </motion.div>
        </div>
        <RowArrow />
      </Link>
    )
  }

  // 3 · Cortina: the cover slides in behind the text, clipped from the left,
  // with a left→right wash of background-dark so the text stays legible.
  // Content does not move at all.
  const curtainSizes = `(min-width: 768px) ${curtainWidth.endsWith("%") ? curtainWidth.replace("%", "vw") : curtainWidth}, 100vw`
  return (
    <Link
      {...common}
      style={vars}
      className={`${base} grid grid-cols-[3.25rem_minmax(0,1fr)_auto] sm:grid-cols-[4rem_minmax(0,1fr)_auto] items-baseline gap-x-3 sm:gap-x-4 transition-colors`}
    >
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={transition}
        style={{
          clipPath: active ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path ${dur}ms ${EASE}`,
          "--curtain": curtainWidth,
        }}
        className="absolute inset-y-0 left-0 w-full md:w-[var(--curtain)]"
      >
        <div className="absolute inset-0 opacity-40 md:opacity-100">
          <Cover project={project} sizes={curtainSizes} className="h-full border-y-0 border-l-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark/35 via-background-dark/75 to-background-dark" />
        </div>
      </motion.div>
      <span className="relative self-baseline">
        <Year year={project.year} />
      </span>
      <div className="relative min-w-0">
        <Body project={project} lines={restLines} titleClass="truncate" />
      </div>
      <RowArrow className="relative" />
    </Link>
  )
}
