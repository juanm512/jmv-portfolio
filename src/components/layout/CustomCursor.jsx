"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CustomCursor() {
  const cursorRef = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState({ x: -100, y: -100 })
  /* eslint-disable @next/next/no-img-element */
  const [cursorType, setCursorType] = useState("text") // "text" | "image"
  const [cursorImage, setCursorImage] = useState("")
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
        
        const type = target.getAttribute("data-cursor-type") || "text"
        setCursorType(type)
        
        if (type === "image") {
          setCursorImage(target.getAttribute("data-cursor-image") || "")
        }
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target.closest("[data-cursor]")
      if (target) {
        setIsHovering(false)
        setHoverText("")
        setCursorType("text")
        setCursorImage("")
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

  // Size calculation
  let size = 32
  if (isHovering) {
    if (cursorType === "image") size = 120 // Larger for images
    else size = 80 // Normal hover
  }

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
          opacity: cursorType === "image" ? 0 : 1 // Hide dot when showing image
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
          className="flex items-center justify-center rounded-full border transition-all duration-300 ease-out overflow-hidden"
          style={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            borderColor: isHovering ? "rgba(0,255,156,0.6)" : "rgba(255,255,255,0.3)",
            backgroundColor: cursorType === "image" ? "rgba(0,0,0,0.8)" : (isHovering ? "rgba(0,255,156,0.1)" : "transparent"),
            backdropFilter: isHovering ? "blur(4px)" : "none",
          }}
        >
          <AnimatePresence mode="wait">
            {isHovering && (
              cursorType === "image" && cursorImage ? (
                <motion.img
                  key="cursor-image"
                  src={cursorImage}
                  alt="cursor"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-1/2 h-1/2 object-contain"
                />
              ) : hoverText ? (
                <motion.span
                  key="cursor-text"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="text-[10px] font-mono text-green-glow uppercase tracking-wider whitespace-nowrap"
                >
                  {hoverText}
                </motion.span>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
