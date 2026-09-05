"use client"

import { useSyncExternalStore } from "react"

function makeMQ(query) {
  const subscribe = (cb) => {
    if (typeof window === "undefined" || !window.matchMedia) return () => {}
    const mq = window.matchMedia(query)
    mq.addEventListener("change", cb)
    return () => mq.removeEventListener("change", cb)
  }
  const get = () =>
    typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : false
  return { subscribe, get }
}

const COARSE = makeMQ("(pointer: coarse)")
const REDUCED = makeMQ("(prefers-reduced-motion: reduce)")
const MD = makeMQ("(min-width: 768px)")

// True only on the client, for a fine pointer without a reduced-motion
// preference. The server snapshot is false so nothing pointer-driven is SSR'd.
export function useFinePointer() {
  const coarse = useSyncExternalStore(COARSE.subscribe, COARSE.get, () => true)
  const reduced = useSyncExternalStore(REDUCED.subscribe, REDUCED.get, () => true)
  return !coarse && !reduced
}

export function useReducedMotionMQ() {
  return useSyncExternalStore(REDUCED.subscribe, REDUCED.get, () => false)
}

// "desktop" = fine pointer at md and up (hover/focus drives the popover);
// "mobile" = everything else (the row crossing the viewport middle drives it).
export function usePopoverMode() {
  const coarse = useSyncExternalStore(COARSE.subscribe, COARSE.get, () => false)
  const md = useSyncExternalStore(MD.subscribe, MD.get, () => true)
  return !coarse && md ? "desktop" : "mobile"
}
