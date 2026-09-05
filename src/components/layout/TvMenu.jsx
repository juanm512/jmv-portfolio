"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import Kbd from "@/components/ui/Kbd"
import { useLocale, useTranslations } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useLanguageToggle } from "@/lib/useLanguageToggle"
import { subscribeTvMenu, closeTvMenu } from "@/lib/tvMenuStore"
import { useCoarsePointer } from "@/lib/useCoarsePointer"
import { useFocusTrap } from "@/lib/useFocusTrap"

const SECTION_IDS = ["pages", "projects", "links", "language"]

export default function TvMenu({ projects = [] }) {
  const t = useTranslations("Menu")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { toggleLanguage } = useLanguageToggle()
  const reduceMotion = useReducedMotion()
  const coarsePointer = useCoarsePointer()

  const [open, setOpen] = useState(false)
  const [level, setLevel] = useState("sections") // "sections" | "items"
  const [sectionIndex, setSectionIndex] = useState(0)

  // Hover intent ("safe triangle"): when the pointer leaves a section heading
  // moving towards the items column, the section switch waits so the user can
  // travel diagonally to the items without landing on the next heading.
  const pointerRef = useRef({ x: 0, y: 0, dx: 0, dy: 0 })
  const hoverTimerRef = useRef(null)
  const trackPointer = useCallback((e) => {
    const p = pointerRef.current
    p.dx = e.clientX - p.x
    p.dy = e.clientY - p.y
    p.x = e.clientX
    p.y = e.clientY
  }, [])
  const cancelHover = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }, [])
  const hoverSection = useCallback(
    (sIndex) => {
      cancelHover()
      const { dx, dy } = pointerRef.current
      const towardsItems = dx > 0 && dx >= Math.abs(dy) * 0.7
      if (towardsItems) {
        hoverTimerRef.current = setTimeout(() => setSectionIndex(sIndex), 320)
      } else {
        setSectionIndex(sIndex)
      }
    },
    [cancelHover]
  )
  useEffect(() => cancelHover, [cancelHover])
  const [itemIndex, setItemIndex] = useState(0)

  const sectionRefs = useRef([])
  const itemRefs = useRef({})
  const dialogRef = useRef(null)
  // Element that receives focus again when the menu closes: the "Menú"
  // button when opened from it, otherwise whatever was focused at open time.
  const openerRef = useRef(null)

  const sections = useMemo(() => {
    const pagesItems = [
      { id: "home", label: t("items.home"), kind: "internal", route: "/" },
      { id: "about", label: t("items.about"), kind: "internal", route: "/about" },
      { id: "contact", label: t("items.contact"), kind: "mailto", href: "mailto:512juanm@gmail.com" }
    ]

    const featured = projects.filter((p) => p.tier === "featured")
    const secondary = projects.filter((p) => p.tier !== "featured")
    const toItem = (p) => ({
      id: `project-${p.slug}`,
      label: p.title,
      tagline: p.tagline,
      year: p.year,
      accentColor: p.accentColor,
      secondary: p.tier !== "featured",
      kind: "internal",
      route: `/projects/${p.slug}`
    })
    // Subtitles instead of a bare divider: "Destacados" / "Otros".
    const projectItems = [
      ...(featured.length ? [{ id: "project-heading-featured", heading: t("projectGroups.featured") }] : []),
      ...featured.map(toItem),
      ...(secondary.length ? [{ id: "project-heading-other", heading: t("projectGroups.other") }] : []),
      ...secondary.map(toItem)
    ]

    const linksItems = [
      { id: "github", label: t("items.github"), kind: "external", href: "https://github.com/juanm512" },
      { id: "linkedin", label: t("items.linkedin"), kind: "external", href: "https://linkedin.com/in/juanmanuelvila/" },
      { id: "email", label: t("items.email"), kind: "mailto", href: "mailto:512juanm@gmail.com" },
      { id: "cv", label: t("items.cv"), kind: "download", href: "/cv-es.pdf" }
    ]

    const languageItems = [
      { id: "es", label: t("items.spanish"), kind: "locale", targetLocale: "es", active: locale === "es" },
      { id: "en", label: t("items.english"), kind: "locale", targetLocale: "en", active: locale === "en" }
    ]

    return [
      { id: "pages", label: t("sections.pages"), items: pagesItems },
      { id: "projects", label: t("sections.projects"), items: projectItems },
      { id: "links", label: t("sections.links"), items: linksItems },
      { id: "language", label: t("sections.language"), items: languageItems }
    ]
  }, [t, projects, locale])

  const activeSection = sections[sectionIndex]
  const selectableItems = useMemo(
    () => (activeSection ? activeSection.items.filter((i) => !i.heading) : []),
    [activeSection]
  )

  const initialSectionForPath = useCallback(() => {
    if (pathname.startsWith("/projects")) return SECTION_IDS.indexOf("projects")
    return SECTION_IDS.indexOf("pages")
  }, [pathname])

  const handleOpen = useCallback((opener) => {
    openerRef.current = opener || document.activeElement
    setLevel("sections")
    setSectionIndex(initialSectionForPath())
    setItemIndex(0)
    setOpen(true)
  }, [initialSectionForPath])

  const handleClose = useCallback(() => setOpen(false), [])

  useEffect(() => {
    return subscribeTvMenu({
      onOpen: handleOpen,
      onClose: handleClose,
      onToggle: () => {
        setOpen((prev) => {
          if (prev) return false
          handleOpen(null)
          return true
        })
      }
    })
  }, [handleOpen, handleClose])

  // Lock body scroll + expose data-menu-open for Shortcuts.jsx to check.
  useEffect(() => {
    document.body.dataset.menuOpen = open ? "true" : "false"
    if (open) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
    return undefined
  }, [open])

  // Page behind goes inert and Tab stays inside while open; on close, focus
  // goes back to the opener. Rows are tabIndex={-1}: arrows/WASD move focus.
  useFocusTrap(dialogRef, open, {
    opener: () => openerRef.current,
    initialFocus: () => sectionRefs.current[sectionIndex]
  })

  // Move real DOM focus to the highlighted row so screen readers follow.
  useEffect(() => {
    if (!open) return
    if (level === "sections") {
      sectionRefs.current[sectionIndex]?.focus()
    } else {
      const currentItem = selectableItems[itemIndex]
      if (currentItem) itemRefs.current[currentItem.id]?.focus()
    }
  }, [open, level, sectionIndex, itemIndex, selectableItems])

  const activateItem = useCallback(
    (item) => {
      if (!item) return
      if (item.kind === "internal") {
        router.push(item.route)
        closeTvMenu()
      } else if (item.kind === "external") {
        window.open(item.href, "_blank", "noreferrer")
      } else if (item.kind === "locale") {
        if (item.targetLocale !== locale) toggleLanguage()
        closeTvMenu()
      } else {
        // mailto / download: rendered as real <a> elements, let native click happen
      }
    },
    [router, locale, toggleLanguage]
  )

  const handleKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      const key = event.key
      const lower = key.length === 1 ? key.toLowerCase() : key

      // "?" swaps the menu for the help dialog instead of stacking scrims.
      if (key === "?") {
        event.preventDefault()
        closeTvMenu()
        window.dispatchEvent(new CustomEvent("shortcuts:help"))
        return
      }

      if (level === "sections") {
        if (key === "ArrowDown" || lower === "s") {
          event.preventDefault()
          setSectionIndex((i) => (i + 1) % sections.length)
        } else if (key === "ArrowUp" || lower === "w") {
          event.preventDefault()
          setSectionIndex((i) => (i - 1 + sections.length) % sections.length)
        } else if (key === "ArrowRight" || lower === "d" || key === "Enter") {
          event.preventDefault()
          setItemIndex(0)
          setLevel("items")
        }
      } else {
        if (key === "ArrowDown" || lower === "s") {
          event.preventDefault()
          setItemIndex((i) => (selectableItems.length ? (i + 1) % selectableItems.length : 0))
        } else if (key === "ArrowUp" || lower === "w") {
          event.preventDefault()
          setItemIndex((i) => (selectableItems.length ? (i - 1 + selectableItems.length) % selectableItems.length : 0))
        } else if (key === "ArrowLeft" || lower === "a") {
          event.preventDefault()
          setLevel("sections")
        } else if (key === "Enter") {
          event.preventDefault()
          const currentItem = selectableItems[itemIndex]
          const el = currentItem ? itemRefs.current[currentItem.id] : null
          if (el) el.click()
          else activateItem(currentItem)
        }
      }
    },
    [level, sections.length, selectableItems, itemIndex, activateItem]
  )

  useEffect(() => {
    if (!open) return
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, handleKeyDown])

  const easeOutExpo = [0.16, 1, 0.3, 1]
  const fade = (d = 0.18) => ({ duration: reduceMotion ? 0 : d })

  const legend = [
    { keys: ["\u2191", "\u2193"], alt: "W S", label: t("legend.move") },
    { keys: ["\u2192"], alt: "D", label: t("legend.enter") },
    { keys: ["\u2190"], alt: "A", label: t("legend.back") },
    { keys: ["Enter"], label: t("legend.open") },
    { keys: ["Esc"], label: t("legend.close") },
    { keys: ["?"], label: t("legend.help") }
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tv-menu-heading"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade()}
          className="fixed inset-0 z-[100] flex flex-col bg-background-darker/95 outline-none"
        >
          <h2 id="tv-menu-heading" className="sr-only">{t("heading")}</h2>
          {/* Both columns sit vertically centered in the viewport, like a console menu. */}
          <div className="flex-1 min-h-0 flex items-center">
            <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 sm:gap-16 max-h-full">
              <ul className="flex flex-col gap-1 self-center" aria-label={t("button")} onMouseMove={trackPointer}>
                {sections.map((section, sIndex) => {
                  const isHighlighted = sIndex === sectionIndex
                  return (
                    <motion.li
                      key={section.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.16, delay: sIndex * 0.03, ease: easeOutExpo }}
                    >
                      <button
                        type="button"
                        ref={(el) => (sectionRefs.current[sIndex] = el)}
                        tabIndex={-1}
                        aria-current={isHighlighted ? "true" : undefined}
                        onMouseEnter={() => hoverSection(sIndex)}
                        onClick={() => {
                          cancelHover()
                          setSectionIndex(sIndex)
                          setItemIndex(0)
                          setLevel("items")
                        }}
                        className={`relative w-full text-left py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-darker rounded-sm font-kode leading-[1.15] text-[clamp(1.75rem,4vw,2.5rem)] transition-colors duration-150 ${
                          isHighlighted ? "text-ink" : "text-ink-3 hover:text-ink-2"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute -left-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-glow transition-opacity duration-150 ${
                            isHighlighted && level === "sections" ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        {section.label}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>

              <AnimatePresence mode="wait" initial={false}>
                <motion.ul
                  key={activeSection?.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: level === "sections" ? 0.55 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={fade(0.12)}
                  className="flex flex-col self-center overflow-y-auto max-h-[70vh] sm:max-h-[80vh] -mx-3 px-3"
                  onMouseEnter={cancelHover}
                >
                  {activeSection?.items.map((item) => {
                    if (item.heading) {
                      return (
                        <li
                          key={item.id}
                          className="font-mono text-xs text-ink-3 pt-4 pb-1 first:pt-0"
                          role="presentation"
                        >
                          {item.heading}
                        </li>
                      )
                    }
                    const selectableIndex = selectableItems.indexOf(item)
                    const isHighlighted = level === "items" && selectableIndex === itemIndex
                    const registerRef = (el) => {
                      itemRefs.current[item.id] = el
                    }

                    const isProject = Boolean(item.accentColor)
                    const rowClasses = `flex items-baseline gap-4 w-full text-left px-3 -mx-3 py-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-darker text-base sm:text-lg leading-[1.5] transition-colors duration-150 ${
                      isProject ? "border-b border-line" : ""
                    } ${item.secondary ? "opacity-75 py-1.5" : ""} ${
                      isHighlighted
                        ? isProject ? "bg-ink/6 text-[var(--accent)]" : "text-ink bg-ink/6"
                        : isProject ? "text-ink-2 hover:text-[var(--accent)]" : "text-ink-2 hover:text-ink"
                    }`

                    const content = (
                      <>
                        {item.year && (
                          <span className="font-mono text-xs text-ink-3 tabular-nums shrink-0 w-10">{item.year}</span>
                        )}
                        <span className="flex items-baseline gap-3 min-w-0 flex-1">
                          <span className="truncate">{item.label}</span>
                          {item.tagline && (
                            <span className="hidden sm:inline text-sm text-ink-3 truncate min-w-0">{item.tagline}</span>
                          )}
                          {item.active && (
                            <span className="font-mono text-xs text-green-glow shrink-0">{t("current")}</span>
                          )}
                        </span>

                      </>
                    )

                    if (item.kind === "mailto" || item.kind === "download") {
                      return (
                        <li key={item.id}>
                          <a
                            href={item.href}
                            download={item.kind === "download" ? true : undefined}
                            ref={registerRef}
                            style={item.accentColor ? { "--accent": item.accentColor } : undefined}
                            tabIndex={-1}
                            onMouseEnter={() => setItemIndex(selectableIndex)}
                            className={rowClasses}
                          >
                            {content}
                          </a>
                        </li>
                      )
                    }

                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          ref={registerRef}
                          style={item.accentColor ? { "--accent": item.accentColor } : undefined}
                          tabIndex={-1}
                          onMouseEnter={() => setItemIndex(selectableIndex)}
                          onClick={() => activateItem(item)}
                          className={rowClasses}
                        >
                          {content}
                        </button>
                      </li>
                    )
                  })}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>

          <div className="shrink-0 w-full max-w-5xl mx-auto px-6 sm:px-10 pb-8">
            {/* Keyboard legend on fine pointers; one-line touch hint on coarse ones.
                The CSS variant covers the first paint before matchMedia resolves. */}
            {!coarsePointer && (
              <ul className="pointer-coarse:hidden flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[13px] text-ink-3 border-t border-line pt-4">
                {legend.map((entry) => (
                  <li key={entry.label} className="flex items-center gap-1.5">
                    {entry.keys.map((k) => (
                      <Kbd key={k}>{k}</Kbd>
                    ))}
                    {entry.alt && <span>/ {entry.alt}</span>}
                    <span className="ml-1">{entry.label}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className={`${coarsePointer ? "" : "hidden pointer-coarse:block"} font-mono text-[13px] text-ink-3 border-t border-line pt-4`}>
              {t("touchHint")}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
