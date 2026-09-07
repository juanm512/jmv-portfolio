"use client"

import { useCallback, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useLanguageToggle } from "@/lib/useLanguageToggle"
import { toggleTvMenu } from "@/lib/tvMenuStore"

// The help dialog only ships once "?" is pressed for the first time.
const HelpDialog = dynamic(() => import("@/components/layout/HelpDialog"), { ssr: false })

function isTypingTarget(el) {
  if (!el) return false
  const tag = el.tagName
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable
}

function getProjectRows() {
  return Array.from(document.querySelectorAll("[data-project-row]"))
}

// Hooks only: global key handling. Rendering is delegated to HelpDialog.
export default function Shortcuts() {
  const router = useRouter()
  const pathname = usePathname()
  const { toggleLanguage } = useLanguageToggle()
  const [helpOpen, setHelpOpen] = useState(false)
  // Once loaded, the dialog stays mounted (it handles its own fade-out).
  const [helpLoaded, setHelpLoaded] = useState(false)
  const openHelp = useCallback(() => {
    setHelpLoaded(true)
    setHelpOpen(true)
  }, [])
  const closeHelp = useCallback(() => setHelpOpen(false), [])

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
        openHelp()
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
  }, [helpOpen, isHome, moveFocus, openHelp, router, toggleLanguage])

  // The TV menu forwards "?" here after closing itself.
  useEffect(() => {
    window.addEventListener("shortcuts:help", openHelp)
    return () => window.removeEventListener("shortcuts:help", openHelp)
  }, [openHelp])

  if (!helpLoaded) return null
  return <HelpDialog open={helpOpen} onClose={closeHelp} />
}
