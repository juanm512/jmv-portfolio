"use client"

import { useOpenLightbox } from "@/components/projects/LightboxProvider"

export const focusRing =
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"

// Every clickable figure is a real button: keyboard reachable, labelled.
// `fill` images need a positioned box, which the button itself provides.
export default function ZoomButton({ label, src, type = "image", alt = "", className = "", children }) {
  const open = useOpenLightbox()
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => open(src, type, alt)}
      className={`block w-full text-left cursor-zoom-in ${focusRing} ${className}`}
    >
      {children}
    </button>
  )
}
