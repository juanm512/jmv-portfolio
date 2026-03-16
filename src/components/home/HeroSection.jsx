"use client"

import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useTranslations } from "next-intl"
import { Balancer } from "react-wrap-balancer"

const ThreeParticleImage = dynamic(
  () => import("./ThreeParticleImage"),
  { ssr: false }
)

export default function HeroSection() {
  const containerRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const disperseRef = useRef(0)
  const t = useTranslations("Home.hero")

  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const disperseMotion = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.75], [0, 0, 0.8, 1])

  // Update ref directly — no setState, no re-render
  useMotionValueEvent(disperseMotion, "change", (latest) => {
    disperseRef.current = latest
  })

  const [isInView, setIsInView] = useState(true)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsInView(latest < 0.99)
  })

  // ZOOM más pronunciado y fluido
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 0.75], [1, 2, 6])
  const imageOpacity = useTransform(scrollYProgress, [0.1, 0.75, 1], [1, 0.75, 0])
  
  // Texto
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, 80])

  // Green overlay opacity — extracted from inline JSX
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1])

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      {/* Sticky container */}
      <div className="fixed top-0 h-screen w-full" style={{ visibility: isInView ? 'visible' : 'hidden' }}>
        {/* Imagen con zoom */}
        {mounted && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              // scale: imageScale,
              opacity: imageOpacity,
            }}
          >
            <ThreeParticleImage
              src="/L44.jpeg"
              disperseProgressRef={disperseRef}
              baseParticleSize={10}
              maxGridParticles={7500}
              extraOnCenter={2500}
              onLoad={() => setImageLoaded(true)}
              paused={!isInView}
            />
            {/* Vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, transparent 20%, transparent 40%, rgba(5,11,8,0.3) 60%, rgba(5,11,8,0.7) 80%, rgba(5,11,8,0.92) 100%)"
              }}
            />
          </motion.div>
        )}

        {/* Capa verde que se intensifica con scroll */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(15, 61, 46, 0.3) 100%)`,
            opacity: overlayOpacity
          }}
        />

        
        {/* Texto */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-40 pb-12 md:pb-24 px-6"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={imageLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="text-xs md:text-sm font-mono text-green-glow mb-4 tracking-[0.3em] uppercase"
            >
              {t("subtitle")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={imageLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 2.8 }}
              className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight"
            >
              <Balancer className="text-white">{t("title")}</Balancer>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={imageLoaded ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 3.2 }}
              className="w-24 h-px bg-green-glow mx-auto mt-8"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
