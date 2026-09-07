"use client"

import Image from "next/image"
import ZoomButton from "@/components/projects/ZoomButton"
import { useOrientation } from "@/components/projects/useOrientation"

// Portrait shots (phones) sit in 9/16 cells with `contain`; landscape shots
// span the row at 4/3 `cover`. `alt` and `label` come from the server.
export default function GridImage({ src, caption, alt, label }) {
  const [orientation, onLoad] = useOrientation("portrait")
  const portrait = orientation === "portrait"
  return (
    <figure className={portrait ? "" : "sm:col-span-2 lg:col-span-3"}>
      <ZoomButton
        label={label}
        src={src}
        type="image"
        alt={alt}
        className={`relative rounded-sm overflow-hidden ${
          portrait ? "aspect-[9/16] bg-background-darker" : "aspect-[4/3] bg-ink/5"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={portrait ? "(min-width: 1024px) 33vw, 50vw" : "(min-width: 1280px) 1280px, 100vw"}
          onLoad={onLoad}
          className={portrait ? "object-contain" : "object-cover"}
        />
      </ZoomButton>
      {caption && <figcaption className="mt-3 font-mono text-xs text-ink-3">{caption}</figcaption>}
    </figure>
  )
}
