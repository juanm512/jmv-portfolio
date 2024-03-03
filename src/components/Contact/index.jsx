"use client"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRef } from "react"

// import { Copy, CopyCheck, FileDownload, MouseClick, TouchClick } from "../Icons"

import Link from "next/link"

export default function Index() {
  const t = useTranslations("Contact")
  const container = useRef(null)
  return (
    <footer
      ref={container}
      id="contact"
      className="w-full h-[60vh] flex flex-row items-center"
    >
      <motion.div
        initial={{ transform: "translateX(-30%) translateY(-50%) scale(2)" }}
        whileInView={{
          transform: "translateX(0%) translateY(0%) scale(1)",
          transition: { duration: 0.4, delay: 0.4, ease: "easeIn" }
        }}
        viewport={{ amount: 0.5, once: true }}
        className="relative basis-4/12 h-1/2 mx-8 my-auto"
      >
        <div className="absolute w-full h-full -bottom-2 -left-2 bg-red-400 blur-sm" />
        <Image
          src="/Landing.png"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="contact Juan Manuel Vila IA picture"
          className="object-cover w-full aspect-video"
          priority
          quality={75}
        />
      </motion.div>
      <div className="relative basis-8/12 h-2/3 flex flex-col">
        <div className="relative w-full my-8 text-4xl md:text-8xl uppercase font-bold text-center">
          <span className="relative text-nowrap text-red-400 w-full h-fit">
            {t("contact_text")}
          </span>
          <motion.span
            initial={{ transform: "translateX(-50%) translateY(-50%)" }}
            whileInView={{
              transform: "translateX(-50%) translateY(-90%)",
              transition: { duration: 0.4, delay: 0.4, ease: "easeIn" }
            }}
            viewport={{ amount: 0.45, once: true }}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
            className="absolute text-nowrap left-1/2 top-1/2 pointer-events-none"
          >
            {t("contact_text")}
          </motion.span>
          <motion.span
            initial={{ transform: "translateX(-50%) translateY(-50%)" }}
            whileInView={{
              transform: "translateX(-50%) translateY(-10%)",
              transition: { duration: 0.4, delay: 0.4, ease: "easeIn" }
            }}
            viewport={{ amount: 0.45, once: true }}
            style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)" }}
            className="absolute text-nowrap left-1/2 top-1/2 pointer-events-none"
          >
            {t("contact_text")}
          </motion.span>
        </div>
        <p className="text-sm font-normal md:text-2xl">JUAN MANUEL VILA</p>
        <div className="relative mx-auto w-10/12 h-full">
          <div className="w-full h-full flex justify-evenly items-center p-4">
            <Link
              href={"https://github.com/juanm512"}
              target="_blank"
              className="relative group w-12 md:w-20 h-12 md:h-20 aspect-square transition-all duration-200 hover:scale-125"
            >
              <Image
                src="/contact/brand-github.png"
                fill={true}
                sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 4vw"
                alt="github logo"
                className="object-contain w-full aspect-square invert"
                priority
                quality={100}
              />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/juanmanuelvila/"}
              target="_blank"
              className="relative group w-12 md:w-20 h-12 md:h-20 aspect-square transition-all duration-200 hover:scale-125"
            >
              <Image
                src="/contact/brand-linkedin.png"
                fill={true}
                sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 4vw"
                alt="linkedin logo"
                className="object-contain w-full aspect-square invert"
                priority
                quality={100}
              />
            </Link>
            <Link
              href={"mailto:512juanm+job@gmail.com"}
              target="_blank"
              className="relative group w-12 md:w-20 h-12 md:h-20 aspect-square transition-all duration-200 hover:scale-125"
            >
              <Image
                src="/contact/mail.png"
                fill={true}
                sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 4vw"
                alt="email"
                className="object-contain w-full aspect-square invert"
                priority
                quality={100}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
