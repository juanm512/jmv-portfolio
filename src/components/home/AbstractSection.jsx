"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useTranslations } from "next-intl"
import { Balancer } from "react-wrap-balancer"

// Animated connection lines component
function ConnectionLines() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF9C" stopOpacity="0" />
          <stop offset="50%" stopColor="#00FF9C" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00FF9C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1B5E3C" stopOpacity="0" />
          <stop offset="50%" stopColor="#00FF9C" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1B5E3C" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d="M0,300 Q400,100 800,300 T1600,300"
        fill="none"
        stroke="url(#lineGradient1)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,500 Q600,300 1200,500 T2000,500"
        fill="none"
        stroke="url(#lineGradient2)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.5, delay: 0.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M200,800 Q500,400 800,600 T1400,400"
        fill="none"
        stroke="url(#lineGradient1)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
      />
      <motion.path
        d="M100,200 Q300,500 500,200 T900,300"
        fill="none"
        stroke="url(#lineGradient2)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.5, delay: 0.8, ease: "easeInOut" }}
      />
    </svg>
  )
}

// Floating nodes representing ideas
function FloatingNodes() {
  const nodes = [
    { x: "15%", y: "20%", size: 8, delay: 0 },
    { x: "75%", y: "15%", size: 12, delay: 0.5 },
    { x: "85%", y: "60%", size: 6, delay: 1 },
    { x: "25%", y: "70%", size: 10, delay: 1.5 },
    { x: "60%", y: "80%", size: 14, delay: 0.3 },
    { x: "45%", y: "30%", size: 5, delay: 0.8 },
    { x: "10%", y: "50%", size: 7, delay: 1.2 }
  ]

  return (
    <>
      {nodes.map((node, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: node.x,
            top: node.y,
            width: node.size,
            height: node.size
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            boxShadow: [
              "0 0 10px rgba(0,255,156,0.2)",
              "0 0 20px rgba(0,255,156,0.4)",
              "0 0 10px rgba(0,255,156,0.2)"
            ]
          }}
          transition={{
            duration: 4,
            delay: node.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full rounded-full bg-green-glow/40" />
        </motion.div>
      ))}
    </>
  )
}

export default function AbstractSection() {
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const t = useTranslations("Home.abstract")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const bgOpacity = useTransform(scrollYProgress, [0 , 0.25, 0.5, 0.75, 1], [0, 0, 1, 0.5, 0])

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

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] w-full"
    >
      {/* Connection lines */}
      <motion.div
        style={{ opacity: bgOpacity, visibility: isInView ? 'visible' : 'hidden' }}
        className="fixed inset-0 pointer-events-none"
      >
        <ConnectionLines />
      </motion.div>

      {/* Floating nodes */}
      <motion.div
        style={{ opacity: bgOpacity, visibility: isInView ? 'visible' : 'hidden' }}
        className="fixed inset-0 pointer-events-none"
      >
        <FloatingNodes />
      </motion.div>

      {/* Central glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-glow/5 rounded-full blur-[120px] pointer-events-none" style={{ visibility: isInView ? 'visible' : 'hidden' }} />

      {/* Grid pattern */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          visibility: isInView ? 'visible' : 'hidden',
          backgroundImage: `
            linear-gradient(rgba(0,255,156,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,156,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px"
        }}
      />

      {/* Content — sticky centered */}
      <div className="fixed top-0 w-full h-screen flex items-center justify-center z-10" style={{ visibility: isInView ? 'visible' : 'hidden' }}>
        <div className="max-w-3xl mx-auto w-full">
          {/* Title */}
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-4"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            {t("title")}
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
