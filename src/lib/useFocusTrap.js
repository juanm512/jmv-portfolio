"use client"

import { useEffect } from "react"

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'

function getFocusable(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
  )
}

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "LINK", "NEXTJS-PORTAL"])

// Shared modal behaviour for the TV menu, the help dialog and the lightbox:
// - the page behind the dialog becomes inert while `active`
// - Tab cycles inside `ref` (or stays put when nothing inside is tabbable)
// - `initialFocus()` picks what receives focus on open (defaults to the
//   container itself, which must then have tabIndex={-1})
// - on close, focus returns to `opener` (or whatever had focus when opened)
export function useFocusTrap(ref, active, { opener, initialFocus } = {}) {
  useEffect(() => {
    if (!active) return undefined
    const container = ref.current
    if (!container) return undefined

    const previous = (opener && opener()) || document.activeElement
    // Everything that is not an ancestor of the dialog goes inert: siblings
    // at every level between the dialog and <body>. The lightbox lives inside
    // <main>, so a plain "header + main" rule would freeze the dialog itself.
    const behind = []
    for (let node = container; node && node !== document.body; node = node.parentElement) {
      for (const sibling of node.parentElement.children) {
        if (sibling === node || SKIP_TAGS.has(sibling.tagName)) continue
        if (sibling.hasAttribute("inert")) continue
        behind.push(sibling)
      }
    }
    behind.forEach((el) => el.setAttribute("inert", ""))

    const target = (initialFocus && initialFocus()) || container
    // Next tick: the dialog is committed, and a timeout (unlike rAF) still
    // fires when the tab is in the background.
    const timer = setTimeout(() => target?.focus?.({ preventScroll: true }), 0)

    const onKeyDown = (event) => {
      if (event.key !== "Tab") return
      const items = getFocusable(container)
      if (items.length === 0) {
        event.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement
      if (event.shiftKey && (current === first || !container.contains(current))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (current === last || !container.contains(current))) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown, true)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("keydown", onKeyDown, true)
      behind.forEach((el) => el.removeAttribute("inert"))
      if (previous && typeof previous.focus === "function" && document.contains(previous)) {
        previous.focus({ preventScroll: true })
      }
    }
    // `opener`/`initialFocus` are read once, when the trap activates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, active])
}
