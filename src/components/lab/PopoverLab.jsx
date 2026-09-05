"use client"

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react"
import LabRow from "./LabRow"
import ProjectPopover from "./ProjectPopover"

const MOBILE_QUERY = "(max-width: 767px), (pointer: coarse)"

function subscribeMQ(cb) {
  const mq = window.matchMedia(MOBILE_QUERY)
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}
// Keeps `true` for `ms` after `on` turns false, so the disperse animation
// can play before the popover unmounts.
function useLinger(on, ms) {
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

function useIsMobile() {
  return useSyncExternalStore(
    subscribeMQ,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  )
}

/*
 * PopoverLab — the 5 featured rows + the hover popover.
 * variant: 1 fixed side panel | 2 anchored beside row | 3 follows cursor
 *
 * Tunables: popoverWidth, and for variant 3 followSpring { stiffness, damping },
 * cursorOffset. Mobile: ioRootMargin.
 */
export default function PopoverLab({
  projects,
  variant = 1,
  popoverWidth = 340,
  followSpring = { stiffness: 170, damping: 22, mass: 0.6 },
  cursorOffset = 24,
  ioRootMargin = "-45% 0px -45% 0px",
}) {
  const isMobile = useIsMobile()
  const [hovered, setHovered] = useState(null) // slug or null
  const [shown, setShown] = useState(null) // last hovered project (kept during exit)
  const rowRefs = useRef({})

  const enter = useCallback(
    (p) => {
      setHovered(p.slug)
      setShown(p)
    },
    []
  )
  const leave = useCallback(() => setHovered(null), [])
  const open = !!hovered
  const mounted = useLinger(open, 420)

  // ---- Mobile: row crossing the viewport middle becomes active
  useEffect(() => {
    if (!isMobile) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const slug = e.target.dataset.slug
            const p = projects.find((x) => x.slug === slug)
            if (p) {
              setHovered(slug)
              setShown(p)
            }
          }
        }
      },
      { rootMargin: ioRootMargin, threshold: 0 }
    )
    Object.values(rowRefs.current).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [isMobile, projects, ioRootMargin])

  const rowProps = (p) =>
    isMobile
      ? {}
      : {
          onMouseEnter: () => enter(p),
          onMouseLeave: leave,
          onFocus: () => enter(p),
          onBlur: leave,
        }

  const rows = projects.map((p) => (
    <div key={p.slug}>
      <LabRow
        ref={(el) => {
          rowRefs.current[p.slug] = el
        }}
        project={p}
        hideChips
        {...rowProps(p)}
      />
      {isMobile && (
        <AnimatePresence initial={false}>
          {hovered === p.slug && (
            <motion.div
              key="inline"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pb-6 pt-1">
                <ProjectPopover
                  project={p}
                  assembled
                  width={Math.min(popoverWidth, 320)}
                  className="mx-auto"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  ))

  if (isMobile) {
    return <div className="flex flex-col divide-y divide-white/5">{rows}</div>
  }

  if (variant === 1) {
    return (
      <div className="grid grid-cols-[55%_1fr] gap-10">
        <div className="flex flex-col divide-y divide-white/5">{rows}</div>
        <div>
          <div className="sticky top-[22vh]">
            <div className="relative" style={{ width: popoverWidth }}>
              {!shown && (
                <div
                  className="flex items-center justify-center rounded-xl border border-dashed border-white/10 font-mono text-xs text-white/30"
                  style={{ width: popoverWidth, height: Math.round(popoverWidth / 1.6) + 44 }}
                >
                  hover a project
                </div>
              )}
              {shown && (
                <ProjectPopover project={shown} assembled={hovered === shown.slug} width={popoverWidth} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 2) {
    return (
      <AnchoredVariant
        rows={rows}
        rowRefs={rowRefs}
        shown={shown}
        hovered={hovered}
        open={open}
        mounted={mounted}
        popoverWidth={popoverWidth}
      />
    )
  }

  return (
    <FollowVariant
      rows={rows}
      shown={shown}
      open={open}
      mounted={mounted}
      popoverWidth={popoverWidth}
      spring={followSpring}
      offset={cursorOffset}
    />
  )
}

// ---- Variant 2: anchored to the right of the hovered row (flips to the left)
function AnchoredVariant({ rows, rowRefs, shown, hovered, open, mounted, popoverWidth }) {
  const containerRef = useRef(null)
  const gap = 24
  const popH = Math.round(popoverWidth / 1.6) + 44
  const topMV = useMotionValue(0)
  const leftMV = useMotionValue(0)
  const top = useSpring(topMV, { stiffness: 320, damping: 30 })
  const left = useSpring(leftMV, { stiffness: 320, damping: 30 })
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (!mounted) wasOpenRef.current = false
  }, [mounted])

  useEffect(() => {
    if (!hovered) return
    const row = rowRefs.current[hovered]
    const c = containerRef.current
    if (!row || !c) return
    const r = row.getBoundingClientRect()
    const cr = c.getBoundingClientRect()
    const t = r.top - cr.top + r.height / 2 - popH / 2
    const fitsRight = r.right + gap + popoverWidth <= window.innerWidth - 16
    const l = fitsRight ? r.right - cr.left + gap : r.left - cr.left - gap - popoverWidth
    if (!wasOpenRef.current) {
      // first row of a hover session: appear in place, no slide
      top.jump(t)
      left.jump(l)
      wasOpenRef.current = true
    }
    topMV.set(t)
    leftMV.set(l)
  }, [hovered, rowRefs, popoverWidth, popH, top, left, topMV, leftMV])

  return (
    <div ref={containerRef} className="relative">
      <div className="flex max-w-xl flex-col divide-y divide-white/5">{rows}</div>
      <AnimatePresence>
        {shown && mounted && (
          <motion.div
            key="anchored"
            className="pointer-events-none absolute z-20"
            initial={{ opacity: 0, x: -12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={{ top, left }}
          >
            <ProjectPopover project={shown} assembled={open} width={popoverWidth} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---- Variant 3: follows the cursor with spring lag, clamped to the viewport
function FollowVariant({ rows, shown, open, mounted, popoverWidth, spring, offset }) {
  const popH = Math.round(popoverWidth / 1.6) + 44
  const mx = useMotionValue(-1000)
  const my = useMotionValue(-1000)
  const x = useSpring(mx, spring)
  const y = useSpring(my, spring)
  const firstRef = useRef(true)

  useEffect(() => {
    const onMove = (e) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      // Prefer bottom-right of the pointer; flip so it never covers it.
      let tx = e.clientX + offset
      if (tx + popoverWidth > vw - 12) tx = e.clientX - offset - popoverWidth
      let ty = e.clientY + offset
      if (ty + popH > vh - 12) ty = e.clientY - offset - popH
      tx = Math.max(12, Math.min(tx, vw - popoverWidth - 12))
      ty = Math.max(12, Math.min(ty, vh - popH - 12))
      if (firstRef.current) {
        // jump on the first move so the panel doesn't fly in from off-screen
        x.jump(tx)
        y.jump(ty)
        firstRef.current = false
      }
      mx.set(tx)
      my.set(ty)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [mx, my, x, y, offset, popoverWidth, popH])

  return (
    <div className="relative">
      <div className="flex max-w-2xl flex-col divide-y divide-white/5">{rows}</div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-30"
        style={{ x, y }}
      >
        <AnimatePresence>
          {shown && mounted && (
            <motion.div
              key="follow"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2 }}
            >
              <ProjectPopover project={shown} assembled={open} width={popoverWidth} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
