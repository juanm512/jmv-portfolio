"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import { Balancer } from "react-wrap-balancer"
import ParticleImage from "./ParticleImage"

export default function ChildhoodSection() {
  const containerRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const t = useTranslations("Home.childhood")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Crossfade de la imagen
  const imageOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0])
  
  // Zoom progresivo
  const imageScale = useTransform(scrollYProgress, [0.15, 0.85], [1, 5])
  
  // Texto aparece y desaparece
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.65, 0.8], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.2, 0.35], [50, 0])

  return (
    <section
      ref={containerRef}
      className="relative h-[350vh] -mt-[100vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background-dark">
        {/* Particle Image con crossfade */}
        <motion.div
          className="absolute inset-0"
          style={{ 
            opacity: imageOpacity,
            scale: imageScale
          }}
        >
          <ParticleImage
            src="/Ai2.jpg"
            alt="Childhood memories"
            className="w-full h-full"
            particleSize={24}
            particleGap={0}
            vibrateIntensity={1}
            zoomRange={[1, 1]}
            loadingDelay={0}
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>

        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-background-dark/30 pointer-events-none" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-vignette pointer-events-none" />

        {/* Gradient from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent pointer-events-none" />

        {/* Texto */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 pb-12 md:pb-20 px-6"
          style={{
            opacity: textOpacity,
            y: textY
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-medium text-white mb-6"
            >
              <Balancer>{t("title")}</Balancer>
            </motion.h2>

            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              <Balancer>{t("text")}</Balancer>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
