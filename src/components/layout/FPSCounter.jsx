"use client"

import { useEffect, useRef, useState } from "react"

export default function FPSCounter() {
  const [fps, setFps] = useState(0)
  const framesRef = useRef(0)
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    let rafId

    function tick(now) {
      framesRef.current++
      if (now - lastTimeRef.current >= 500) {
        setFps(
          Math.round(
            (framesRef.current * 1000) / (now - lastTimeRef.current)
          )
        )
        framesRef.current = 0
        lastTimeRef.current = now
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        left: 8,
        zIndex: 9999,
        background: "rgba(0,0,0,0.6)",
        color: fps >= 50 ? "#0f6" : fps >= 30 ? "#ff0" : "#f33",
        padding: "4px 10px",
        borderRadius: 6,
        fontFamily: "monospace",
        fontSize: 12,
        pointerEvents: "none",
        backdropFilter: "blur(4px)",
      }}
    >
      {fps} FPS
    </div>
  )
}
