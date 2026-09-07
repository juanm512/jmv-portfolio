"use client"

import { createContext, useCallback, useContext, useState } from "react"
import dynamic from "next/dynamic"

// The lightbox (state + focus trap + motion) ships only after the first
// zoom; it then stays mounted so it can animate its own exit.
const Lightbox = dynamic(() => import("@/components/projects/Lightbox"), { ssr: false })

const LightboxContext = createContext(() => {})

export function useOpenLightbox() {
  return useContext(LightboxContext)
}

// Wraps the server-rendered project page: ZoomButtons anywhere inside call
// `open(src, type, alt)`; the provider owns the selected media.
export default function LightboxProvider({ labels, children }) {
  const [media, setMedia] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const open = useCallback((src, type = "image", alt = "") => {
    setLoaded(true)
    setMedia({ src, type, alt })
  }, [])
  const close = useCallback(() => setMedia(null), [])

  return (
    <LightboxContext.Provider value={open}>
      {loaded && <Lightbox media={media} onClose={close} labels={labels} />}
      {children}
    </LightboxContext.Provider>
  )
}
