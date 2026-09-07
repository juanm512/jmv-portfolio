"use client"

import Image from "next/image"
import ZoomButton from "@/components/projects/ZoomButton"
import { useOrientation } from "@/components/projects/useOrientation"

// Hero media below the title, never behind it. `hero.orientation` wins when
// the data declares it; otherwise the natural size decides on load. Landscape
// fills a 16/9 box; portrait gets a centered 9/16 box capped at 70vh.
export default function HeroMedia({ hero, title, label }) {
  const [orientation, onLoad] = useOrientation(hero?.orientation || "landscape")
  const portrait = orientation === "portrait"
  if (!hero?.src) return null

  return (
    <figure className="max-w-7xl mx-auto px-6">
      <ZoomButton
        label={label}
        src={hero.src}
        type={hero.type}
        alt={title}
        className={`relative rounded-sm overflow-hidden ${
          portrait
            ? "aspect-[9/16] max-h-[70vh] mx-auto bg-background-darker"
            : "w-full aspect-video bg-ink/5"
        }`}
      >
        {hero.type === "video" ? (
          <video
            src={hero.src}
            poster={hero.poster}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={hero.src}
            alt={title}
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            onLoad={onLoad}
            className={portrait ? "object-contain" : "object-cover"}
            priority
          />
        )}
      </ZoomButton>
    </figure>
  )
}
