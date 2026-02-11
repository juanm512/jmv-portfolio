"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import { Balancer } from "react-wrap-balancer"

export default function ChildhoodSection() {
  const containerRef = useRef(null)
  const t = useTranslations("Home.childhood")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Crossfade effect
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 1])
  const imageScale = useTransform(scrollYProgress, [0.3, 0.8], [1.3, 1.6])
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const textY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background-dark"
    >
      {/* Background image with crossfade */}
      <motion.div
        style={{ opacity: imageOpacity, scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          src="/Ai2.jpg"
          alt="Childhood memories"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-background-dark/70" />
        <div className="absolute inset-0 bg-vignette" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-8">
              <Balancer>{t("title")}</Balancer>
            </h2>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              <Balancer>{t("text")}</Balancer>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
