"use client"

import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import { Balancer } from "react-wrap-balancer"

const CanvasParticleImage = dynamic(
  () => import("./CanvasParticleImage"),
  { ssr: false }
)

export default function ChildhoodSection() {
  const containerRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const t = useTranslations("Home.childhood")

  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Crossfade más suave
  const imageOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.6, 0.75], [0, 1, 1, 0])
  const imageScale = useTransform(scrollYProgress, [0.2, 0.5], [1, 3.5])
  const imageY = useTransform(scrollYProgress, [0.3, 0.6], [50, -50])
  
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.55, 0.7], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.25, 0.4], [60, 0])

  return (
    <section ref={containerRef} className="relative h-[350vh] -mt-[100vh]">
      {/* Fondo verde sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-primary/20 to-transparent pointer-events-none" />
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {mounted && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: imageOpacity, scale: imageScale, y: imageY }}
          >
            <CanvasParticleImage
              src="/Ai2.jpg"
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>
        )}

        {/* Overlay oscuro sutil */}
        <div className="absolute inset-0 bg-background-dark/20 pointer-events-none z-20" />

        {/* Gradient para texto */}
        <div className="absolute bottom-0 left-0 right-0 h-[55vh] bg-gradient-to-t from-background-dark via-background-dark/70 to-transparent pointer-events-none z-30" />

        {/* Texto */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-40 pb-12 md:pb-24 px-6"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium text-white mb-6">
              <Balancer>{t("title")}</Balancer>
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              <Balancer>{t("text")}</Balancer>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
