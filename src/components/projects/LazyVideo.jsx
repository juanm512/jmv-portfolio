"use client"

import { useEffect, useRef } from "react"

// Only loads/plays once scrolled near the viewport, pauses when it leaves,
// so every project video does not autoplay at once on page load.
export default function LazyVideo({ src, poster, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: "200px 0px" }
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  )
}
