"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import Arrow from "@/components/ui/Arrow"

/*
 * FeaturedProjectRow — a featured row with its cover inline.
 *
 * Desktop (md and up): "push". When active, a leading track (`trackPx`)
 * opens on the left and shoves year + text to the right. The text column
 * keeps its width (calc from the row) so nothing reflows; what leaves the
 * row is clipped. The resting height is locked as `min-height`.
 * Mobile (below md): the cover appears BELOW the text, in flow, growing the
 * row (grid-template-rows 0fr -> 1fr + opacity). Nothing moves sideways.
 *
 * Tunables: trackPx (desktop track width), durationMs, restLines
 * (description clamp, desktop only).
 */
export const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

const focus =
  "outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark rounded-none"

const CLAMP = { 1: "md:line-clamp-1", 2: "md:line-clamp-2", 3: "md:line-clamp-3" }

export function coverSrc(project) {
  const h = project?.hero
  if (!h) return null
  return h.type === "video" ? h.poster : h.src
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

// Locks the resting height (desktop): measured only while inactive, so a
// viewport change re-locks but the open state can never grow the row.
function useRestHeight(ref, enabled) {
  const [h, setH] = useState(null)
  useEffect(() => {
    if (!enabled || !ref.current) return
    const el = ref.current
    const measure = () => setH(Math.round(el.getBoundingClientRect().height))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, enabled])
  return h
}

export default function FeaturedProjectRow({
  project,
  active = false,
  mobile = false,
  reduced = false,
  trackPx = 220,
  durationMs = 420,
  restLines = 2,
  ref,
  ...rest
}) {
  const t = useTranslations("Project")
  const inner = useRef(null)
  const setRefs = (el) => {
    inner.current = el
    if (typeof ref === "function") ref(el)
    else if (ref) ref.current = el
  }
  // On mobile the row must be free to grow, so the lock is desktop-only.
  const restH = useRestHeight(inner, !mobile && !active)
  const dur = reduced ? 0 : durationMs
  const fade = { opacity: active ? 1 : 0, transitionDuration: `${dur}ms`, transitionTimingFunction: EASE }
  const hasCover = !!coverSrc(project)

  return (
    <Link
      ref={setRefs}
      href={`/projects/${project.slug}`}
      id={`project-${project.slug}`}
      data-project-row
      data-slug={project.slug}
      data-active={active ? "true" : "false"}
      style={{
        "--accent": project.accentColor || "#00FF9C",
        "--open": active ? 1 : 0,
        "--track-d": `${trackPx}px`,
        minHeight: mobile ? undefined : (restH ?? undefined),
        transitionTimingFunction: EASE,
        transitionDuration: `${dur}ms`,
        gridTemplateColumns:
          "calc(var(--open) * var(--track)) var(--year) calc(100% - var(--year) - 2.5rem)",
      }}
      className={`group relative overflow-hidden grid items-baseline border-b border-line hover:border-line-strong px-4 sm:px-5 sm:-mx-5 py-6 [--year:4rem] sm:[--year:5rem] [--track:0px] md:[--track:var(--track-d)] transition-[grid-template-columns,border-color] ${focus}`}
      {...rest}
    >
      {/* Desktop track: the cover fades in as the column opens. */}
      <div className="relative self-stretch overflow-hidden">
        {hasCover && (
          <div
            aria-hidden="true"
            style={fade}
            className="hidden md:block absolute inset-y-0 left-0 w-[calc(var(--track)-1rem)] transition-opacity"
          >
            <Cover project={project} sizes={`${trackPx}px`} className="h-full" />
          </div>
        )}
      </div>
      <span className="font-mono text-xs text-ink-3 tabular-nums self-baseline pt-1 sm:pt-0">
        {project.year}
      </span>
      <div className="min-w-0">
        <h2 className="md:truncate text-xl md:text-2xl font-semibold text-ink leading-[1.25] group-hover:text-[var(--accent)] transition-colors duration-200">
          {project.title}
          {project.tagline && (
            <span className="block sm:inline sm:ml-3 text-base md:text-lg font-normal text-ink-2 sm:before:content-['·'] sm:before:mr-3 sm:before:text-ink-3">
              {project.tagline}
            </span>
          )}
        </h2>
        <p className={`mt-2 text-ink-2 text-sm md:text-base max-w-[60ch] leading-[1.6] ${CLAMP[restLines] || ""}`}>
          {project.description}
        </p>
        {project.stack?.length > 0 && (
          <p className="hidden sm:block mt-3 font-mono text-xs text-ink-3 truncate">
            <span className="sr-only">{t("stack")}: </span>
            {project.stack.join(" · ")}
          </p>
        )}
      </div>
      <span className="absolute right-4 sm:right-5 top-6 mt-1.5 text-ink-3 group-hover:text-[var(--accent)] transition-[color,transform] duration-200 ease-out-expo translate-x-0 group-hover:translate-x-0.5 motion-reduce:transform-none">
        <Arrow />
      </span>
      {/* Mobile: the cover below the text, in flow, growing the row. The grid
          columns stop 2.5rem short (arrow space), so the wrapper adds it back. */}
      {hasCover && (
        <div
          aria-hidden="true"
          style={{
            gridTemplateRows: active ? "1fr" : "0fr",
            transitionDuration: `${dur}ms`,
            transitionTimingFunction: EASE,
          }}
          className="col-span-full w-[calc(100%+2.5rem)] md:hidden grid transition-[grid-template-rows]"
        >
          <div style={fade} className="min-h-0 overflow-hidden transition-opacity">
            <Cover project={project} sizes="100vw" className="mt-4 w-full aspect-[16/10]" />
          </div>
        </div>
      )}
    </Link>
  )
}
