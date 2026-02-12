"use client"

import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import { Balancer } from "react-wrap-balancer"

// OPCIÓN 2: Canvas 2D (descomenta para usar)
const CanvasParticleImage = dynamic(
  () => import("./CanvasParticleImage"),
  { ssr: false }
)

// OPCIÓN 3: CSS Mask (descomenta para usar)
const CSSMaskImage = dynamic(
  () => import("./CSSMaskImage"),
  { ssr: false }
)

export default function HeroSection() {
  const containerRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const t = useTranslations("Home.hero")

  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1, 5])
  const imageOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.15], [0, 60])

  return (
    <section ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background-dark">
        {mounted && (
          <motion.div 
            className="absolute inset-0"
            style={{ scale: imageScale, opacity: imageOpacity }}
          >
            {/* OPCIÓN 2: Canvas 2D */}
            <CanvasParticleImage
              src="/Ai2.jpg"
              onLoad={() => setImageLoaded(true)}
              particleSize={10}
              vibrateIntensity={0.7}
            />
            
            {/* OPCIÓN 3: CSS Mask (comenta la de arriba y descomenta esta) */}
            {/* <CSSMaskImage
              src="/Ai2.jpg"
              onLoad={() => setImageLoaded(true)}
            /> */}
          </motion.div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent pointer-events-none z-30" />

        <motion.div
          className="absolute bottom-0 left-0 right-0 z-40 pb-12 md:pb-20 px-6"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={imageLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="text-xs md:text-sm font-mono text-green-glow mb-4 tracking-[0.3em] uppercase"
            >
              {t("subtitle")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={imageLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight"
            >
              <Balancer className="text-white">{t("title")}</Balancer>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={imageLoaded ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 2.8 }}
              className="w-24 h-px bg-green-glow mx-auto mt-8"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={imageLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 3.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40"
          style={{ opacity: textOpacity }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-green-glow/70 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
