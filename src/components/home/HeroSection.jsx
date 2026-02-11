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
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, 100])

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh]"
    >
      {/* Sticky container para la imagen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background-dark">
        {/* Fondo gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-green-primary/20 via-background-dark to-background-dark" />
        
        {/* Glow central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-glow/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Particle Image - Ocupa toda la pantalla */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ParticleImage
            src="/Ai2.jpg"
            alt="Juan Manuel Vila"
            className="w-full h-full"
            particleSize={25}
            particleGap={1}
            vibrateIntensity={1.2}
            zoomRange={[1, 5]}
            loadingDelay={0.2}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-vignette pointer-events-none" />

        {/* Texto principal - Posicionado ABAJO */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 pb-16 md:pb-24 px-6"
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
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-xs md:text-sm font-mono text-green-glow/80 mb-4 tracking-[0.3em] uppercase"
            >
              {t("subtitle")}
            </motion.p>

            {/* Título principal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={imageLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.8 }}
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
              transition={{ duration: 0.8, delay: 2.2 }}
              className="w-24 h-px bg-green-glow/50 mx-auto mt-8"
            />
          </div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={imageLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 2.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: textOpacity }}
        >
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-6 bg-gradient-to-b from-green-glow/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
