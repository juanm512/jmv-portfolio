"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "motion/react"
import Kbd from "@/components/ui/Kbd"
import Arrow from "@/components/ui/Arrow"
import { useTranslations, useLocale } from "next-intl"
import { Balancer } from "react-wrap-balancer"
import { AnimatePresence } from "motion/react"

// Only loads/plays once scrolled near the viewport, pauses when it leaves —
// avoids autoplaying every project video at once on page load.
function LazyVideo({ src, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "200px 0px" })

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (isInView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isInView])

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  )
}

// Icons
function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

// Captions sit under the media, not on top of it.
function Caption({ text }) {
  if (!text) return null
  return <figcaption className="mt-3 font-mono text-xs text-ink-3">{text}</figcaption>
}

// Block Components
function TextBlock({ block }) {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-6">
      {block.title && (
        <h2 className="text-2xl md:text-3xl font-semibold text-ink leading-[1.25] mb-5">
          <Balancer>{block.title}</Balancer>
        </h2>
      )}
      <p className="text-lg md:text-xl text-ink-2 leading-[1.65] max-w-[65ch]">
        {block.text}
      </p>
    </div>
  )
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|ogg)$/i

function GridBlock({ block, onMediaClick }) {
  return (
    <div className="py-12 px-4 md:px-0 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {block.items.map((item, idx) => {
          const isVideo = VIDEO_EXTENSIONS.test(item.src)
          return (
            <figure key={idx}>
            <div
              className="relative aspect-[4/3] rounded-sm overflow-hidden bg-ink/5 cursor-zoom-in group"
              data-cursor={isVideo ? "Play" : "Expand"}
              onClick={() => onMediaClick(item.src, isVideo ? "video" : "image")}
            >
              {isVideo ? (
                <LazyVideo
                  src={item.src}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.caption || "Project image"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
            <Caption text={item.caption} />
            </figure>
          )
        })}
      </div>
    </div>
  )
}

function FullWidthImageBlock({ block, onMediaClick }) {
  return (
    <figure className="py-12 w-full">
      <div
        className="relative w-full h-[50vh] md:h-[80vh] cursor-zoom-in"
        data-cursor="Expand"
        onClick={() => onMediaClick(block.src, "image")}
      >
        <Image
          src={block.src}
          alt={block.caption || "Project banner"}
          fill
          className="object-cover"
        />
      </div>
      {block.caption && (
        <div className="max-w-7xl mx-auto px-6">
          <Caption text={block.caption} />
        </div>
      )}
    </figure>
  )
}

