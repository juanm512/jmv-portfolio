"use client"
import { useRef, useLayoutEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { slideUp } from "./animation"
import { useScroll, useTransform, motion } from "framer-motion"
import dynamic from "next/dynamic"

const Canvas = dynamic(() => import("@/components/Landing/Canvas.jsx"), {
  ssr: false,
  loading: () => (
    <p className="absolute font-kode text-9xl top-1/3 transition-all tracking-widest">
      Loading . . .
    </p>
  )
})

export default function Home() {
  const container = useRef(null)
  const firstText = useRef(null)
  const secondText = useRef(null)
  const slider = useRef(null)
  let xPercent = 0
  let direction = -1

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  const wImage = useTransform(
    scrollYProgress,
    [0, 0.75, 0.95, 1],
    ["20rem", "30vw", "10vw", "0vw"]
  )
  const hImage = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["25vh", "28vh", "90vh"]
  )
  const opacityImage = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.9, 0])

  // const sliderY = useTransform(scrollYProgress, [0, 1], ["100vh", "200vh"])
  const opacityCanvas = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.2, 1])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: () => window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1)
      },
      x: "-500px"
    })
    requestAnimationFrame(animate)
  }, [])

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0
    } else if (xPercent > 0) {
      xPercent = -100
    }
    gsap.set(firstText.current, { xPercent: xPercent })
    gsap.set(secondText.current, { xPercent: xPercent })

    requestAnimationFrame(animate)
    xPercent += 0.01 * direction
  }

  return (
    <motion.main
      ref={container}
      variants={slideUp}
      initial="initial"
      animate="enter"
      className="relative flex h-[300vh] "
    >
      <div className="sticky overflow-hidden top-0 h-screen w-full">
        <motion.div
          style={{ opacity: opacityCanvas }}
          className="h-screen bottom-0 w-full flex justify-center items-center z-10 pointer-events-auto"
        >
          <div className="relative w-[100vw] h-[100vh] z-10">
            <Canvas />
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
              alt="background"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
      <div
        className="absolute bottom-[calc(100vh - 350px)] pointer-events-none"
        style={{
          top: "200vh"
        }}
      >
        <div
          ref={slider}
          className="relative whitespace-nowrap"
        >
          <p
            className="relative m-0 text-white text-[200px] pr-16 font-kode"
            ref={firstText}
            style={{
              textShadow: "red 0 -2px"
            }}
          >
            Software Developer -
          </p>
          <p
            className=" absolute left-full top-0 m-0 text-white text-[200px] font-kode pr-16"
            ref={secondText}
            style={{
              textShadow: "red 0 -2px"
            }}
          >
            Software Developer -
          </p>
        </div>
      </div>
      <div
        data-scroll
        data-scroll-speed={0.2}
        className="absolute top-1/4 left-2/3 text-white text-2xl font-kode"
      >
        <svg
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
        <p className="mb-2 overflow-hidden">
          {getChars("I'm Juan Manuel Vila")}
        </p>

        <p className="mb-2 pr-2 overflow-hidden">
          {getChars("This is my portfolio, made from Argentina with ")}
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{
              y: "0%",
              opacity: 1,
              transition: {
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
                delay:
                  "This is my portfolio, made from Argentina with ".length *
                  0.03
              }
            }}
          >
            &#128170;
          </motion.span>
        </p>
      </div>
    </motion.main>
  )
}

const getChars = (word) => {
  let chars = []
  word.split("").forEach((char, i) => {
    chars.push(
      <motion.span
        initial={{ y: "200%", opacity: 0 }}
        whileInView={{
          y: "0%",
          opacity: 1,
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: i * 0.03 }
        }}
        key={char + i}
      >
        {char}
      </motion.span>
    )
  })
  return chars
}
