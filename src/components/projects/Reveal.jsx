"use client"

import { useEffect, useRef } from "react"

// Scroll-in reveal for the narrative blocks: sets `data-in` the first time
// the block enters the viewport; the transition lives in globals.css
// ([data-reveal="view"]), which also handles prefers-reduced-motion.
export default function Reveal({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-in", "")
          io.disconnect()
        }
      },
      { rootMargin: "-10% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} data-reveal="view">
      {children}
    </div>
  )
}
