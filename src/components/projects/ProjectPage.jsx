"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { Balancer } from "react-wrap-balancer"
import { AnimatePresence } from "framer-motion"

// Icons
function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

// Block Components
function TextBlock({ block }) {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-6">
      {block.title && (
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
          <Balancer>{block.title}</Balancer>
        </h2>
      )}
      <div className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
        <Balancer>{block.text}</Balancer>
      </div>
    </div>
  )
}

function GridBlock({ block, onMediaClick }) {
  return (
    <div className="py-12 px-4 md:px-0 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {block.items.map((item, idx) => (
          <div 
            key={idx} 
            className="relative aspect-[4/3] rounded-sm overflow-hidden bg-white/5 cursor-zoom-in group" 
            data-cursor="Expand"
            onClick={() => onMediaClick(item.src, "image")}
          >
            <Image
              src={item.src}
              alt={item.caption || "Project image"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {item.caption && (
               <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-sm text-white/90 font-mono">{item.caption}</p>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function FullWidthImageBlock({ block, onMediaClick }) {
  return (
    <div className="py-12 w-full">
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
        {block.caption && (
           <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full pointer-events-none">
              <p className="text-sm text-white/90 font-mono">{block.caption}</p>
           </div>
        )}
      </div>
    </div>
  )
}

function StatsBlock({ block }) {
  return (
    <div className="py-16 bg-white/5 border-y border-white/5 my-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {block.items.map((stat, idx) => (
          <div key={idx} className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-green-glow mb-2">{stat.value}</p>
            <p className="text-sm text-white/60 font-mono uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CodeBlock({ block }) {
  return (
    <div className="py-12 md:py-16 max-w-5xl mx-auto px-6">
      {block.title && (
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
          {block.title}
        </h3>
      )}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-glow/20 to-green-glow/10 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <pre className="relative bg-black/80 border border-white/10 rounded-lg p-6 overflow-x-auto">
          <code className="text-sm md:text-base font-mono text-green-400 whitespace-pre">
            {block.text}
          </code>
        </pre>
      </div>
    </div>
  )
}

// ─── Animation Wrapper ──────────────────────────────────────────

function AnimatedBlock({ children, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
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
    default:
      return null
  }

  return (
    <AnimatedBlock key={index} index={index}>
      {content}
    </AnimatedBlock>
  )
}

// ─── Lightbox Component ──────────────────────────────────────────

function Lightbox({ media, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
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
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────────

export default function ProjectPage({ project }) {
  const locale = useLocale()
  const t = useTranslations("Project")
  const [selectedMedia, setSelectedMedia] = useState(null)

  if (!project) return null

  // Helper to open lightbox
  const openLightbox = (src, type = "image") => {
    setSelectedMedia({ src, type })
  }

  return (
    <main className="min-h-screen bg-background-dark text-white font-sans selection:bg-green-glow/30">
      
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
             className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
           >
             <div className="p-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm group-hover:bg-white/10 transition-all">
               <ArrowLeftIcon />
             </div>
             <span className="text-sm font-light tracking-wide hidden md:block opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
               Back to Home
             </span>
           </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 md:pb-32">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
           >
             <p className="text-green-glow font-mono text-sm tracking-[0.2em] uppercase mb-4">
               {project.client} • {project.year}
             </p>
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
               <Balancer>{project.title}</Balancer>
             </h1>
             <p className="text-xl md:text-2xl text-white/70 max-w-2xl font-light leading-relaxed">
               {project.description}
             </p>
           </motion.div>
        </div>
      </section>

      {/* 2. Metadata Grid */}
      <section className="border-b border-white/5 bg-background-dark z-20 relative">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
             <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2 font-mono">Role</p>
                <p className="text-lg text-white/90">{project.role}</p>
             </div>
             <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2 font-mono">Client</p>
                <p className="text-lg text-white/90">{project.client}</p>
             </div>
             <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2 font-mono">Year</p>
                <p className="text-lg text-white/90">{project.year}</p>
             </div>
             <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2 font-mono">Links</p>
                <div className="flex gap-4">
                  {project.links?.live && (
                    <a href={project.links.live} target="_blank" rel="noreferrer" data-cursor="Visit" className="text-green-glow hover:text-white transition-colors flex items-center gap-1 group">
                       Live <ExternalLinkIcon />
                    </a>
                  )}
                   {project.links?.repo && (
                    <a href={project.links.repo} target="_blank" rel="noreferrer" data-cursor="Code" className="text-white/60 hover:text-white transition-colors flex items-center gap-1">
                       Repo <ExternalLinkIcon />
                    </a>
                  )}
                </div>
             </div>
          </div>
          
          {/* Tech Stack Chips */}
          <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap gap-2">
             {project.stack?.map(tech => {
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
                 <span 
                   key={tech} 
                   className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 font-mono border border-white/5 hover:border-green-glow/30 hover:text-white transition-colors cursor-none"
                   data-cursor={tech}
                   data-cursor-type="image"
                   data-cursor-image={iconUrl}
                 >
                   {tech}
                 </span>
               )
             })}
          </div>
        </div>
      </section>

      {/* 3. Dynamic Narrative Blocks */}
      <section className="bg-background-dark py-12 md:py-24">
        {project.content?.map((block, idx) => renderBlock(block, idx, openLightbox))}
      </section>

      {/* 4. Next Project Navigation (Placeholder) */}
      <section className="py-32 bg-background-dark border-t border-white/5 text-center">
         <p className="text-white/40 font-mono mb-4">Next Project</p>
         <h3 data-cursor="Next" className="text-4xl md:text-5xl font-bold text-white mb-8 hover:text-green-glow transition-colors cursor-pointer">
           E-commerce Platform
         </h3>
         <Link href="/projects" className="inline-block px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-background-dark transition-all">
           View All Projects
         </Link>
      </section>

    </main>
  )
}
