"use client"
import { useRef, useEffect, useState, useLayoutEffect } from "react"
import { useScroll, useTransform, motion, useInView } from "framer-motion"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import Lenis from "@studio-freight/lenis"

import Image from "next/image"
import { slideUp } from "./animation"

const Canvas = dynamic(() => import("@/components/Landing/Canvas.jsx"), {
  ssr: false,
  Loading: () => {
    const t = useTranslations("Landing")

    return (
      <p className="absolute font-kode text-xl md:text-9xl top-1/3 transition-all tracking-widest">
        {t("loading")}
      </p>
    )
  }
})

export default function Home() {
  const t = useTranslations("Landing")
  const container = useRef(null)
  const work_name_container = useRef(null)
  const work_name_container_in_view = useInView(work_name_container)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  const wImage = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    ["24rem", "32vw", "0vw"]
  )
  const hImage = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    ["24vh", "48vh", "0vh"]
  )
  const opacityImage = useTransform(
    scrollYProgress,
    [0, 0.7, 0.75, 1],
    [1, 0.9, 0, 0]
  )

  const opacityCanvas = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 1],
    [0, 0, 0.2, 1]
  )

  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    const lenis = new Lenis()

    const raf = (time) => {
      lenis.raf(time)

      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <motion.section
      ref={container}
      variants={slideUp}
      initial="initial"
      animate="enter"
      className="relative flex h-[300vh] "
    >
      <div
        data-scroll
        data-scroll-speed={0.2}
        className="absolute top-[20%] left-4 xl:top-1/4 md:left-2/3 text-white text-xl md:text-2xl font-kode"
      >
        <svg
          className="-rotate-90 md:rotate-0"
          style={{
            transform: "scale(2)",
            marginBottom: "100px"
          }}
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
            fill="white"
          />
        </svg>
        <p className="mb-2 overflow-hidden">{getChars(t("who_i_am"))}</p>

        <p className="mb-2 pr-2 overflow-hidden">
          {getChars(t("page_description"))}
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{
              y: "0%",
              opacity: 1,
              transition: {
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
                delay: t("page_description").length * 0.03
              }
            }}
          >
            &#128170;
          </motion.span>
        </p>
      </div>
      <div className="sticky overflow-hidden top-0 h-screen w-full">
        <motion.div
          style={{
            opacity: opacityCanvas
          }}
          className="h-screen bottom-0 w-full justify-center items-center z-10 pointer-events-auto"
        >
          <div className="relative w-[100vw] h-[100vh] z-10">
            <Canvas inView={work_name_container_in_view} />
          </div>
        </motion.div>
        <motion.div className="absolute inset-0 top-0 flex justify-center items-center pointer-events-none">
          <motion.div
            style={{
              opacity: opacityImage,
              width: wImage,
              height: hImage
            }}
            className="relative overflow-hidden pointer-events-none"
          >
            <Image
              src="/Landing.png"
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Juan Manuel Vila IA foto"
              className="object-cover h-auto"
              priority
              quality={100}
            />
          </motion.div>
        </motion.div>
      </div>
      <div
        ref={work_name_container}
        data-scroll
        data-scroll-speed={0.2}
        className="absolute w-full bottom-[-10px] left-0 text-white font-kode"
      >
        <motion.p
          style={{
            fontSize: ((width / t("work_name").length) * 62.7) / 47.5 + "px",
            transform: "scaleY(1) scaleX(1)"
          }}
          initial={{ opacity: 0, height: 0 }}
          whileInView={{ opacity: 1, height: "auto" }}
          className="mb-2 py-2 w-full text-center text-white bg-red-500/50 backdrop-blur-md  overflow-hidden"
        >
          {getChars(t("work_name"))}
        </motion.p>
        {/* <motion.p
          style={{
            fontSize:
              ((width / t("work_name").split(" - ")[1].length) * 42.7) / 47.5 +
              "px",
            transform: "scaleY(1) scaleX(1)"
          }}
          initial={{ opacity: 0, height: 0 }}
          whileInView={{ opacity: 1, height: "auto" }}
          className="mb-2 py-2 w-full text-center text-white bg-red-500/50 backdrop-blur-md  overflow-hidden"
        >
          {getChars(t("work_name").split(" - ")[1])}
        </motion.p> */}
      </div>
    </motion.section>
  )
}

const getChars = (word) => {
  let chars = []
  word.split("").forEach((char, i) => {
    chars.push(
      <motion.span
        key={char + i}
        initial={{ y: "-100%", opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: i * 0.03 }
        }}
      >
        {char}
      </motion.span>
    )
  })
  return chars
}
