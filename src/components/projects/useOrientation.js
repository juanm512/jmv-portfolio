"use client"

import { useState } from "react"

// Orientation is decided per image from its natural size once it loads.
// Portrait (phone screenshots) is the safe default: `contain` never crops.
export function useOrientation(initial = "portrait") {
  const [orientation, setOrientation] = useState(initial)
  const onLoad = (event) => {
    const img = event.currentTarget
    if (img.naturalWidth && img.naturalHeight) {
      setOrientation(img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait")
    }
  }
  return [orientation, onLoad]
}
