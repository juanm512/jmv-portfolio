"use client"
import { useScroll, useTransform, useSpring, motion } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

import Card from "./Card"

export default function Index() {
  const container = useRef(null)
  const { scrollYProgress, scrollY } = useScroll({
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
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </motion.div>
      <motion.div
        className="absolute flex flex-nowrap gap-[7.5vh] items-center h-screen"
        style={{
          x: x2,
          y: y2
        }}
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </motion.div>
    </section>
  )
}
