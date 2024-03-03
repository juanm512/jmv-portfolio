"use client"
import Image from "next/image"
import { useState } from "react"

export default function ImageResp({ id, imgSrc }) {
  const [zoom, setZoom] = useState(false)
  return (
    <Image
      onClick={(e) => {
        if (
          e.currentTarget.naturalHeight >= e.currentTarget.clientHeight &&
          window.innerWidth > 400
        ) {
          setZoom(true)
          e.currentTarget.style.cursor = "zoom-out"
        }
        if (zoom) {
          setZoom(false)
          e.currentTarget.style.cursor = "zoom-in"
        }
      }}
      onLoad={(e) => {
        console.log(
          window.innerWidth,
          e.currentTarget.naturalWidth,
          e.currentTarget.clientHeight,
          e.currentTarget.naturalHeight
        )
        if (
          e.currentTarget.naturalHeight >= e.currentTarget.clientHeight &&
          window.innerWidth > 400
        )
          e.currentTarget.style.cursor = "zoom-in"
        //     e.currentTarget.style.transform = "scale(2)"
        //   else e.currentTarget.style.transform = "scale(1)"
      }}
      src={imgSrc}
      alt={id + " - Image "}
      width={1600}
      height={1600}
      quality={100}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
      style={{
        width: zoom ? "100%" : "fit-content",
        height: zoom ? "auto" : "100dvh",
        transform: zoom ? "translateY(50%)" : ""
      }}
      className={
        "object-contain"
        // +
        // (zoom
        //   ? " h-auto object-top scale-[2] cursor-zoom-out"
        //   : " w-fit h-screen cursor-zoom-in object-center")
      }
    />
  )
}
