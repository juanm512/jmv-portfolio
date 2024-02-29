"use client"
import { useScroll, useTransform, useSpring, motion } from "framer-motion"
import { useRef } from "react"

import Card from "./Card"

import data from "@/lib/data.json"

const data1 = data.slice(0, 6)
const data2 = data.slice(6)

export default function Index() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container
  })

  const yTranslation = useSpring(scrollYProgress, {
    stiffness: 5000,
    damping: 50,
    mass: 0.1
  })
  const y1 = useTransform(scrollYProgress, [0, 0.5], ["0vh", "150vh"])
  const y2 = useTransform(scrollYProgress, [0.5, 1], ["150%", "300%"])

  const xTranslation = useSpring(scrollYProgress, {
    stiffness: 2000,
    damping: 100,
    mass: 0.1
  })
  const x1 = useTransform(xTranslation, [0, 0.5], ["5%", "-110%"])
  const x2 = useTransform(xTranslation, [0.5, 1], ["-100%", "5%"])

  return (
    <section
      id="my_work"
      ref={container}
      className="relative my-[10vh] h-[400vh] will-change-auto overflow-hidden"
    >
      <motion.div
        className="absolute flex flex-nowrap gap-[7.5vh] items-center h-screen"
        style={{
          x: x1,
          y: y1
        }}
      >
        {data1.map((element) => (
          <Card
            key={element.id}
            data={{
              id: element.id,
              title: element.name,
              image: element.images[0],
              languages: [
                ...element.languages,
                ...element.database.filter((db) =>
                  ["MongoDB", "MySQL"].includes(db)
                ),
                ...element.libraries.filter((lib) =>
                  librariesImages.includes(lib)
                )
              ]
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="absolute flex flex-nowrap flex-row-reverse gap-[7.5vh] items-center h-screen"
        style={{
          x: x2,
          y: y2
        }}
      >
        {data2.map((element) => (
          <Card
            key={element.id}
            data={{
              id: element.id,
              title: element.name,
              image: element.images[0],
              languages: element.languages
            }}
          />
        ))}
      </motion.div>
    </section>
  )
}

const librariesImages = ["threejs", "framer-motion", "tailwindcss"]
