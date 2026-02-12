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

export default function ChildhoodSection() {
  const containerRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const t = useTranslations("Home.childhood")

  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const imageOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.7, 0.85], [0, 1, 1, 0])
  const imageScale = useTransform(scrollYProgress, [0.15, 0.6], [1, 4])
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.6, 0.75], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.2, 0.35], [50, 0])

  return (
    <section ref={containerRef} className="relative h-[300vh] -mt-[100vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background-dark">
        {mounted && (
          <motion.div
            className="absolute inset-0"
            style={{ opacity: imageOpacity, scale: imageScale }}
          >
            <CanvasParticleImage
              src="/Ai2.jpg"
              onLoad={() => setImageLoaded(true)}
              particleSize={10}
              vibrateIntensity={0.5}
            />
          </motion.div>
        )}

        <div className="absolute inset-0 bg-background-dark/30 pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent pointer-events-none z-30" />

        <motion.div
          className="absolute bottom-0 left-0 right-0 z-40 pb-12 md:pb-20 px-6"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium text-white mb-6">
              <Balancer>{t("title")}</Balancer>
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              <Balancer>{t("text")}</Balancer>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
