import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

import { blur, translate } from "../../animation"
import { useLocale } from "next-intl"

export default function Body({ links, selectedLink, setSelectedLink }) {
  const lang = useLocale()
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

  const getChars = (word) => {
    let chars = []
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      )
    })
    return chars
  }

  return (
    <div ref={containerRef} className="flex flex-col md:flex-row justify-around gap-4 my-8 w-full" role="menu">
      {links.map((link, index) => {
        const { title, href } = link
        const isCurrentLang = lang === title.toLowerCase()
        return (
          <Link
            key={`l_${index}`}
            href={href}
            role="menuitem"
            tabIndex={0}
            className="uppercase outline-none group"
          >
            <motion.p
              className={`
                m-0 flex overflow-hidden text-5xl p-3 font-bold
                rounded-xl transition-all duration-200
                group-focus-visible:ring-2 group-focus-visible:ring-green-glow group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background-dark
                ${isCurrentLang
                  ? "bg-green-glow text-background-dark rounded-2xl"
                  : "text-white group-hover:bg-white/10 group-focus-visible:bg-white/10"
                }
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
              {getChars(title)}
            </motion.p>
          </Link>
        )
      })}
    </div>
  )
}
