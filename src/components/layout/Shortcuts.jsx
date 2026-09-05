"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useTranslations } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useLanguageToggle } from "@/lib/useLanguageToggle"

function isTypingTarget(el) {
  if (!el) return false
  const tag = el.tagName
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable
}

function getProjectRows() {
  return Array.from(document.querySelectorAll("[data-project-row]"))
}

export default function Shortcuts() {
  const t = useTranslations("Shortcuts")
  const router = useRouter()
  const pathname = usePathname()
  const { toggleLanguage } = useLanguageToggle()
  const [helpOpen, setHelpOpen] = useState(false)
  const dialogRef = useRef(null)

  const isHome = pathname === "/"

  const moveFocus = useCallback((direction) => {
    const rows = getProjectRows()
    if (rows.length === 0) return

    const currentIndex = rows.findIndex((row) => row === document.activeElement || row.contains(document.activeElement))
    let nextIndex
    if (currentIndex === -1) {
      nextIndex = 0
    } else {
      nextIndex = currentIndex + direction
      nextIndex = Math.max(0, Math.min(rows.length - 1, nextIndex))
    }

    const target = rows[nextIndex]
    target?.focus()
    target?.scrollIntoView({ block: "center", behavior: "smooth" })
  }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      if (isTypingTarget(document.activeElement)) return

      if (helpOpen) {
        if (event.key === "Escape") {
          setHelpOpen(false)
        }
        return
      }

      // Global shortcuts
      if (event.key === "l" || event.key === "L") {
        toggleLanguage()
        return
      }

      if (event.key === "a" || event.key === "A") {
        router.push("/about")
        return
      }

      if (event.key === "?") {
        event.preventDefault()
        setHelpOpen(true)
        return
      }

      // Home-only shortcuts
      if (isHome) {
        if (event.key === "j" || event.key === "ArrowDown") {
          event.preventDefault()
          moveFocus(1)
          return
        }
        if (event.key === "k" || event.key === "ArrowUp") {
          event.preventDefault()
          moveFocus(-1)
          return
        }
      }

      // Project-page shortcuts
      const main = document.querySelector("main[data-prev], main[data-next]")
      if (main) {
        if (event.key === "ArrowLeft") {
          const prev = main.getAttribute("data-prev")
          if (prev) router.push(prev)
        } else if (event.key === "ArrowRight") {
          const next = main.getAttribute("data-next")
          if (next) router.push(next)
        } else if (event.key === "Escape") {
          if (!document.querySelector("[data-lightbox-open]")) {
            router.push("/")
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [helpOpen, isHome, moveFocus, router, toggleLanguage])

  useEffect(() => {
    if (!helpOpen) return
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setHelpOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [helpOpen])

  const shortcuts = [
    { key: "J / ↓", label: t("moveDown") },
    { key: "K / ↑", label: t("moveUp") },
    { key: "Enter", label: t("open") },
    { key: "← / →", label: t("prevNext") },
    { key: "A", label: t("about") },
    { key: "L", label: t("language") },
    { key: "Esc", label: t("back") },
    { key: "?", label: t("help") }
  ]

  return (
    <AnimatePresence>
      {helpOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t("title")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
        >
          <div
            ref={dialogRef}
            className="w-full max-w-sm bg-background-darker border border-white/10 rounded-lg p-6"
          >
            <h2 className="font-kode text-sm text-white/90 mb-4 uppercase tracking-wide">
              {t("title")}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {shortcuts.map((s) => (
                <li key={s.label} className="flex items-center justify-between text-sm">
                  <span className="text-white/70">{s.label}</span>
                  <span className="font-mono text-[11px] text-green-glow/90 ring-1 ring-white/15 rounded px-1.5 py-0.5">
                    {s.key}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
