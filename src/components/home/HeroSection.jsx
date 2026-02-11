"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import { Balancer } from "react-wrap-balancer"
import ParticleImage from "./ParticleImage"

export default function HeroSection() {
  const containerRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const t = useTranslations("Home.hero")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Texto se mueve hacia abajo y desaparece
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, 80])

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh]"
    >
      {/* Sticky container para la imagen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background-dark">
        {/* Particle Image - Ocupa toda la pantalla */}
        <div className="absolute inset-0">
          <ParticleImage
            src="/Ai2.jpg"
            alt="Juan Manuel Vila"
            className="w-full h-full"
            particleSize={20}
            particleGap={0}
            vibrateIntensity={0.8}
            zoomRange={[1, 6]}
            loadingDelay={0.1}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-vignette pointer-events-none" />

        {/* Gradient from bottom for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent pointer-events-none" />

        {/* Texto principal - Posicionado ABAJO */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 pb-12 md:pb-20 px-6"
          style={{
            opacity: textOpacity,
            y: textY
          }}
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={imageLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-xs md:text-sm font-mono text-green-glow mb-4 tracking-[0.3em] uppercase"
            >
              {t("subtitle")}
            </motion.p>

            {/* Título principal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={imageLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight"
            >
              <Balancer className="text-white">
                {t("title")}
              </Balancer>
            </motion.h1>

            {/* Línea decorativa */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={imageLoaded ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.9 }}
              className="w-24 h-px bg-green-glow mx-auto mt-8"
            />
          </div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={imageLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 2.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
