"use client"
import { AnimatePresence, motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useLocale, useTranslations } from "next-intl"

export default function Index() {
  const lang = useLocale()
  const t = useTranslations("Description")

  const container = useRef(null)
  const isInView = useInView(container)

  const [hovered, setHovered] = useState("")
  const [redirect, setRedirect] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  const size = hovered != "" ? 200 : 50

  const updateMousePosition = (e) => {
    setMousePosition({ x: e.clientX, y: e.pageY })
  }

  useEffect(() => {
    container.current.addEventListener("mousemove", updateMousePosition)
    return () =>
      container.current?.removeEventListener("mousemove", updateMousePosition)
  }, [])

  return (
    <>
      <main className="min-h-screen flex justify-center items-center px-4 md:px-16">
        <div
          id="about_me"
          ref={container}
          className="w-full md:w-11/12 flex flex-col gap-8 text-2xl py-64"
        >
          <h2
            className="mb-6 px-2 py-1 bg-white w-fit text-red-700 text-5xl underline underline-offset-2"
            onMouseLeave={() => setHovered("")}
            onMouseEnter={() => setHovered("/Landing.png")}
          >
            {t("title")}
          </h2>
          <p className="">{t("first_p")}</p>
          <p className="">
            {t("second_p.first")}{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() =>
                setHovered("/education/logo_facultad_ingenieria.png")
              }
            >
              Facultad de Ingenieria de la UNLP
            </span>
            {t("second_p.second")}{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() => setHovered("/education/logo-informatica.png")}
            >
              Facultad de Informatica de la UNLP
            </span>
            {". "}
            {t("second_p.third")}{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() =>
                setHovered("/education/FreeCodeCamp_logo.png")
              }
            >
              FreeCodeCamp
            </span>{" "}
            {t("second_p.fourth")}{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() =>
                setHovered("/education/MDN_Web_Docs-Logo.svg")
              }
            >
              MDN Web Docs
            </span>
            {"."}
          </p>
          <p className="">
            {t("third_p.first")}{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() => setHovered("/languages/brand-javascript.png")}
            >
              JavaScript
            </span>
            -{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() => setHovered("/languages/brand-typescript.png")}
            >
              TypeScript
            </span>
            {t("third_p.second")}{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() => setHovered("/languages/brand-nextjs.png")}
            >
              NextJS
            </span>
            ,{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() => setHovered("/languages/brand-react.png")}
            >
              ReactJS
            </span>{" "}
            {t("third_p.third")}{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() => setHovered("/languages/brand-nodejs.png")}
            >
              NodeJS
            </span>{" "}
            {t("third_p.fourth")}{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() => setHovered("/languages/brand-java.png")}
            >
              Java
            </span>
            ,{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() => setHovered("/languages/sql.png")}
            >
              SQL
            </span>
            ,{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() => setHovered("/languages/brand-mongodb.png")}
            >
              MongoDB
            </span>{" "}
            {t("third_p.fifth")}{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() => setHovered("/languages/brand-rust.png")}
            >
              Rust
            </span>
            .<br />
            {t("third_p.sixth")}{" "}
            <Link
              target="_blank"
              href="https://www.framer.com/motion/"
              className="mx-1 text-red-200"
              onMouseLeave={() => setRedirect("")}
              onMouseEnter={() => setRedirect("https://www.framer.com/motion/")}
            >
              Framer-Motion
            </Link>
            ,
            <Link
              target="_blank"
              href="https://threejs.org/"
              className="mx-1 text-red-200"
              onMouseLeave={() => setRedirect("")}
              onMouseEnter={() => setRedirect("https://threejs.org/")}
            >
              ThreeJS
            </Link>{" "}
            {t("third_p.seventh")}{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() => setHovered("/languages/brand-blender.png")}
            >
              Blender
            </span>
            .
          </p>
          <p className="">
            {t("fourth_p.first")}{" "}
            <Link
              target="_blank"
              href="https://es.wikipedia.org/wiki/Modelo_de_lenguaje_grande"
              className="mx-1 text-red-200"
              onMouseLeave={() => setRedirect("")}
              onMouseEnter={() =>
                setRedirect(
                  "https://es.wikipedia.org/wiki/Modelo_de_lenguaje_grande"
                )
              }
            >
              {" "}
              LLMs{" "}
            </Link>
            {t("fourth_p.second")}{" "}
            <span
              className="bg-white text-red-700"
              onMouseLeave={() => setHovered("")}
              onMouseEnter={() => setHovered("/languages/ollama.png")}
            >
              Ollama
            </span>{" "}
            {t("fourth_p.third")}{" "}
            <Link
              target="_blank"
              href="https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/"
              className="mx-1 text-red-200"
              onMouseLeave={() => setRedirect("")}
              onMouseEnter={() =>
                setRedirect(
                  "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/"
                )
              }
            >
              Gaussian Splatting
            </Link>
            .
          </p>
        </div>
      </main>
      <AnimatePresence mode="wait">
        {isInView && (
          <motion.div
            className={
              "absolute z-10 p-2 overflow-hidden backdrop-invert pointer-events-none shadow-md shadow-red-500 transition-colors" +
              (hovered != "" ? " bg-red-300/80 " : " bg-red-600/80 ")
            }
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              left: `${mousePosition.x - size / 4}px`,
              top: `${mousePosition.y - size / 4}px`,
              width: `${size}px`,
              height: `${(size * 2) / 3}px`
            }}
            closed={{
              scale: 0,
              transition: { duration: 0.2 }
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
          >
            {redirect != "" && (
              <svg
                className="mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="square"
              >
                <path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                />
                <path d="M17 7l-10 10" />
                <path d="M8 7l9 0l0 9" />
              </svg>
            )}
            {hovered != "" && (
              <Image
                src={`${hovered}`}
                fill={true}
                alt="image"
                loading="lazy"
                className="px-1 object-contain drop-shadow-lg h-full"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
