"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react"
import { FeaturedProjectRow } from "./ProjectList"
import ProjectPopover from "./ProjectPopover"
import { useLinger, useProjectHover, useMiddleRowObserver } from "./useProjectHover"
import { usePopoverMode, useReducedMotionMQ } from "@/lib/useFinePointer"

/*
 * FeaturedProjectList — the featured rows plus ONE popover instance.
 *
 * Desktop (fine pointer, >= md): hover or :focus-visible on a row anchors the
 * popover to the right of that row, vertically centred, flipping to the left
 * when there is no room (clamped to the viewport when neither side fits).
 * Mobile / coarse: the row crossing the middle of the viewport shows the
 * popover inline below itself (in flow). Reduced motion: no particles or
 * balloons, the image just fades.
 *
 * Tunables: popoverWidth (px), gap (px, desktop), lingerMs (exit time),
 * ioRootMargin (mobile activation band).
 */
export default function FeaturedProjectList({
  projects,
  label,
  popoverWidth = 300,
  gap = 24,
  lingerMs = 420,
  ioRootMargin = "-45% 0px -45% 0px",
}) {
  const mode = usePopoverMode()
  const reduced = useReducedMotionMQ()
  const isMobile = mode === "mobile"
  const { hovered, shown, enter, leave } = useProjectHover()
  const rowRefs = useRef({})
  const open = !!hovered
  const mounted = useLinger(open, reduced ? 0 : lingerMs)

  useMiddleRowObserver(isMobile, rowRefs, projects, enter, ioRootMargin)

  // Switching to mobile drops any hover state; switching to desktop drops the
  // observer-driven one.
  useEffect(() => {
    leave()
  }, [isMobile, leave])

  const rowProps = (p) =>
    isMobile
      ? {}
      : {
          onPointerEnter: (e) => {
            if (e.pointerType === "mouse" || e.pointerType === "pen") enter(p)
          },
          onPointerLeave: leave,
          onFocus: (e) => {
            if (e.currentTarget.matches(":focus-visible")) enter(p)
          },
          onBlur: leave,
        }

  return (
    <section aria-label={label} className="relative border-t border-line">
      {projects.map((p) => (
        <div
          key={p.slug}
          className="sm:-mx-5 sm:px-5 border-b border-line has-[a:hover]:border-line-strong transition-colors"
        >
          <FeaturedProjectRow
            ref={(el) => {
              rowRefs.current[p.slug] = el
            }}
            project={p}
            line={false}
            {...rowProps(p)}
          />
          {isMobile && (
            <AnimatePresence initial={false}>
              {hovered === p.slug && (
                <motion.div
                  key="inline"
                  initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pt-1">
                    <ProjectPopover
                      project={p}
                      assembled
                      reduced={reduced}
                      width={Math.min(popoverWidth, 320)}
                      className="mx-auto"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ))}
      {!isMobile && (
        <AnchoredPopover
          rowRefs={rowRefs}
          shown={shown}
          hovered={hovered}
          open={open}
          mounted={mounted}
          reduced={reduced}
          width={popoverWidth}
          gap={gap}
        />
      )}
    </section>
  )
}

// Anchored to the right of the hovered row; flips to the left when it does not
// fit, and is clamped inside the viewport when neither side does.
function AnchoredPopover({ rowRefs, shown, hovered, open, mounted, reduced, width, gap }) {
  const popH = Math.round(width / 1.6)
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
    const c = row?.parentElement?.parentElement
    if (!row || !c) return
    const r = row.getBoundingClientRect()
    const cr = c.getBoundingClientRect()
    const vw = window.innerWidth
    const t = r.top - cr.top + r.height / 2 - popH / 2
    let l
    if (r.right + gap + width <= vw - 16) l = r.right + gap
    else if (r.left - gap - width >= 16) l = r.left - gap - width
    else l = vw - 16 - width
    l -= cr.left
    if (!wasOpenRef.current || reduced) {
      // first row of a hover session: appear in place, no slide
      top.jump(t)
      left.jump(l)
      wasOpenRef.current = true
    }
    topMV.set(t)
    leftMV.set(l)
  }, [hovered, rowRefs, width, gap, popH, reduced, top, left, topMV, leftMV])

  return (
    <AnimatePresence>
      {shown && mounted && (
        <motion.div
          key="anchored"
          className="pointer-events-none absolute z-20 hidden md:block"
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: -12, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: reduced ? 1 : 0.96, transition: { duration: 0.15 } }}
          transition={reduced ? { duration: 0.15 } : { type: "spring", stiffness: 300, damping: 26 }}
          style={{ top, left }}
        >
          <ProjectPopover project={shown} assembled={open} reduced={reduced} width={width} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
