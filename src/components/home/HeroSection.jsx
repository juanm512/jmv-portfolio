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

  // ZOOM más pronunciado y fluido
  // La imagen crece y luego se desvanece
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 4, 6])
  const imageOpacity = useTransform(scrollYProgress, [0.4, 0.65, 0.8], [1, 0.6, 0])
  const imageY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  
  // Texto
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, 80])

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      {/* FONDO VERDE que se revela al hacer scroll */}
      <div className="fixed inset-0 bg-gradient-to-b from-background-dark via-green-primary/30 to-background-dark -z-10" />
      
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Imagen con zoom */}
        {mounted && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              scale: imageScale,
              opacity: imageOpacity,
              y: imageY
            }}
          >
            <CanvasParticleImage
              src="/Ai2.jpg"
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>
        )}

        {/* Capa verde que se intensifica con scroll */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(15, 61, 46, 0.3) 100%)`,
            opacity: useTransform(scrollYProgress, [0, 0.5], [0.3, 1])
          }}
        />

        {/* Gradient para legibilidad del texto */}
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-background-dark via-background-dark/70 to-transparent pointer-events-none z-30" />

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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={imageLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 3.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40"
          style={{ opacity: textOpacity }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-green-glow/70 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
