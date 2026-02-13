"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useTranslations } from "next-intl"
import { Balancer } from "react-wrap-balancer"

export default function AbstractSection() {
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const t = useTranslations("Home.abstract")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Hide fixed layers when section is not in view
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsInView(latest > 0.01 && latest < 0.99)
  })

  // Title
  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.8, 0.9], [0, 1, 1, 0])
  const titleY = useTransform(scrollYProgress, [0.15, 0.25], [50, 0])

  // Subtitle
  const subtitleOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.78, 0.88], [0, 1, 1, 0])
  const subtitleY = useTransform(scrollYProgress, [0.2, 0.3], [30, 0])

  // Text paragraphs — staggered
  const text1Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.75, 0.85], [0, 1, 1, 0])
  const text1Y = useTransform(scrollYProgress, [0.25, 0.35], [25, 0])

  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.72, 0.82], [0, 1, 1, 0])
  const text2Y = useTransform(scrollYProgress, [0.3, 0.4], [25, 0])

  const text3Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.7, 0.8], [0, 1, 1, 0])
  const text3Y = useTransform(scrollYProgress, [0.35, 0.45], [25, 0])

  // Background fade
  const bgOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] w-full px-2"
    >
      {/* Ambient gradient background — pure CSS, zero cost */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          visibility: isInView ? 'visible' : 'hidden',
          opacity: bgOpacity,
          background: `
            radial-gradient(ellipse 60% 50% at 15% 50%, rgba(0,255,156,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 70%, rgba(27,94,60,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,255,156,0.02) 0%, transparent 80%)
          `
        }}
      />
      {/* Content — sticky centered */}
      <div className="fixed top-0 w-full h-screen flex items-center justify-center z-10" style={{ visibility: isInView ? 'visible' : 'hidden' }}>
        <div className="max-w-3xl mx-auto w-full px-2">
          {/* Title */}
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-4"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <Balancer>
            {t("title")}
            </Balancer>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xs md:text-sm font-mono text-green-glow mb-8 tracking-[0.2em] uppercase"
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
            {t("text_1")}
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-white/75 leading-relaxed mb-5"
            style={{ opacity: text2Opacity, y: text2Y }}
          >
            {t("text_2")}
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-white/70 leading-relaxed"
            style={{ opacity: text3Opacity, y: text3Y }}
          >
            {t("text_3")}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
