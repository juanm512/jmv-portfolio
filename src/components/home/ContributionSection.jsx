"use client"

import { useState, useRef } from "react"
import { useTranslations } from "next-intl"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { Balancer } from "react-wrap-balancer"
import ContributionGraphSVG from "./ContributionGraphSVG"

export default function ContributionSection() {
  const [isInView, setIsInView] = useState(false)
  const t = useTranslations("Home.contributions")
  const containerRef = useRef(null)

  // Setup scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Hide fixed layers when section is not in view
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsInView(latest > 0.01 && latest < 0.99)
  })

  // Title & Text Opacity Setup
  // New Sequence: 
  // 0.0 - 0.15: Graph assembling
  // 0.15 - 0.25: Text fades in
  // 0.25 - 0.50: Text fully visible
  // 0.50 - 0.60: Text fades out
  // 0.60 - 0.80: Graph remains visible alone
  // 0.80 - 1.00: Graph disassembles
  
  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.5, 0.6], [0, 1, 1, 0])
  const titleY = useTransform(scrollYProgress, [0.15, 0.25], [50, 0])
  
  const textOpacity = useTransform(scrollYProgress, [0.20, 0.30, 0.45, 0.55], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.20, 0.30], [30, 0])

  return (
    <section ref={containerRef} className="relative h-[350vh] w-full px-2">
      {/* 3D Canvas fixed positioned when scrolling through section */}
      <motion.div 
        style={{
          visibility: isInView ? 'visible' : 'hidden',
        }}
        className="fixed top-0 w-full h-screen flex flex-col md:flex-row items-center justify-center z-10 overflow-hidden">
        
        {/* Left column: Text */}
        <div className="w-full md:w-1/2 md:pl-10 lg:pl-20 z-20 pointer-events-none p-4">
          <motion.h2
            className="text-3xl md:text-5xl font-medium text-white mb-4"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <Balancer>{t("title")}</Balancer>
          </motion.h2>

          <motion.p
            className="text-xs md:text-sm font-mono text-green-glow mb-6 tracking-[0.2em] uppercase"
            style={{ opacity: textOpacity, y: textY }}
          >
            {t("subtitle")}
          </motion.p>
          
          <motion.div
            className="w-16 h-px bg-green-glow/50 mb-6"
            style={{ opacity: textOpacity }}
          />

          <motion.p
            className="text-base md:text-lg text-white/75 leading-relaxed mb-4 max-w-lg"
            style={{ opacity: textOpacity, y: textY }}
          >
            {t("text_1")}
          </motion.p>
          
          <motion.p
            className="text-base md:text-lg text-white/75 leading-relaxed max-w-lg"
            style={{ opacity: textOpacity, y: textY }}
          >
            {t("text_2")}
          </motion.p>
        </div>

        {/* Right column: SVG Graphic */}
        <div 
          className="h-[50vh] w-full md:w-1/2 absolute md:relative md:h-screen right-0 bottom-0 pointer-events-none md:pointer-events-auto flex items-center justify-center -z-10"
        >
          <ContributionGraphSVG scrollProgress={scrollYProgress} />
        </div>
      </motion.div>
    </section>
  )
}
