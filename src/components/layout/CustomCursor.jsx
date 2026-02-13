"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CustomCursor() {
  const cursorRef = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef(null)

  // Smooth cursor with lerp
  const targetRef = useRef({ x: -100, y: -100 })

  const animate = useCallback(() => {
    const lerp = 0.75
    cursorRef.current.x += (targetRef.current.x - cursorRef.current.x) * lerp
    cursorRef.current.y += (targetRef.current.y - cursorRef.current.y) * lerp
    setPos({ x: cursorRef.current.x, y: cursorRef.current.y })
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    // Only enable on non-touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    setIsVisible(true)

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseEnter = (e) => {
      const target = e.target.closest("[data-cursor]")
      if (target) {
        setIsHovering(true)
        setHoverText(target.getAttribute("data-cursor") || "")
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target.closest("[data-cursor]")
      if (target) {
        setIsHovering(false)
        setHoverText("")
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseEnter)
    document.addEventListener("mouseout", handleMouseLeave)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseEnter)
      document.removeEventListener("mouseout", handleMouseLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  if (!isVisible) return null

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Dot cursor */}
      <div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
        }}
      >
        <div
          className="w-2 h-2 rounded-full bg-white transition-transform duration-200"
          style={{
            transform: isHovering ? "scale(0)" : "scale(1)",
          }}
        />
      </div>

      {/* Ring cursor */}
      <div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <div
          className="flex items-center justify-center rounded-full border transition-all duration-300 ease-out"
          style={{
            width: isHovering ? 80 : 32,
            height: isHovering ? 80 : 32,
            marginLeft: isHovering ? -40 : -16,
            marginTop: isHovering ? -40 : -16,
            borderColor: isHovering ? "rgba(0,255,156,0.6)" : "rgba(255,255,255,0.3)",
            backgroundColor: isHovering ? "rgba(0,255,156,0.1)" : "transparent",
            backdropFilter: isHovering ? "blur(4px)" : "none",
          }}
        >
          <AnimatePresence>
            {isHovering && hoverText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-[10px] font-mono text-green-glow uppercase tracking-wider whitespace-nowrap"
              >
                {hoverText}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
