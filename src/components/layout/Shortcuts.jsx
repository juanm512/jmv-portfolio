"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import Kbd from "@/components/ui/Kbd"
import { useTranslations } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useLanguageToggle } from "@/lib/useLanguageToggle"
import { toggleTvMenu } from "@/lib/tvMenuStore"

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
  const reduceMotion = useReducedMotion()

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

      // The help dialog owns Escape while open: it closes only the dialog.
      if (helpOpen) {
        if (event.key === "Escape") {
          event.preventDefault()
          event.stopPropagation()
          setHelpOpen(false)
        }
        return
      }

      const lightboxOpen = !!document.querySelector("[data-lightbox-open]")

      // Escape always toggles the TV menu, unless the lightbox owns it.
      if (event.key === "Escape") {
        if (lightboxOpen) return
        toggleTvMenu()
        return
      }

      // While the TV menu is open, it owns all keyboard input (including "?",
      // so the help scrim never stacks on top of the menu scrim).
      if (document.body.dataset.menuOpen === "true") return

      // Global shortcuts
      if (event.key === "l" || event.key === "L") {
        toggleLanguage()
        return
      }

      if (event.key === "?") {
        event.preventDefault()
        setHelpOpen(true)
        return
      }

      if (event.key === "Backspace" && !isHome && !lightboxOpen) {
        event.preventDefault()
        router.push("/")
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
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [helpOpen, isHome, moveFocus, router, toggleLanguage])

  // The TV menu forwards "?" here after closing itself.
  useEffect(() => {
    const openHelp = () => setHelpOpen(true)
    window.addEventListener("shortcuts:help", openHelp)
    return () => window.removeEventListener("shortcuts:help", openHelp)
  }, [])

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

  // keys: alternatives for the same action are rendered as separate keycaps.
  const shortcuts = [
    { keys: ["J", "↓"], label: t("moveDown") },
    { keys: ["K", "↑"], label: t("moveUp") },
    { keys: ["Enter"], label: t("open") },
    { keys: ["←", "→"], label: t("prevNext") },
    { keys: ["L"], label: t("language") },
    { keys: ["Esc"], label: t("back") },
    { keys: ["Backspace"], label: t("backHome") },
    { keys: ["W", "A", "S", "D"], label: t("menuNav") },
    { keys: ["?"], label: t("help") }
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
          transition={{ duration: reduceMotion ? 0 : 0.15 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background-darker/80 p-6"
        >
          <motion.div
            ref={dialogRef}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm bg-background-dark border border-line-strong rounded-md p-6"
          >
            <h2 className="font-kode text-sm text-ink mb-5">{t("title")}</h2>
            <ul className="flex flex-col gap-3">
              {shortcuts.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-ink-2">{s.label}</span>
                  <span className="flex items-center gap-1 shrink-0">
                    {s.keys.map((k) => (
                      <Kbd key={k}>{k}</Kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
