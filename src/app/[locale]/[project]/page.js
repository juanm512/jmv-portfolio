"use client"
import { useLayoutEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

import { getProjectById } from "@/lib/useData.js"
import StatusLines from "@/components/ProjectComponents/StatusLines"
import { TouchClick } from "@/components/Icons"

const statusColor = {
  green: "bg-green-600",
  yellow: "bg-yellow-600",
  red: "bg-red-600"
}

export default function Page({ params }) {
  const router = useRouter()
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", "end start"]
  })
  const sm = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"])
  const md = useTransform(scrollYProgress, [0, 1], ["-2vh", "80vh"])
  const lg = useTransform(scrollYProgress, [0, 1], ["-10vh", "90vh"])
  const y = [sm, md, lg]

  const [width, setWidth] = useState(0)
  const project = getProjectById(params.project, params.locale)

  useLayoutEffect(() => {
    setWidth(window.innerWidth)
    console.log(window.innerWidth, width, project.title.length)
  }, [])

  return (
    <div className="relative flex flex-col justify-start items-center pb-32 z-10 overflow-hidden">
      <div className="flex flex-col gap-0 justify-start w-full h-fit mt-32">
        <div
          style={{
            fontSize: ((width / project.title.length) * 82.7) / 47.5 + "px",
            transform: "scaleY(1) scaleX(1)"
          }}
          className="flex gap-10 justify-end items-center w-full h-fit leading-none font-bold -tracking-widest text-neutral-200"
        >
          {getWords(project.title)}
        </div>
        <div
          style={{
            fontSize: ((width / project.subTitle.length) * 82.7) / 47.5 + "px",
            transform: "scaleY(0.8) scaleX(0.8) translateX(-10%)"
          }}
          className="flex gap-10 justify-start items-center w-full h-fit leading-none -tracking-wide text-neutral-500"
        >
          {getWords(project.subTitle)}
        </div>
      </div>

      <div className="flex mx-auto w-11/12 flex-row justify-center items-end gap-0 h-fit mt-2 mb-8 ">
        <StatusLines color={project.status.color} />
      </div>

      <div className="flex flex-col gap-8 md:flex-row justify-evenly w-full h-fit my-32">
        <div className="basis-1/3 flex gap-2 justify-center items-center text-neutral-500">
          {getWords(project.status.text)}
        </div>
        <div className="basis-1/3 flex gap-2 justify-center items-center text-neutral-500">
          {/* {getWords("Sorry github repo is private")} */}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              className="w-fit h-fit py-2 px-4 text-red-300 underline hover:ring-2 ring-white"
            >
              Visit Github repo {"->"}
            </a>
          ) : (
            getWords("Sorry github repo is private")
          )}
        </div>
        <div className="basis-1/3 flex gap-2 justify-center items-center text-neutral-500">
          {/* {getWords("Website no available")} */}
          {project.website ? (
            <a
              href={project.website}
              target="_blank"
              className="w-fit h-fit py-2 px-4 text-red-300 underline hover:ring-2 ring-white"
            >
              Visit Website {"->"}
            </a>
          ) : (
            getWords("Website no available")
          )}
        </div>
      </div>

      <div className="flex flex-nowrap flex-row px-4 justify-start md:justify-center gap-4 w-full h-fit mt-16 mb-1 bg-red-900 overflow-x-auto">
        {["Languages:"]
          .concat(project.languages)
          .concat([project.database[0] ? project.database[0] : "No Database"])
          .map((language, index) => (
            <div
              key={language}
              className={
                "basis-1/5 flex gap-2 justify-start items-center py-1 text-neutral-200 text-2xl" +
                (index == 0 && " place-self-start")
              }
            >
              {getWords(language)}
            </div>
          ))}
      </div>
      <div className="flex flex-nowrap flex-row px-4 justify-between gap-4 w-full h-fit mt-1 mb-32 bg-red-950 overflow-x-auto ">
        {["Libraries:"].concat(project.libraries).map((language) => (
          <div
            key={language}
            className="basis-auto flex text-nowrap gap-2 justify-start items-center py-1 text-neutral-300"
          >
            {getWords(language)}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap flex-row justify-start gap-2 mx-auto w-11/12 md:w-9/12 h-fit my-32 text-lg md:text-2xl">
        {getWords(project.description)}
      </div>

      <div
        ref={container}
        className="mt-[10vh] w-10/12 mx-auto min-h-[200vh] md:min-h-[150vh]"
      >
        <div className="md:ml-[10vw]">
          <h1 className="m-0 mt-2 uppercase text-3xl border-b-2">
            {project.title}
          </h1>

          <h1 className="m-0 mt-2 uppercase text-2xl">Images</h1>
        </div>

        <div className="relative flex flex-wrap flex-row-reverse w-full h-full justify-center gap-4 md:mt-[5vh]">
          {project.images.slice(0, 3).map((image, i) => {
            return (
              <motion.div
                style={{
                  y: y[i]
                }}
                key={`i_${i}`}
                onClick={(e) => router.push("/" + project.id + "/images/" + i)}
                className="relative basis-full md:basis-1/3 w-full aspect-square border-2 border-red-600/50 cursor-pointer"
              >
                <Image
                  src={"/" + image}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  alt={i + " - Image"}
                  loading="lazy"
                  className="object-cover w-full h-fit aspect-square z-10"
                />

                <motion.div className="md:hidden block absolute right-2 top-2 w-8 aspect-square bg-red-400/10 backdrop-blur z-10">
                  <TouchClick className={"w-full h-full"} />
                </motion.div>
                <motion.div
                  style={{
                    y: y[i]
                  }}
                  className="hidden md:block absolute -mt-48 w-full aspect-square bg-red-600/10 backdrop-blur"
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const getWords = (text) => {
  let words = []
  text.split(" ").forEach((word, i) => {
    words.push(
      <motion.span
        key={word + i}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 1.5,
            ease: [0.76, 0, 0.24, 1],
            delay: i * 0.03
          }
        }}
      >
        {word}
      </motion.span>
    )
  })
  return words
}
