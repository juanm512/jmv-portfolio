"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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

      {/* Animated paths */}
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
  const t = useTranslations("Home.abstract")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const textY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full"
    >
      {/* Background gradient */}
      {/* <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-background-dark via-green-primary/10 to-background-dark"
      /> */}

      {/* Connection lines */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0"
      >
        <ConnectionLines />
      </motion.div>

      {/* Floating nodes */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0"
      >
        <FloatingNodes />
      </motion.div>

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-glow/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,156,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,156,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px"
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
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

      {/* Bottom vignette for transition */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-dark to-transparent pointer-events-none" /> */}
    </section>
  )
}
