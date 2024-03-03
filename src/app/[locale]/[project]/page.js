"use client"
import { useLayoutEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { getProjectById } from "@/lib/useData.js"
import StatusLines from "./StatusLines"

export default function Page({ params }) {
  const [width, setWidth] = useState(0)
  const project = getProjectById(params.project, params.locale)

  useLayoutEffect(() => {
    setWidth(window.innerWidth)
    console.log(window.innerWidth, width, project.title.length)
  }, [])

  return (
    <div className="relative flex flex-col justify-start items-center pb-32 z-10">
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

      <div className="flex mx-auto w-11/12 flex-row justify-center items-end gap-0 h-fit mb-8 ">
        <StatusLines color={project.status.color} />
      </div>

      <div className="flex flex-row justify-evenly w-full h-fit mt-16 mb-24">
        <div className="basis-1/3 flex gap-2 justify-center items-center text-neutral-500">
          {getWords(project.status.text)}
        </div>
        <div className="basis-1/3 flex gap-2 justify-center items-center text-neutral-500">
          {getWords("Sorry github repo is private")}
          {/* {project.github ? null : getWords("Sorry github repo is private")} */}
        </div>
        <div className="basis-1/3 flex gap-2 justify-center items-center text-neutral-500">
          {getWords("Website no available")}
          {/* {project.website ? null : getWords("Website no available")} */}
        </div>
      </div>

      <div className="flex flex-nowrap flex-row justify-center w-full h-fit mt-4 mb-1 bg-red-900">
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
      <div className="flex flex-wrap flex-row justify-between w-full h-fit mt-1 mb-32 bg-red-950">
        {["Libraries:"].concat(project.libraries).map((language) => (
          <div
            key={language}
            className="basis-auto flex gap-2 justify-start items-center py-1 text-neutral-300"
          >
            {getWords(language)}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap flex-row justify-start gap-2 mx-auto w-9/12 h-fit mt-8 mb-32 text-2xl">
        {getWords(project.description)}
      </div>

      <Link
        href={"/" + project.id + "/images/0"}
        className="relative flex w-1/3 aspect-square h-[50vh]"
      >
        <Image
          src={"/" + project.images[0]}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          alt={project.title + " - Image"}
          loading="lazy"
          className="object-contain w-full h-fit aspect-square"
        />
      </Link>
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
