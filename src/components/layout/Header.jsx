"use client"

import dynamic from "next/dynamic"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

const Nav = dynamic(() => import("@/components/Header/Nav"), {
  ssr: false
})
const LanguageChanger = dynamic(() => import("@/components/Header/LanguageChanger"), {
  ssr: false
})

// Animation variants
const opacity = {
  initial: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.15, ease: "easeOut" } },
  closed: { opacity: 0, transition: { duration: 0.1, ease: "easeIn" } }
}

const backdropVariants = {
  initial: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  closed: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
}

export default function Header({ lang }) {
  const t = useTranslations("Header")
  const [isActive, setIsActive] = useState(false)
  const [languageChange, setLanguageChange] = useState(false)
  const navPanelRef = useRef(null)
  const langPanelRef = useRef(null)
  const menuButtonRef = useRef(null)
  const langButtonRef = useRef(null)

  const isAnyOpen = isActive || languageChange

  // Close whichever menu is open on Escape
  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      if (isActive) {
        setIsActive(false)
        menuButtonRef.current?.focus()
      } else if (languageChange) {
        setLanguageChange(false)
        langButtonRef.current?.focus()
      } else {
        // Only open menu if no lightbox is active
        if (!document.querySelector('[data-lightbox-open]')) {
          setIsActive(true)
        }
      }
      return
    }

    // "L" shortcut — only when not typing in an input
    if (
      (event.key === "l" || event.key === "L") &&
      !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)
    ) {
      setLanguageChange((prev) => {
        if (!prev) setIsActive(false)
        return !prev
      })
    }
  }, [isActive, languageChange])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Lock body scroll when a menu is open
  useEffect(() => {
    if (isAnyOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isAnyOpen])

  return (
    <div className="fixed w-full p-3 box-border z-[100] pointer-events-none">
      {/* Buttons row */}
      <div className="pointer-events-auto flex justify-center gap-3 uppercase text-md">
        {/* Menu Button */}
        <motion.button
          ref={menuButtonRef}
          onClick={() => {
            setIsActive((prev) => {
              if (!prev) setLanguageChange(false)
              return !prev
            })
          }}
          variants={opacity}
          initial="initial"
          animate="open"
          whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.96, transition: { duration: 0.05 } }}
          aria-expanded={isActive}
          aria-controls="nav-panel"
          aria-label={isActive ? t("close") : "Menu"}
          className={`
            flex items-center gap-3 px-4 py-2.5 rounded-full
            transition-all duration-200 outline-none
            focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark
            ${isActive
              ? "bg-green-glow text-background-dark shadow-lg shadow-green-glow/25"
              : "bg-background-dark/60 backdrop-blur-lg text-white border border-white/10 hover:border-green-glow/40 hover:bg-background-dark/80"
            }
          `}
        >
          <div
            className={`sm:hidden block burger ${isActive ? "burgerActive" : ""}`}
          />
          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.span
                key="menu-label"
                className="font-semibold text-sm tracking-wider"
                variants={opacity}
                initial="initial"
                animate="open"
                exit="closed"
              >
                {t("menu")}
              </motion.span>
            ) : (
              <motion.span
                key="close-label"
                className="font-semibold text-sm tracking-wider"
                variants={opacity}
                initial="initial"
                animate="open"
                exit="closed"
              >
                {t("close")}
              </motion.span>
            )}
          </AnimatePresence>
          <span className="hidden sm:flex text-[10px] font-mono ring-1 ring-current/30 px-1.5 py-0.5 rounded-md opacity-60">
            Esc
          </span>
        </motion.button>

        {/* Language Button */}
        <motion.button
          ref={langButtonRef}
          onClick={() => {
            setLanguageChange((prev) => {
              if (!prev) setIsActive(false)
              return !prev
            })
          }}
          variants={opacity}
          initial="initial"
          animate="open"
          whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.96, transition: { duration: 0.05 } }}
          aria-expanded={languageChange}
          aria-controls="lang-panel"
          aria-label="Change language"
          className={`
            flex items-center gap-2 px-3.5 py-2.5 rounded-full
            transition-all duration-200 outline-none
            focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark
            ${languageChange
              ? "bg-green-glow text-background-dark shadow-lg shadow-green-glow/25"
              : "bg-background-dark/60 backdrop-blur-lg text-white border border-white/10 hover:border-green-glow/40 hover:bg-background-dark/80"
            }
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 5h7" />
            <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
            <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
            <path d="M12 20l4 -9l4 9" />
            <path d="M19.1 18h-6.2" />
          </svg>
          <span className="hidden sm:flex text-[10px] font-mono ring-1 ring-current/30 px-1.5 py-0.5 rounded-md opacity-60">
            L
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`sm:hidden transition-transform duration-200 ${languageChange ? "rotate-180" : ""}`}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 9l6 6l6 -6" />
          </svg>
        </motion.button>
      </div>

      {/* Full-screen backdrop */}
      <AnimatePresence>
        {isAnyOpen && (
          <motion.div
            key="backdrop"
            onClick={() => {
              setIsActive(false)
              setLanguageChange(false)
            }}
            variants={backdropVariants}
            initial="initial"
            animate="open"
            exit="closed"
            className="fixed inset-0 -z-10 pointer-events-auto bg-black/65 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      {/* Nav Panel */}
      <AnimatePresence mode="wait">
        {isActive && (
          <div id="nav-panel" ref={navPanelRef} role="dialog" aria-label="Navigation menu" className="pointer-events-auto">
            <Nav setActiveFalse={() => {
              setIsActive(false)
              menuButtonRef.current?.focus()
            }} />
          </div>
        )}
      </AnimatePresence>

      {/* Language Panel */}
      <AnimatePresence mode="wait">
        {languageChange && (
          <div id="lang-panel" ref={langPanelRef} role="dialog" aria-label="Language selection" className="pointer-events-auto">
            <LanguageChanger lang={lang} />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
