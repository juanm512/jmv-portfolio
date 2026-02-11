"use client"

import dynamic from "next/dynamic"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

const Nav = dynamic(() => import("@/components/Header/Nav"), {
  ssr: false
})
const LanguageChanger = dynamic(() => import("@/components/Header/LanguageChanger"), {
  ssr: false
})

// Animation variants - más rápidas
const opacity = {
  initial: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.15, ease: "easeOut" } },
  closed: { opacity: 0, transition: { duration: 0.1, ease: "easeIn" } }
}

const background = {
  initial: { opacity: 0 },
  open: { opacity: 0.6, transition: { duration: 0.2 } },
  closed: { opacity: 0, transition: { duration: 0.15 } }
}

export default function Header({ lang }) {
  const t = useTranslations("Header")
  const [isActive, setIsActive] = useState(false)
  const [languageChange, setLanguageChange] = useState(false)

  // menus key handler
  const handleKeyPressed = useCallback((event) => {
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
    }
  }, [])

  useEffect(() => {
    window.addEventListener("keyup", handleKeyPressed)
    return () => window.removeEventListener("keyup", handleKeyPressed)
  }, [handleKeyPressed])

  return (
    <div className="fixed w-full p-3 box-border z-[100] pointer-events-none">
      <div className="pointer-events-auto flex justify-center gap-4 uppercase text-md">
        {/* Menu Button */}
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
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
          className={`flex items-center justify-center gap-8 transition-colors duration-200 ${
            isActive 
              ? 'bg-green-glow text-background-dark' 
              : 'bg-background-dark/50 backdrop-blur-md text-white border border-green-glow/20 hover:border-green-glow/50'
          }`}
        >
          <div className="relative flex flex-row-reverse gap-4 px-3 py-2 items-center transition-all duration-200">
            <AnimatePresence mode="wait">
              {!isActive ? (
                <motion.p
                  className="m-0 font-semibold text-sm tracking-wider"
                  variants={opacity}
                  initial="initial"
                  animate="open"
                  exit="closed"
                >
                  Menu
                </motion.p>
              ) : (
                <motion.p
                  className="m-0 font-semibold text-sm tracking-wider"
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
                isActive ? "burgerActive" : ""
              }`}
            />
            <p className="hidden sm:flex m-0 text-xs font-mono ring-1 ring-current px-1.5 py-0.5 rounded">
              Esc
            </p>
          </div>
        </motion.button>

        {/* Language Button */}
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
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
          className={`flex items-center justify-center gap-8 transition-colors duration-200 ${
            languageChange 
              ? 'bg-green-glow text-background-dark' 
              : 'bg-background-dark/50 backdrop-blur-md text-white border border-green-glow/20 hover:border-green-glow/50'
          }`}
        >
          <div className="relative flex flex-row-reverse gap-4 px-3 py-2 items-center transition-all duration-200">
            <span className="sr-only">Language change</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="square"
              strokeLinejoin="square"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 5h7" />
              <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
              <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
              <path d="M12 20l4 -9l4 9" />
              <path d="M19.1 18h-6.2" />
            </svg>
            <p className="hidden sm:flex m-0 text-xs font-mono ring-1 ring-current px-1.5 py-0.5 rounded">
              L
            </p>
            <p
              className={
                "sm:hidden flex m-0 text-sm font-semibold transition-transform duration-150" +
                (languageChange ? " rotate-180" : "")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="square"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 9l6 6l6 -6" />
              </svg>
            </p>
          </div>
        </motion.button>
      </div>

      {/* Backdrop */}
      <motion.div
        onClick={() => {
          setIsActive(false)
          setLanguageChange(false)
        }}
        variants={background}
        initial="initial"
        animate={isActive || languageChange ? "open" : "closed"}
        className="fixed inset-0 bg-background-dark backdrop-blur-sm -z-10 pointer-events-auto"
        style={{ opacity: 0 }}
      />

      {/* Nav Menu */}
      <AnimatePresence mode="wait">
        {isActive && <Nav setActiveFalse={() => setIsActive(false)} />}
      </AnimatePresence>

      {/* Language Menu */}
      <AnimatePresence mode="wait">
        {languageChange && <LanguageChanger lang={lang} />}
      </AnimatePresence>
    </div>
  )
}
