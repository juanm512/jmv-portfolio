"use client"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRef } from "react"
import { Copy, CopyCheck, FileDownload, MouseClick, TouchClick } from "./Icons"
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
          alt="background"
          className="object-cover w-full aspect-video"
          priority
          quality={75}
        />
      </motion.div>
      <div className="relative basis-8/12 h-2/3 flex flex-col">
        <div className="relative w-full my-8 text-4xl md:text-8xl uppercase font-bold text-center">
          <span className="relative text-nowrap text-red-400 w-full h-fit">
            Contact me!
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
            Contact me!
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
            Contact me!
          </motion.span>
        </div>
        <p className="text-sm font-normal md:text-2xl">JUAN MANUEL VILA</p>
        <div className="relative mx-auto w-10/12 h-full">
          <div className="w-full h-full flex justify-evenly items-center p-4">
            <Link
              href={"https://github.com/juanm512"}
              target="_blank"
              className="relative group w-12 md:w-24 h-12 md:h-24 aspect-square transition-all duration-200 hover:scale-125"
            >
              <Image
                src="/contact/brand-github.png"
                fill={true}
                sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 4vw"
                alt="background"
                className="object-contain w-full aspect-square invert"
                priority
                quality={100}
              />
              {/* <div className="absolute inset-0 group-hover:bg-red-300/20 group-hover:backdrop-blur">
                <div className="absolute -right-1 md:right-0.5 -top-1 md:top-0.5 xs:opacity-100 md:opacity-0 flex w-fit h-4 md:h-8 items-center justify-center m-0 group-hover:opacity-80 transition-all duration-200">
                  <MouseClick
                    className={
                      "hidden md:inline-block w-full h-full ring-1 ring-white px-1"
                    }
                  />
                  <TouchClick
                    className={
                      "md:hidden inline-block w-full h-full ring-1 ring-white px-0.5 backdrop-blur-sm"
                    }
                  />
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-y-[50%] -translate-x-[50%] opacity-0 flex w-5 md:w-10 h-5 md:h-10 m-0 group-hover:opacity-100 transition-all duration-200">
                  <CopyCheck className={"w-full h-full"} />
                </div>
              </div> */}
            </Link>
            <Link
              href={"https://www.linkedin.com/in/juanmanuelvila/"}
              target="_blank"
              className="relative group w-12 md:w-24 h-12 md:h-24 aspect-square transition-all duration-200 hover:scale-125"
            >
              <Image
                src="/contact/brand-linkedin.png"
                fill={true}
                sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 4vw"
                alt="background"
                className="object-contain w-full aspect-square invert"
                priority
                quality={100}
              />
              {/* <div className="absolute inset-0 group-hover:bg-red-300/20 group-hover:backdrop-blur">
                <div className="absolute -right-1 md:right-0.5 -top-1 md:top-0.5 xs:opacity-100 md:opacity-0 flex w-fit h-4 md:h-8 items-center justify-center m-0 group-hover:opacity-80 transition-all duration-200">
                  <MouseClick
                    className={
                      "hidden md:inline-block w-full h-full ring-1 ring-white px-1"
                    }
                  />
                  <TouchClick
                    className={
                      "md:hidden inline-block w-full h-full ring-1 ring-white px-0.5 backdrop-blur-sm"
                    }
                  />
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-y-[50%] -translate-x-[50%] opacity-0 flex w-5 md:w-10 h-5 md:h-10 m-0 group-hover:opacity-100 transition-all duration-200">
                  <CopyCheck className={"w-full h-full"} />
                </div>
              </div> */}
            </Link>
            <Link
              href={"mailto:512juanm@gmail.com"}
              target="_blank"
              className="relative group w-12 md:w-24 h-12 md:h-24 aspect-square transition-all duration-200 hover:scale-125"
            >
              <Image
                src="/contact/mail.png"
                fill={true}
                sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 4vw"
                alt="background"
                className="object-contain w-full aspect-square invert"
                priority
                quality={100}
              />
              {/* <div className="absolute inset-0 group-hover:bg-red-300/20 group-hover:backdrop-blur">
                <div className="absolute -right-1 md:right-0.5 -top-1 md:top-0.5 xs:opacity-100 md:opacity-0 flex w-fit h-4 md:h-8 items-center justify-center m-0 group-hover:opacity-80 transition-all duration-200">
                  <MouseClick
                    className={
                      "hidden md:inline-block w-full h-full ring-1 ring-white px-1"
                    }
                  />
                  <TouchClick
                    className={
                      "md:hidden inline-block w-full h-full ring-1 ring-white px-0.5 backdrop-blur-sm"
                    }
                  />
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-y-[50%] -translate-x-[50%] opacity-0 flex w-5 md:w-10 h-5 md:h-10 m-0 group-hover:opacity-100 transition-all duration-200">
                  <CopyCheck className={"w-full h-full"} />
                </div>
              </div> */}
            </Link>
            {/* <div className="relative group w-12 md:w-24 h-12 md:h-24 aspect-square transition-all duration-200 hover:scale-125">
              <Image
                src="/contact/file-cv.png"
                fill={true}
                sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 4vw"
                alt="background"
                className="object-contain w-full aspect-square invert"
                priority
                quality={100}
              />
              <div className="absolute inset-0 group-hover:bg-red-300/20 group-hover:backdrop-blur">
                <div className="absolute -right-2 md:right-0.5 -top-2 md:top-0.5 xs:opacity-100 md:opacity-0 flex w-fit h-4 md:h-6 items-center justify-center m-0 md:p-0.5 group-hover:opacity-80 transition-all duration-200">
                  <FileDownload
                    className={"w-full h-full ring-1 ring-white px-1"}
                  />
                </div>

              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
