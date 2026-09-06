"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import FeaturedProjectRow from "./FeaturedProjectRow"
import { usePopoverMode, useReducedMotionMQ } from "@/lib/useFinePointer"

/*
 * FeaturedProjectList — the featured rows, one active at a time.
 * Desktop (fine pointer, >= md): hover or :focus-visible activates a row.
 * Mobile / coarse: the row crossing the viewport middle band (ioRootMargin)
 * is active; none when no row is in the band. Spacers (`md:hidden`, in vh)
 * give the band room to sit above the first row on load and to reach the
 * last one at the end of the list.
 *
 * Tunables: ioRootMargin, topSpace / bottomSpace (Tailwind height classes),
 * and FeaturedProjectRow's trackPx / durationMs / restLines via rowProps.
 */
export default function FeaturedProjectList({
  projects,
  label,
  ioRootMargin = "-45% 0px -45% 0px",
  topSpace = "h-[16vh]",
  bottomSpace = "h-[12vh]",
  ...rowProps
}) {
  const mode = usePopoverMode()
  const reduced = useReducedMotionMQ()
  const isMobile = mode === "mobile"
  const [active, setActive] = useState(null)
  const rowRefs = useRef({})
  const leave = useCallback(() => setActive(null), [])

  // Switching mode drops the current activation (state adjusted during render).
  const [prevMobile, setPrevMobile] = useState(isMobile)
  if (prevMobile !== isMobile) {
    setPrevMobile(isMobile)
    setActive(null)
  }

  useEffect(() => {
    if (!isMobile) return
    const io = new IntersectionObserver(
      (entries) => {
        // A row entering the band wins; otherwise the leaving row deactivates.
        const entered = entries.find((e) => e.isIntersecting)
        if (entered) setActive(entered.target.dataset.slug)
        else setActive((cur) => (entries.some((e) => e.target.dataset.slug === cur) ? null : cur))
      },
      { rootMargin: ioRootMargin, threshold: 0 }
    )
    Object.values(rowRefs.current).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [isMobile, ioRootMargin, projects])

  const handlers = (slug) =>
    isMobile
      ? {}
      : {
          onPointerEnter: (e) => {
            if (e.pointerType === "mouse" || e.pointerType === "pen") setActive(slug)
          },
          onPointerLeave: leave,
          onFocus: (e) => {
            if (e.currentTarget.matches(":focus-visible")) setActive(slug)
          },
          onBlur: leave,
        }

  return (
    <>
      <div aria-hidden="true" className={`md:hidden ${topSpace}`} />
      <section aria-label={label} className="border-t border-line">
        {projects.map((p) => (
          <FeaturedProjectRow
            key={p.slug}
            ref={(el) => {
              rowRefs.current[p.slug] = el
            }}
            project={p}
            active={active === p.slug}
            mobile={isMobile}
            reduced={reduced}
            {...rowProps}
            {...handlers(p.slug)}
          />
        ))}
      </section>
      <div aria-hidden="true" className={`md:hidden ${bottomSpace}`} />
    </>
  )
}
