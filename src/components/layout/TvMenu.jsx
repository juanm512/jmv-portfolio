"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from "motion/react"
import Kbd from "@/components/ui/Kbd"
import { useLocale, useTranslations } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useLanguageToggle } from "@/lib/useLanguageToggle"
import { subscribeTvMenu, closeTvMenu } from "@/lib/tvMenuStore"
import { usePopoverMode } from "@/lib/useFinePointer"
import { useFocusTrap } from "@/lib/useFocusTrap"

const SECTION_IDS = ["pages", "projects", "links", "language"]
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-glow"

// Sections + items shared by the desktop TV model and the mobile flat list.
function useMenuSections(projects, t, locale) {
  return useMemo(() => {
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
}

// `initialOpen` / `initialOpener`: TvMenuLoader mounts this lazily on the
// first open request, so the request that triggered the load is replayed here.
export default function TvMenu({ projects = [], initialOpen = false, initialOpener = null }) {
  const t = useTranslations("Menu")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { toggleLanguage } = useLanguageToggle()
  const reduceMotion = useReducedMotion()
  // Same rule as the home cover: fine pointer at md+ gets the TV model,
  // everything else (touch, narrow) gets one flat tappable list.
  const mode = usePopoverMode()

  const [open, setOpen] = useState(false)
  const [initialSection, setInitialSection] = useState(0)

  const dialogRef = useRef(null)
  // Element that receives focus again when the menu closes: the "Menú"
  // button when opened from it, otherwise whatever was focused at open time.
  const openerRef = useRef(null)

  const sections = useMenuSections(projects, t, locale)

  const handleOpen = useCallback(
    (opener) => {
      openerRef.current = opener || document.activeElement
      setInitialSection(SECTION_IDS.indexOf(pathname.startsWith("/projects") ? "projects" : "pages"))
      setOpen(true)
    },
    [pathname]
  )
  const handleClose = useCallback(() => setOpen(false), [])

  const replayedRef = useRef(false)
  useEffect(() => {
    if (initialOpen && !replayedRef.current) {
      replayedRef.current = true
      handleOpen(initialOpener)
    }
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
  }, [handleOpen, handleClose, initialOpen, initialOpener])

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
  // goes back to the opener. Desktop marks its highlighted section with
  // data-initial-focus; mobile falls back to the dialog container.
  useFocusTrap(dialogRef, open, {
    opener: () => openerRef.current,
    initialFocus: () => dialogRef.current?.querySelector("[data-initial-focus]")
  })

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

  const fade = { duration: reduceMotion ? 0 : 0.18 }
  const isMobile = mode === "mobile"

  return (
    <LazyMotion features={domAnimation} strict>
    <AnimatePresence>
      {open && (
        <m.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tv-menu-heading"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
          // A click on the scrim itself (not on the content) closes the menu.
          onClick={(e) => {
            if (e.target === e.currentTarget) closeTvMenu()
          }}
          className={`fixed inset-0 z-[100] flex flex-col bg-background-darker/95 outline-none ${
            isMobile ? "overflow-y-auto overscroll-contain" : ""
          }`}
        >
          <h2 id="tv-menu-heading" className="sr-only">{t("heading")}</h2>

          {/* Top row mirrors the navbar (same container, 56px) so "Cerrar"
              lands where "Menú" was. Sticky on mobile so it survives the scroll. */}
          <div className={`shrink-0 ${isMobile ? "sticky top-0 z-10 bg-background-darker/95" : ""}`}>
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between border-b border-line">
              <span className={`font-kode text-sm sm:text-base text-ink tracking-tight ${isMobile ? "" : "invisible"}`} aria-hidden={!isMobile}>
                Juan Manuel Vila
              </span>
              <button
                type="button"
                data-menu-close
                onClick={() => closeTvMenu()}
                className={`flex items-center gap-2 min-h-11 px-2 -mx-1 rounded-sm text-sm text-ink-2 hover:text-ink transition-colors ${FOCUS_RING}`}
              >
                {t("close")}
                <Kbd className="hidden md:inline-flex">Esc</Kbd>
              </button>
            </div>
          </div>

          {isMobile ? (
            <TvMenuMobile sections={sections} activateItem={activateItem} t={t} />
          ) : (
            <TvMenuDesktop
              sections={sections}
              activateItem={activateItem}
              initialSection={initialSection}
              reduceMotion={reduceMotion}
              t={t}
            />
          )}
        </m.div>
      )}
    </AnimatePresence>
    </LazyMotion>
  )
}

// ---------------------------------------------------------------------------
// Mobile / coarse pointer: one scrollable list, every item one tap away.
// ---------------------------------------------------------------------------
function TvMenuMobile({ sections, activateItem, t }) {
  const headingClass = "font-mono text-xs text-ink-3 leading-4"
  const rowClass = `flex items-center justify-between gap-4 w-full min-h-12 py-2 text-left text-base text-ink rounded-sm ${FOCUS_RING}`

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-12" data-menu-list>
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={`tv-menu-${section.id}`} className="pt-6">
          <h3 id={`tv-menu-${section.id}`} className={`${headingClass} pb-2`}>
            {section.label}
          </h3>
          <ul className="divide-y divide-line border-t border-b border-line">
            {section.items.map((item) => {
              if (item.heading) {
                return (
                  <li key={item.id} className={`${headingClass} pt-3 pb-1`} role="presentation">
                    {item.heading}
                  </li>
                )
              }
              const isProject = Boolean(item.accentColor)
              const style = isProject ? { "--accent": item.accentColor } : undefined
              const rowClasses = `${rowClass} ${isProject ? "active:text-[var(--accent)]" : "active:text-green-glow"}`
              const content = (
                <>
                  <span className="flex items-center gap-3 min-w-0">
                    {isProject && (
                      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--accent)]" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </span>
                  <span className="font-mono text-xs text-ink-3 tabular-nums shrink-0">
                    {item.year}
                    {item.active && <span className="text-green-glow">{t("current")}</span>}
                    {item.kind === "external" && <span aria-hidden="true">{"↗"}</span>}
                  </span>
                </>
              )

              if (item.kind === "mailto" || item.kind === "download" || item.kind === "external") {
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      download={item.kind === "download" ? true : undefined}
                      target={item.kind === "external" ? "_blank" : undefined}
                      rel={item.kind === "external" ? "noreferrer" : undefined}
                      style={style}
                      className={rowClasses}
                      data-menu-row
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
                    onClick={() => activateItem(item)}
                    aria-current={item.active ? "true" : undefined}
                    style={style}
                    className={rowClasses}
                    data-menu-row
                  >
                    {content}
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Desktop (fine pointer, md+): two-column TV model driven by W/S/D/A.
// ---------------------------------------------------------------------------
function TvMenuDesktop({ sections, activateItem, initialSection, reduceMotion, t }) {
  const [level, setLevel] = useState("sections") // "sections" | "items"
  const [sectionIndex, setSectionIndex] = useState(initialSection)
  const [itemIndex, setItemIndex] = useState(0)

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

  const sectionRefs = useRef([])
  const itemRefs = useRef({})

  const activeSection = sections[sectionIndex]
  const selectableItems = useMemo(
    () => (activeSection ? activeSection.items.filter((i) => !i.heading) : []),
    [activeSection]
  )

  // Move real DOM focus to the highlighted row so screen readers follow.
  useEffect(() => {
    if (level === "sections") {
      sectionRefs.current[sectionIndex]?.focus()
    } else {
      const currentItem = selectableItems[itemIndex]
      if (currentItem) itemRefs.current[currentItem.id]?.focus()
    }
  }, [level, sectionIndex, itemIndex, selectableItems])

  const handleKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      // The close button handles its own Enter/Space.
      if (document.activeElement?.hasAttribute("data-menu-close")) return
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
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const fade = (d = 0.18) => ({ duration: reduceMotion ? 0 : d })

  const legend = [
    { keys: ["↑", "↓"], alt: "W S", label: t("legend.move") },
    { keys: ["→"], alt: "D", label: t("legend.enter") },
    { keys: ["←"], alt: "A", label: t("legend.back") },
    { keys: ["Enter"], label: t("legend.open") },
    { keys: ["Esc"], label: t("legend.close") },
    { keys: ["?"], label: t("legend.help") }
  ]

  return (
    <>
      {/* Both columns sit vertically centered in the viewport, like a console menu. */}
      <div className="flex-1 min-h-0 flex items-center">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-16 max-h-full">
          <ul className="flex flex-col gap-1 self-center" aria-label={t("button")} onMouseMove={trackPointer}>
            {sections.map((section, sIndex) => {
              const isHighlighted = sIndex === sectionIndex
              return (
                <m.li
                  key={section.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.16, delay: sIndex * 0.03, ease: EASE_OUT_EXPO }}
                >
                  <button
                    type="button"
                    ref={(el) => (sectionRefs.current[sIndex] = el)}
                    tabIndex={-1}
                    data-initial-focus={isHighlighted ? "true" : undefined}
                    aria-current={isHighlighted ? "true" : undefined}
                    onMouseEnter={() => hoverSection(sIndex)}
                    onClick={() => {
                      cancelHover()
                      setSectionIndex(sIndex)
                      setItemIndex(0)
                      setLevel("items")
                    }}
                    className={`relative w-full text-left py-1.5 ${FOCUS_RING} rounded-sm font-kode leading-[1.15] text-[clamp(1.75rem,4vw,2.5rem)] transition-colors duration-150 ${
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
                </m.li>
              )
            })}
          </ul>

          <AnimatePresence mode="wait" initial={false}>
            <m.ul
              key={activeSection?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: level === "sections" ? 0.55 : 1 }}
              exit={{ opacity: 0 }}
              transition={fade(0.12)}
              className="flex flex-col self-center overflow-y-auto max-h-[70vh] -mx-3 px-3 py-1"
              onMouseEnter={cancelHover}
            >
              {activeSection?.items.map((item) => {
                if (item.heading) {
                  return (
                    <li key={item.id} className="font-mono text-xs text-ink-3 pt-4 pb-1 first:pt-0" role="presentation">
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
                const rowClasses = `flex items-baseline gap-4 w-full text-left px-3 -mx-3 py-2 rounded-sm ${FOCUS_RING} text-lg leading-[1.5] transition-colors duration-150 ${
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
                      {item.tagline && <span className="text-sm text-ink-3 truncate min-w-0">{item.tagline}</span>}
                      {item.active && <span className="font-mono text-xs text-green-glow shrink-0">{t("current")}</span>}
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
            </m.ul>
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
    </>
  )
}
