"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import Kbd from "@/components/ui/Kbd"
import { useFocusTrap } from "@/lib/useFocusTrap"

// Reduced motion: the CSS in globals.css drops the transitions, so the
// close timeout only has to outlive the longest one (200ms).
const EXIT_MS = 200

// Keyboard-shortcuts help. Loaded lazily by Shortcuts on the first "?"; it
// then stays mounted and animates with plain CSS (`data-state`), no motion.
export default function HelpDialog({ open, onClose }) {
  const t = useTranslations("Shortcuts")
  const dialogRef = useRef(null)
  // "closed" | "open" | "closing" — closing keeps the DOM for the fade-out.
  const [phase, setPhase] = useState(open ? "open" : "closed")

  // Phase follows `open` during render; only the fade-out end needs a timer.
  if (open && phase !== "open") setPhase("open")
  if (!open && phase === "open") setPhase("closing")
  useEffect(() => {
    if (phase !== "closing") return undefined
    const timer = setTimeout(() => setPhase("closed"), EXIT_MS)
    return () => clearTimeout(timer)
  }, [phase])

  // Page behind goes inert, Tab stays inside, focus returns to the opener.
  useFocusTrap(dialogRef, phase === "open")

  useEffect(() => {
    if (phase !== "open") return undefined
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) onClose()
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [phase, onClose])

  if (phase === "closed") return null

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
    <div
      data-help-scrim
      data-state={phase}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background-darker/80 p-6"
    >
      <div
        ref={dialogRef}
        data-help-panel
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
        className="w-full max-w-sm bg-background-dark border border-line-strong rounded-md p-6 outline-none"
      >
        <h2 id="shortcuts-title" className="font-kode text-sm text-ink mb-5">{t("title")}</h2>
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
      </div>
    </div>
  )
}
