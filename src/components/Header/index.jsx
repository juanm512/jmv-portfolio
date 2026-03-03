"use client"
import dynamic from "next/dynamic"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { opacity, background, translate } from "./animation.js"
import { useTranslations } from "next-intl"

const Nav = dynamic(() => import("./Nav"), {
  ssr: false
})
const LanguageChanger = dynamic(() => import("./LanguageChanger"), {
  ssr: false
})
// import Nav from "./Nav"
// import LanguageChanger from "./LanguageChanger"

export default function Index({ lang }) {
  const t = useTranslations("Header")

  const [isActive, setIsActive] = useState(false)
  const [languageChange, setLanguageChange] = useState(false)

  // menus key handler
  const handleKeyPressed = useCallback((event) => {
    // console.log(`key pressed: `, event)
    if (event.key == "Escape" || event.keyCode == 27) {
      setIsActive((prev) => {
        if (!prev) setLanguageChange(false)
        return !prev
      })
    } else if (event.key == "l" || event.key == "L" || event.keyCode == 76) {
      setLanguageChange((prev) => {
        if (!prev) setIsActive(false)
        return !prev
      })
    } else return
  })

  useEffect(() => {
    window.addEventListener("keyup", handleKeyPressed)
    return () => window.removeEventListener("keyup", handleKeyPressed)
  }, [handleKeyPressed])

  return (
    <div className="backdrop-blur-lg fixed w-screen p-3 box-border z-20">
      <div className="relative flex justify-center gap-4 uppercase text-md">
        <motion.button
          onClick={() =>
            setIsActive((prev) => {
              if (!prev) setLanguageChange(false)
              return !prev
            })
          }
          variants={opacity}
          initial="initial"
          animate="open"
          whileHover={{
            scale: 1.1
          }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center gap-8 ${isActive ? 'bg-white text-black' : 'text-white'}`}
        >
          <div className="relative flex flex-row-reverse gap-4 px-2 py-1 items-center transition-all duration-300 hover:ring-2 ring-white">
            <AnimatePresence mode="wait">
              {!isActive ? (
                <motion.p
                  className="m-0 font-semibold"
                  variants={opacity}
                  initial="initial"
                  animate="open"
                  exit="closed"
                >
                  {t("menu")}
                </motion.p>
              ) : (
                <motion.p
                  className="m-0 font-semibold"
                  variants={opacity}
                  initial="initial"
                  animate="open"
                  exit="closed"
                >
                  {t("close")}
                </motion.p>
              )}
            </AnimatePresence>
            <div
              className={`sm:hidden block burger ${
                isActive ? "burgerActive " : ""
              }`}
            />
            <p className="hidden sm:flex m-0 text-sm font-normal ring-1 ring-white px-1">
              Esc
            </p>
          </div>
        </motion.button>
        <motion.button
          onClick={() =>
            setLanguageChange((prev) => {
              if (!prev) setIsActive(false)
              return !prev
            })
          }
          variants={opacity}
          initial="initial"
          animate="open"
          whileHover={{
            scale: 1.1
          }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center gap-8 ${languageChange ? 'bg-white text-black' : 'text-white'}`}
        >
          <div className="relative flex flex-row-reverse gap-4 px-2 py-1 items-center transition-all duration-300 hover:ring-2 ring-white">
            <span className="sr-only">Language change</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=""
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
              <path d="M4 5h7" />
              <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
              <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
              <path d="M12 20l4 -9l4 9" />
              <path d="M19.1 18h-6.2" />
            </svg>
            <p className="hidden sm:flex m-0 text-sm font-semibold ring-1 ring-white px-1">
              L
            </p>
            <p
              className={
                "sm:hidden flex m-0 text-sm font-semibold transition-transform duration-75 delay-75" +
                (languageChange ? " rotate-180 stroke-black" : " stroke-white")
              }
            >
              <svg
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
                <path d="M6 9l6 6l6 -6" />
              </svg>
            </p>
          </div>
        </motion.button>
      </div>
      <motion.div
        onClick={() => {
          setIsActive(false)
          setLanguageChange(false)
        }}
        variants={background}
        initial="initial"
        animate={isActive || languageChange ? "open" : "closed"}
        className="absolute h-screen w-full bg-black backdrop-blur opacity-50 left-0 top-full will-change-auto"
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setActiveFalse={() => setIsActive(false)} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {languageChange && <LanguageChanger lang={lang} />}
      </AnimatePresence>
    </div>
  )
}
