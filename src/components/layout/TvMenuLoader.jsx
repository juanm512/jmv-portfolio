"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { subscribeTvMenu } from "@/lib/tvMenuStore"

// The TV menu (with its motion dependency) is not part of the first load:
// its chunk is fetched the first time the menu is asked to open, and the
// component stays mounted from then on so later opens are instant.
const TvMenu = dynamic(() => import("@/components/layout/TvMenu"), { ssr: false })

export default function TvMenuLoader({ projects }) {
  // `null` until the first open; then { opener } so TvMenu opens on mount.
  const [first, setFirst] = useState(null)

  useEffect(() => {
    if (first) return undefined
    const start = (opener) => setFirst({ opener: opener || null })
    return subscribeTvMenu({ onOpen: start, onToggle: () => start(null) })
  }, [first])

  if (!first) return null
  return <TvMenu projects={projects} initialOpen initialOpener={first.opener} />
}
