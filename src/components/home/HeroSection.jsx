"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import { Balancer } from "react-wrap-balancer"

export default function HeroSection() {
  const containerRef = useRef(null)
  const t = useTranslations("Home.hero")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background-dark"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-green-primary/20 via-background-dark to-background-dark" />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-vignette pointer-events-none" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-glow/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Image with zoom effect */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
          <Image
            src="/Ai2.jpg"
            alt="Juan Manuel Vila"
            fill
            className="object-cover rounded-2xl"
            priority
            sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
          />
          {/* Image border glow */}
          <div className="absolute inset-0 rounded-2xl border border-green-glow/20 shadow-[0_0_60px_rgba(0,255,156,0.1)]" />
        </div>
      </motion.div>

      {/* Text overlay */}
      <motion.div
        style={{ opacity, y }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        <div className="text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base font-mono text-green-glow/80 mb-4 tracking-wider uppercase"
          >
            {t("subtitle")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight"
          >
            <Balancer className="text-white">
              {t("title")}
            </Balancer>
          </motion.h1>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-green-glow/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