function StatsBlock({ block }) {
  return (
    <div className="max-w-4xl mx-auto px-6 my-12">
      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-y border-line py-8">
        {block.items.map((stat, idx) => (
          <div key={idx}>
            <dd className="text-3xl font-semibold text-ink tabular-nums leading-none mb-2">{stat.value}</dd>
            <dt className="text-sm text-ink-2">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  )
}

function CodeBlock({ block }) {
  return (
    <div className="py-12 md:py-16 max-w-5xl mx-auto px-6">
      {block.title && (
        <h3 className="text-xl md:text-2xl font-semibold text-ink leading-[1.25] mb-5">
          {block.title}
        </h3>
      )}
      <pre className="bg-background-darker border border-line rounded-sm p-6 overflow-x-auto">
        <code className="text-sm md:text-base font-mono text-ink-2 whitespace-pre">
          {block.text}
        </code>
      </pre>
    </div>
  )
}

function VideoBlock({ block, onMediaClick }) {
  return (
    <figure className="py-12 px-4 md:px-0 max-w-7xl mx-auto">
      {block.title && (
        <h3 className="text-xl md:text-2xl font-semibold text-ink leading-[1.25] mb-5 px-2 md:px-0">
          {block.title}
        </h3>
      )}
      <div
        className="relative w-full rounded-sm overflow-hidden bg-ink/5 cursor-pointer group"
        data-cursor="Play"
        onClick={() => onMediaClick(block.src, "video")}
      >
        <LazyVideo
          src={block.src}
          className="w-full h-auto max-h-[80vh] object-contain bg-black"
        />
      </div>
      <Caption text={block.caption} />
    </figure>
  )
}

// ─── Animation Wrapper ──────────────────────────────────────────

function AnimatedBlock({ children }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Block Renderer ──────────────────────────────────────────────

function renderBlock(block, index, onMediaClick) {
  let content = null

  switch (block.type) {
    case "text":
      content = <TextBlock block={block} />
      break
    case "grid":
      content = <GridBlock block={block} onMediaClick={onMediaClick} />
      break
    case "full-width-image":
      content = <FullWidthImageBlock block={block} onMediaClick={onMediaClick} />
      break
    case "stats":
      content = <StatsBlock block={block} />
      break
    case "code":
      content = <CodeBlock block={block} />
      break
    case "video":
      content = <VideoBlock block={block} onMediaClick={onMediaClick} />
      break
    default:
      return null
  }

  return (
    <AnimatedBlock key={index}>
      {content}
    </AnimatedBlock>
  )
}

// ─── Lightbox Component ──────────────────────────────────────────

function Lightbox({ media, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        e.preventDefault()
        onClose()
      }
    }
    // Use capture phase so we intercept before the Header handler
    document.addEventListener("keydown", handleKeyDown, true)
    return () => document.removeEventListener("keydown", handleKeyDown, true)
  }, [onClose])

  return (
    <motion.div
      data-lightbox-open
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-pointer"
      data-cursor="Close"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center cursor-default"
        data-cursor=""
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
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
              alt="Fullscreen view"
              fill
              className="object-contain"
              quality={100}
            />
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          data-cursor="✕"
          className="absolute -top-12 right-0 text-ink-2 hover:text-ink transition-colors p-2 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </motion.div>
    </motion.div>
  )
}

// Converts a "#rrggbb" hex color to an "r, g, b" triplet for use in rgba()
function hexToRgbTriplet(hex) {
  const clean = hex.replace("#", "")
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

// ─── Main Component ──────────────────────────────────────────────

export default function ProjectPage({ project, nextProject, prevProject }) {
  const locale = useLocale()
  const t = useTranslations("Project")
  const [selectedMedia, setSelectedMedia] = useState(null)
  const reduceMotion = useReducedMotion()

  if (!project) return null

  // Helper to open lightbox
  const openLightbox = (src, type = "image") => {
    setSelectedMedia({ src, type })
  }

  const accent = project.accentColor || "#00FF9C"
  const accentRgb = hexToRgbTriplet(accent)

  return (
    <main
      data-prev={prevProject ? `/${locale}/projects/${prevProject.slug}` : undefined}
      data-next={nextProject ? `/${locale}/projects/${nextProject.slug}` : undefined}
      className="min-h-screen bg-background-dark text-white font-sans selection:bg-green-glow/30"
      style={{
        "--accent": accent,
        "--accent-border": `rgba(${accentRgb}, 0.3)`,
      }}
    >

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <Lightbox media={selectedMedia} onClose={() => setSelectedMedia(null)} />
        )}
      </AnimatePresence>

      {/* 1. Immersive Hero */}
      <section className="relative h-screen w-full flex items-end">
        {/* Background Media */}
        <div
          className="absolute inset-0 z-0 cursor-pointer"
          onClick={() => openLightbox(project.hero.src, project.hero.type)}
          data-cursor="Expand"
        >
          {project.hero?.type === "video" ? (
             <video
               src={project.hero.src}
               autoPlay
               muted
               loop
               playsInline
               className="w-full h-full object-cover opacity-60"
             />
          ) : (
             <Image
                src={project.hero?.src || "/placeholder.jpg"}
                alt={project.title}
                fill
                className="object-cover opacity-60"
                priority
             />
          )}
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Back Button */}
        <div className="absolute top-8 left-6 md:left-12 z-20">
           <Link
             href={`/${locale}`}
             data-cursor="Back"
             className="group inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark rounded-sm"
           >
             <Arrow direction="left" className="transition-transform duration-200 ease-out-expo group-hover:-translate-x-0.5 motion-reduce:transform-none" />
             <span>{t("backToHome")}</span>
             <Kbd className="hidden md:inline-flex">Esc</Kbd>
           </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 md:pb-32">
           <motion.div
             initial={reduceMotion ? false : { opacity: 0, y: 16 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
           >
             <p className="text-[var(--accent)] font-mono text-sm tabular-nums mb-4">
               {project.client} · {project.year}
             </p>
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.02em] leading-[1.02] text-ink mb-6">
               <Balancer>{project.title}</Balancer>
             </h1>
             <p className="text-xl md:text-2xl text-ink-2 max-w-[48ch] leading-[1.5]">
               {project.description}
             </p>
           </motion.div>
        </div>
      </section>

      {/* 2. Metadata Grid */}
      <section className="border-b border-line bg-background-dark z-20 relative">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
             <div>
                <p className="font-mono text-xs text-ink-3 mb-1.5">{t("role")}</p>
                <p className="text-lg text-ink">{project.role}</p>
             </div>
             <div>
                <p className="font-mono text-xs text-ink-3 mb-1.5">{t("client")}</p>
                <p className="text-lg text-ink">{project.client}</p>
             </div>
             <div>
                <p className="font-mono text-xs text-ink-3 mb-1.5">{t("year")}</p>
                <p className="text-lg text-ink">{project.year}</p>
             </div>
             <div>
                <p className="font-mono text-xs text-ink-3 mb-1.5">{t("links")}</p>
                <div className="flex gap-4">
                  {project.links?.live && (
                    <a href={project.links.live} target="_blank" rel="noreferrer" data-cursor="Visit" className="text-[var(--accent)] hover:text-ink transition-colors flex items-center gap-1 group">
                       {t("live")} <ExternalLinkIcon />
                    </a>
                  )}
                  {project.links?.live2 && (
                    <a href={project.links.live2} target="_blank" rel="noreferrer" data-cursor="Visit" className="text-[var(--accent)] hover:text-ink transition-colors flex items-center gap-1 group">
                       {t("live")} <ExternalLinkIcon />
                    </a>
                  )}
                   {project.links?.repo && (
                    <a href={project.links.repo} target="_blank" rel="noreferrer" data-cursor="Code" className="text-ink-2 hover:text-ink transition-colors flex items-center gap-1">
                       {t("repo")} <ExternalLinkIcon />
                    </a>
                  )}
                </div>
             </div>
          </div>

          {/* Stack: one mono line, separated by middle dots. */}
          <p className="mt-8 pt-6 border-t border-line font-mono text-xs text-ink-3 leading-[2]">
             <span className="sr-only">{t("stack")}: </span>
             {project.stack?.map((tech, i) => {
               // Normalize tech names to SimpleIcons slugs with a small exceptions map
               const key = String(tech).toLowerCase().trim()
               const exceptions = {
                 "next.js": "nextdotjs",
                 "nextjs": "nextdotjs",
                 "threejs": "three.js",
                 "three.js": "three.js",
                 "react-three-fiber": "react",
                 "reactthreefiber": "react",
                 "framer-motion": "framer",
                 "framer motion": "framer",
                 "framer": "framer",
                 "react native": "react",
                 "react-native": "react",
                 "reactnative": "react",
                 "node.js": "nodedotjs",
                 "nodejs": "nodedotjs",
                 "node": "nodedotjs",
                 "socket.io": "socketdotio",
                 "socketio": "socketdotio",
                 "socket.io-client": "socketdotio",
                 "monorepo": "turborepo",
                 "turborepo": "turborepo",
                 "rendering pipeline": "nvidia",
                 "rendering": "nvidia",
                 "pipeline": "nvidia",
                 "flask": "flask",
                 "python": "python",
                 "better-auth": "betterauth",
                 "openrouteservice": "openrouteservice",
                 "locationiq": "locationiq",
                 "drizzle orm": "drizzle",
                 "mercado pago": "mercadopago"
               }

               let slug = exceptions[key]
               if (!slug) {
                 // default: remove spaces and dots (keep dashes)
                 slug = key.replace(/\s+/g, "").replace(/\./g, "")
               }

               // final fallback to a generic icon if slug is empty or unknown
               if (!slug) slug = "code"

               const iconUrl = `https://cdn.simpleicons.org/${slug}/white`

               return (
                 <span key={tech}>
                   {i > 0 && <span aria-hidden="true"> · </span>}
                   <span
                     className="hover:text-ink transition-colors cursor-none"
                     data-cursor={tech}
                     data-cursor-type="image"
                     data-cursor-image={iconUrl}
                   >
                     {tech}
                   </span>
                 </span>
               )
             })}
          </p>
        </div>
      </section>

      {/* 3. Dynamic Narrative Blocks */}
      <section className="bg-background-dark py-12 md:py-24">
        {project.content?.map((block, idx) => renderBlock(block, idx, openLightbox))}
      </section>

      {/* 4. Next Project Navigation */}
      {nextProject && (
        <section className="flex flex-col items-center justify-center py-32 bg-background-dark border-t border-line text-center">
           <p className="text-ink-3 font-mono text-sm mb-4 flex items-center gap-2">
             {t("nextProject")}
             <span className="hidden md:inline-flex items-center gap-1">
               {prevProject && <Kbd>{"\u2190"}</Kbd>}
               <Kbd>{"\u2192"}</Kbd>
             </span>
           </p>
           <Link
             href={`/${locale}/projects/${nextProject.slug}`}
             data-cursor="Next"
             className="inline-block group"
           >
             <h3
               className="text-4xl md:text-5xl font-semibold text-ink mb-4 group-hover:text-[var(--next-accent)] transition-colors"
               style={{ "--next-accent": nextProject.accentColor || "#00FF9C" }}
             >
               {nextProject.title}
             </h3>
             <p className="text-lg text-ink-2 max-w-xl mx-auto mb-8">
               {nextProject.description?.slice(0, 120)}{nextProject.description?.length > 120 ? "\u2026" : ""}
             </p>
           </Link>
           <Link
             href={`/${locale}`}
             className="group inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink transition-colors outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark rounded-sm"
           >
             {t("viewAllProjects")}
             <Arrow className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 motion-reduce:transform-none" />
           </Link>
        </section>
      )}


    </main>
  )
}
