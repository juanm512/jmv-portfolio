// Tiny module-level pub/sub so the Navbar button, Shortcuts and TvMenu
// can coordinate open/close without prop drilling or context.
const TOGGLE_EVENT = "tvmenu:toggle"
const OPEN_EVENT = "tvmenu:open"
const CLOSE_EVENT = "tvmenu:close"

// `opener` (optional element) gets focus back when the menu closes.
export function openTvMenu(opener) {
  if (typeof window === "undefined") return
  const detail = opener instanceof Element ? opener : null
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail }))
}

export function closeTvMenu() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(CLOSE_EVENT))
}

export function toggleTvMenu() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(TOGGLE_EVENT))
}

export function subscribeTvMenu({ onOpen, onClose, onToggle }) {
  if (typeof window === "undefined") return () => {}
  const handleOpen = (event) => onOpen?.(event.detail || null)
  const handleClose = () => onClose?.()
  const handleToggle = () => onToggle?.()
  window.addEventListener(OPEN_EVENT, handleOpen)
  window.addEventListener(CLOSE_EVENT, handleClose)
  window.addEventListener(TOGGLE_EVENT, handleToggle)
  return () => {
    window.removeEventListener(OPEN_EVENT, handleOpen)
    window.removeEventListener(CLOSE_EVENT, handleClose)
    window.removeEventListener(TOGGLE_EVENT, handleToggle)
  }
}

export function isTvMenuOpen() {
  if (typeof document === "undefined") return false
  return document.body.dataset.menuOpen === "true"
}
