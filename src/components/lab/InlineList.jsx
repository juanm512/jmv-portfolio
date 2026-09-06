"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import InlineRow from "./InlineRow"
import { usePopoverMode, useReducedMotionMQ } from "@/lib/useFinePointer"

/*
 * InlineList — the featured rows, one active at a time.
 * Desktop (fine pointer, >= md): hover or :focus-visible activates a row.
 * Mobile / coarse: the row crossing the viewport middle (ioRootMargin) is
 * active. The cover always appears inline, per `variant`.
 */
export default function InlineList({
  projects,
  label,
  variant,
  ioRootMargin = "-45% 0px -45% 0px",
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
        for (const e of entries) if (e.isIntersecting) setActive(e.target.dataset.slug)
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
    <section aria-label={label} className="border-t border-line">
      {projects.map((p) => (
        <InlineRow
          key={p.slug}
          ref={(el) => {
            rowRefs.current[p.slug] = el
          }}
          project={p}
          variant={variant}
          active={active === p.slug}
          reduced={reduced}
          {...rowProps}
          {...handlers(p.slug)}
        />
      ))}
    </section>
  )
}
