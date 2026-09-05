"use client"

import { useSyncExternalStore } from "react"

function makeMQ(query) {
  const subscribe = (cb) => {
    const mq = window.matchMedia(query)
    mq.addEventListener("change", cb)
    return () => mq.removeEventListener("change", cb)
  }
  const get = () => window.matchMedia(query).matches
  return { subscribe, get }
}

const COARSE = makeMQ("(pointer: coarse)")
const REDUCED = makeMQ("(prefers-reduced-motion: reduce)")

// false on the server / first paint; true only for fine pointers without
// reduced-motion preference.
export function useFinePointer() {
  const coarse = useSyncExternalStore(COARSE.subscribe, COARSE.get, () => true)
  const reduced = useSyncExternalStore(REDUCED.subscribe, REDUCED.get, () => true)
  const touch =
    typeof navigator !== "undefined" && navigator.maxTouchPoints > 0 && coarse
  return !coarse && !reduced && !touch
}

export function useReducedMotionMQ() {
  return useSyncExternalStore(REDUCED.subscribe, REDUCED.get, () => false)
}

// Collects interactive element rects (a, button, [data-magnet]) — refreshed on
// scroll/resize by the caller.
export function collectTargets(root = document) {
  return Array.from(root.querySelectorAll("a, button, [data-magnet]")).filter(
    (el) => !el.closest("[data-lab-ignore]")
  )
}
