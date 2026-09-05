"use client"

import { useState, useEffect, useCallback } from "react"

// Keeps `true` for `ms` after `on` turns false so the disperse animation can
// play before the popover unmounts.
export function useLinger(on, ms) {
  const [linger, setLinger] = useState(false)
  useEffect(() => {
    if (on) return
    const t = setTimeout(() => setLinger(false), ms)
    return () => clearTimeout(t)
  }, [on, ms])
  const [prevOn, setPrevOn] = useState(on)
  if (prevOn !== on) {
    setPrevOn(on)
    if (!on) setLinger(true)
  }
  return on || linger
}

/*
 * useProjectHover — single source of truth for "which featured row is active".
 *   hovered: slug | null (drives `assembled`)
 *   shown:   last active project (kept during the exit animation)
 *   enter(project) / leave()
 */
export function useProjectHover() {
  const [hovered, setHovered] = useState(null)
  const [shown, setShown] = useState(null)
  const enter = useCallback((p) => {
    setHovered(p.slug)
    setShown(p)
  }, [])
  const leave = useCallback(() => setHovered(null), [])
  return { hovered, shown, enter, leave }
}

// Mobile: the row crossing the vertical middle of the viewport becomes active.
export function useMiddleRowObserver(enabled, rowRefs, projects, enter, rootMargin = "-45% 0px -45% 0px") {
  useEffect(() => {
    if (!enabled) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const p = projects.find((x) => x.slug === e.target.dataset.slug)
          if (p) enter(p)
        }
      },
      { rootMargin, threshold: 0 }
    )
    Object.values(rowRefs.current).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [enabled, rowRefs, projects, enter, rootMargin])
}
