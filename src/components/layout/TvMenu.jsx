"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import Kbd from "@/components/ui/Kbd"
import { useLocale, useTranslations } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useLanguageToggle } from "@/lib/useLanguageToggle"
import { subscribeTvMenu, closeTvMenu } from "@/lib/tvMenuStore"

const SECTION_IDS = ["pages", "projects", "links", "language"]

export default function TvMenu({ projects = [] }) {
  const t = useTranslations("Menu")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { toggleLanguage } = useLanguageToggle()
  const reduceMotion = useReducedMotion()

  const [open, setOpen] = useState(false)
  const [level, setLevel] = useState("sections") // "sections" | "items"
  const [sectionIndex, setSectionIndex] = useState(0)
  const [itemIndex, setItemIndex] = useState(0)

  const sectionRefs = useRef([])
  const itemRefs = useRef({})

  const sections = useMemo(() => {
    const pagesItems = [
      { id: "home", label: t("items.home"), kind: "internal", route: "/" },
      { id: "about", label: t("items.about"), kind: "internal", route: "/about" },
      { id: "contact", label: t("items.contact"), kind: "mailto", href: "mailto:512juanm@gmail.com" }
    ]

    const featured = projects.filter((p) => p.tier === "featured")
    const secondary = projects.filter((p) => p.tier !== "featured")
    const projectItems = [
      ...featured.map((p) => ({
        id: `project-${p.slug}`,
        label: p.title,
        year: p.year,
        accentColor: p.accentColor,
        kind: "internal",
        route: `/projects/${p.slug}`
      })),
      ...(featured.length && secondary.length ? [{ id: "project-divider", divider: true }] : []),
      ...secondary.map((p) => ({
        id: `project-${p.slug}`,
        label: p.title,
        year: p.year,
        accentColor: p.accentColor,
        kind: "internal",
        route: `/projects/${p.slug}`
      }))
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
    () => (activeSection ? activeSection.items.filter((i) => !i.divider) : []),
    [activeSection]
  )

  const initialSectionForPath = useCallback(() => {
    if (pathname.startsWith("/projects")) return SECTION_IDS.indexOf("projects")
    return SECTION_IDS.indexOf("pages")
  }, [pathname])

  const handleOpen = useCallback(() => {
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
          handleOpen()
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
    { keys: ["Esc"], label: t("legend.close") }
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t("button")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade()}
          className="fixed inset-0 z-[100] flex flex-col bg-background-darker/95"
        >
          {/* Both columns sit vertically centered in the viewport, like a console menu. */}
          <div className="flex-1 min-h-0 flex items-center">
            <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 sm:gap-16 max-h-full">
              <ul className="flex flex-col gap-1 self-center" aria-label={t("button")}>
                {sections.map((section, sIndex) => {
                  const isHighlighted = sIndex === sectionIndex
                  return (
                    <motion.li
                      key={section.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.16, delay: reduceMotion ? 0 : sIndex * 0.03, ease: easeOutExpo }}
                    >
                      <button
                        type="button"
                        ref={(el) => (sectionRefs.current[sIndex] = el)}
                        tabIndex={-1}
                        aria-current={isHighlighted ? "true" : undefined}
                        onMouseEnter={() => setSectionIndex(sIndex)}
                        onClick={() => {
                          setSectionIndex(sIndex)
                          setItemIndex(0)
                          setLevel("items")
                        }}
                        className={`relative w-full text-left py-1.5 outline-none font-kode leading-[1.15] text-[clamp(1.75rem,4vw,2.5rem)] transition-colors duration-150 ${
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
                >
                  {activeSection?.items.map((item) => {
                    if (item.divider) {
                      return <li key={item.id} className="my-3 border-t border-line" aria-hidden="true" />
                    }
                    const selectableIndex = selectableItems.indexOf(item)
                    const isHighlighted = level === "items" && selectableIndex === itemIndex
                    const registerRef = (el) => {
                      itemRefs.current[item.id] = el
                    }

                    const isProject = Boolean(item.accentColor)
                    const rowClasses = `flex items-baseline gap-4 w-full text-left px-3 -mx-3 py-2 rounded-none outline-none text-lg sm:text-xl leading-[1.5] transition-colors duration-150 ${
                      isProject ? "border-b border-line" : ""
                    } ${
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
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[13px] text-ink-3 border-t border-line pt-4">
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
