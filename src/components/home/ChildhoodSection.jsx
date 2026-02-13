"use client"

import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
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
  const disperseRef = useRef(1) // Start fully dispersed
  const t = useTranslations("Home.childhood")

  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // INVERSE disperse: starts at 1 (dispersed), goes to 0 (assembled)
  const disperseMotion = useTransform(scrollYProgress, [0.05, 0.15, 0.35, 0.95], [1, 0.6, 0, 1])

  useMotionValueEvent(disperseMotion, "change", (latest) => {
    disperseRef.current = latest
  })

  // Image: fade in as particles assemble, hold, then fade out at end
  const imageOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.75, 0.9], [0, 1, 1, 0])
  const imageScale = useTransform(scrollYProgress, [0.1, 0.4, 0.85, 0.95], [1.3, 1, 1, 2.5])

  // Title: appears after image assembled
  const titleOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.8, 0.88], [0, 1, 1, 0])
  const titleY = useTransform(scrollYProgress, [0.25, 0.35], [40, 0])

  // Subtitle
  const subtitleOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.78, 0.86], [0, 1, 1, 0])
  const subtitleY = useTransform(scrollYProgress, [0.3, 0.4], [30, 0])

  // Text paragraphs — staggered fade in
  const text1Opacity = useTransform(scrollYProgress, [0.36, 0.44, 0.76, 0.84], [0, 1, 1, 0])
  const text1Y = useTransform(scrollYProgress, [0.36, 0.44], [25, 0])

  const text2Opacity = useTransform(scrollYProgress, [0.42, 0.5, 0.74, 0.82], [0, 1, 1, 0])
  const text2Y = useTransform(scrollYProgress, [0.42, 0.5], [25, 0])

  const text3Opacity = useTransform(scrollYProgress, [0.48, 0.56, 0.72, 0.80], [0, 1, 1, 0])
  const text3Y = useTransform(scrollYProgress, [0.48, 0.56], [25, 0])

  // Overlay intensifies
  const overlayOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 0.95], [0, 0.5, 0.6, 0.9])

  return (
    <section ref={containerRef} className="relative h-[350vh]">
      <div className="fixed top-0 h-screen w-full">
        {/* Particle Image */}
        {mounted && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              scale: imageScale,
              opacity: imageOpacity,
            }}
          >
            <CanvasParticleImage
              src="/Ai2.jpg"
              disperseProgressRef={disperseRef}
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>
        )}

        {/* Dark overlay that intensifies for text readability */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `linear-gradient(
              to top,
              rgba(5, 11, 8, 0.95) 0%,
              rgba(5, 11, 8, 0.7) 30%,
              rgba(5, 11, 8, 0.3) 55%,
              transparent 100%
            )`,
            opacity: overlayOpacity
          }}
        />

        {/* Green tint */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(15, 61, 46, 0.2) 100%)`,
            opacity: overlayOpacity
          }}
        />

        {/* Text content */}
        <div className="absolute inset-0 z-40 flex items-end pb-12 md:pb-20 px-6 pointer-events-none">
          <div className="max-w-3xl mx-auto w-full">
            {/* Title */}
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-medium text-white mb-4"
              style={{ opacity: titleOpacity, y: titleY }}
            >
              <Balancer>{t("title")}</Balancer>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-xs md:text-sm font-mono text-green-glow mb-6 tracking-[0.2em] uppercase"
              style={{ opacity: subtitleOpacity, y: subtitleY }}
            >
              {t("subtitle")}
            </motion.p>

            {/* Divider */}
            <motion.div
              className="w-16 h-px bg-green-glow/50 mb-8"
              style={{ opacity: subtitleOpacity }}
            />

            {/* Extended text paragraphs */}
            <motion.p
              className="text-base md:text-lg text-white/75 leading-relaxed mb-5"
              style={{ opacity: text1Opacity, y: text1Y }}
            >
              <Balancer>{t("text_1")}</Balancer>
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-white/75 leading-relaxed mb-5"
              style={{ opacity: text2Opacity, y: text2Y }}
            >
              <Balancer>{t("text_2")}</Balancer>
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-white/70 leading-relaxed"
              style={{ opacity: text3Opacity, y: text3Y }}
            >
              <Balancer>{t("text_3")}</Balancer>
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
