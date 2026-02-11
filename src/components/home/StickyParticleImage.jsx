"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import ParticleImage from "./ParticleImage"

// Componente que mantiene la imagen centrada y fija mientras se hace zoom
export default function StickyParticleImage({
  src,
  className = "",
  particleSize = 30,
  zoomRange = [1, 4],
  onImageLoad,
  children // Para el texto que va encima
}) {
  const containerRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Opacidad del contenido overlay
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, 50])

  return (
    <div
      ref={containerRef}
      className={`relative h-[200vh] ${className}`}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Particle Image with zoom */}
        <ParticleImage
          src={src}
          alt="Particle composition"
          className="w-full h-full flex items-center justify-center"
          particleSize={particleSize}
          scrollZoom={true}
          zoomRange={zoomRange}
          loadingDelay={0.3}
          onLoad={() => {
            setImageLoaded(true)
            onImageLoad?.()
          }}
        />

        {/* Overlay content (text) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 pb-20 px-6"
          style={{
            opacity: contentOpacity,
            y: contentY
          }}
        >
          {children}
        </motion.div>

        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-vignette pointer-events-none" />
        
        {/* Gradient from bottom for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
