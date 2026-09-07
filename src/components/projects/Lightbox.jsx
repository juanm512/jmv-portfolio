"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from "motion/react"
import { useFocusTrap } from "@/lib/useFocusTrap"
import { focusRing } from "@/components/projects/ZoomButton"

function Panel({ media, onClose, labels }) {
  const reduceMotion = useReducedMotion()
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  // Focus lands on the close button; Tab stays inside; the page behind is
  // inert; on close, focus returns to the figure button that opened it.
  useFocusTrap(panelRef, true, { initialFocus: () => closeRef.current })

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        e.preventDefault()
        onClose()
      }
    }
    // Capture phase so the lightbox wins over the global Escape handler.
    document.addEventListener("keydown", handleKeyDown, true)
    return () => document.removeEventListener("keydown", handleKeyDown, true)
  }, [onClose])

  return (
    <m.div
      data-lightbox-open
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-[100] bg-background-darker/95 flex items-center justify-center p-4 md:p-12 cursor-pointer"
      onClick={onClose}
    >
      <m.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={media.alt ? `${labels.lightbox}: ${media.alt}` : labels.lightbox}
        initial={reduceMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
        transition={reduceMotion ? { duration: 0.15 } : { type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center cursor-default outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {media.type === "video" ? (
          <video
            src={media.src}
            controls
            autoPlay
            className="max-w-full max-h-full object-contain rounded-sm"
          />
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={media.src}
              alt={media.alt || ""}
              fill
              sizes="100vw"
              className="object-contain"
              quality={100}
            />
          </div>
        )}

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={labels.closeLightbox}
          className={`absolute -top-12 right-0 text-ink-2 hover:text-ink transition-colors p-2 cursor-pointer ${focusRing}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </m.div>
    </m.div>
  )
}

// Stays mounted once loaded; `media` null means closed (exit animation runs).
export default function Lightbox({ media, onClose, labels }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {media && <Panel media={media} onClose={onClose} labels={labels} />}
      </AnimatePresence>
    </LazyMotion>
  )
}
