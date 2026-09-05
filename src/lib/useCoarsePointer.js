"use client"

import { useSyncExternalStore } from "react"

const QUERY = "(pointer: coarse)"

function subscribe(callback) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {}
  const mql = window.matchMedia(QUERY)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

function getSnapshot() {
  return typeof window !== "undefined" && window.matchMedia ? window.matchMedia(QUERY).matches : false
}

function getServerSnapshot() {
  return false
}

// True on touch-first devices. SSR renders the fine-pointer variant, so pair
// this with the CSS `pointer-coarse:` variant for a flash-free fallback.
export function useCoarsePointer() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
