import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

import { blur, translate } from "../../animation"
import { useTranslations } from "next-intl"

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setActiveFalse
}) {
  const t = useTranslations("Header")
  const containerRef = useRef(null)

  // Auto-focus first item on mount + arrow key navigation
  useEffect(() => {
    const items = containerRef.current?.querySelectorAll("[role='menuitem']")
    if (items?.length) items[0].focus()

    const handleKey = (e) => {
      const items = containerRef.current?.querySelectorAll("[role='menuitem']")
      if (!items?.length) return

      const currentIndex = Array.from(items).indexOf(document.activeElement)
      if (currentIndex === -1) return

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault()
        const next = (currentIndex + 1) % items.length
        items[next].focus()
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        const prev = (currentIndex - 1 + items.length) % items.length
        items[prev].focus()
      }
    }

    containerRef.current?.addEventListener("keydown", handleKey)
    const ref = containerRef.current
    return () => ref?.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <div ref={containerRef} className="flex flex-wrap mt-4" role="menu">
      {links.map((link, index) => {
        const { title, href } = link
        return (
          <Link
            onClick={setActiveFalse}
            key={`l_${index}`}
            href={href}
            role="menuitem"
            tabIndex={0}
            className="text-white uppercase outline-none group"
          >
            <motion.p
              className={`
                m-0 flex overflow-hidden text-3xl pr-8 md:pr-10 pt-2 font-medium
                rounded-xl px-3 py-1
                transition-colors duration-150
                group-focus-visible:ring-2 group-focus-visible:ring-green-glow group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background-dark
                group-hover:bg-white/10 group-focus-visible:bg-white/10
              `}
              onMouseOver={() => {
                setSelectedLink({ isActive: true, index })
              }}
              onMouseLeave={() => {
                setSelectedLink({ isActive: false, index })
              }}
              onFocus={() => {
                setSelectedLink({ isActive: true, index })
              }}
              onBlur={() => {
                setSelectedLink({ isActive: false, index })
              }}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index != index
                  ? "open"
                  : "closed"
              }
            >
              <motion.span
                custom={[index * 0.05, index * 0.02]}
                variants={translate}
                initial="initial"
                animate="enter"
                exit="exit"
                key={title + index}
              >
                {t(title)}
              </motion.span>
            </motion.p>
          </Link>
        )
      })}
    </div>
  )
}
