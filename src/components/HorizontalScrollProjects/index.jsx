"use client"
import { useScroll, useTransform, useSpring, motion } from "framer-motion"
import { useRef, useMemo } from "react"

import Card from "./Card"

import data from "@/lib/data.json"
import { useLocale } from "next-intl"

const librariesImages = ["threejs", "framer-motion", "tailwindcss"]

export default function Index() {
  const lang = useLocale()
  const container = useRef(null)

  // 1. Memoize processed data to avoid recalculating on every render
  const { data1, data2 } = useMemo(() => {
    const allData = data[lang] || []
    const processedData1 = allData.slice(0, 6).map((element) => ({
      id: element.id,
      title: `${element.title} | ${element.subTitle}`,
      image: element.images[0],
      languages: [
        ...element.languages,
        ...element.database.filter((db) => ["MongoDB", "MySQL"].includes(db)),
        ...element.libraries.filter((lib) => librariesImages.includes(lib))
      ]
    }))
    const processedData2 = allData.slice(6).map((element) => ({
      id: element.id,
      title: element.name,
      image: element.images[0],
      languages: element.languages
    }))
    return { data1: processedData1, data2: processedData2 }
  }, [lang])

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"] // 2. Add offset for better control
  })

  // 3. Apply spring to transformed values for smoother animations
  const springConfig = {
    stiffness: 1000,
    damping: 100,
    mass: 0.5
  }

  // Row 1 animations
  const x1 = useTransform(scrollYProgress, [0, 0.5], ["5%", "-110%"])
  const y1 = useTransform(scrollYProgress, [0, 0.5], ["0vh", "150vh"])
  const smoothX1 = useSpring(x1, springConfig)
  const smoothY1 = useSpring(y1, springConfig)

  // Row 2 animations
  const x2 = useTransform(scrollYProgress, [0.5, 1], ["-100%", "5%"])
  const y2 = useTransform(scrollYProgress, [0.5, 1], ["150%", "300%"])
  const smoothX2 = useSpring(x2, springConfig)
  const smoothY2 = useSpring(y2, springConfig)

  return (
    <section
      id="my_work"
      ref={container}
      className="relative mt-[10vh] mb-[30vh] h-[400vh] overflow-hidden"
    >
      <motion.div
        className="absolute flex flex-nowrap gap-[7.5vh] items-center h-screen"
        style={{
          x: smoothX1,
          y: smoothY1,
          willChange: "transform" // 4. Correct will-change usage
        }}
      >
        {data1.map((cardData) => (
          <Card key={cardData.id} data={cardData} />
        ))}
      </motion.div>
      <motion.div
        className="absolute flex flex-nowrap flex-row-reverse gap-[7.5vh] items-center h-screen"
        style={{
          x: smoothX2,
          y: smoothY2,
          willChange: "transform" // 4. Correct will-change usage
        }}
      >
        {data2.map((cardData) => (
          <Card key={cardData.id} data={cardData} />
        ))}
      </motion.div>
    </section>
  )
}
