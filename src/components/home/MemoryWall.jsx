"use client"

import { useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import { Balancer } from "react-wrap-balancer"

// 3D mouse-tracking hover hook
function use3DTilt(ref) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    // Normalize to -1..1 range, then scale to degrees
    const rotateY = (mouseX / (rect.width / 2)) * 8
    const rotateX = -(mouseY / (rect.height / 2)) * 6
    setTilt({ rotateX, rotateY })
  }, [ref])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }, [])

  return { tilt, handleMouseMove, handleMouseLeave }
}

// Each project poster uses its own scroll tracking
function ProjectPoster({ project, index, locale, totalCount }) {
  const cardRef = useRef(null)
  const innerRef = useRef(null)
  const isEven = index % 2 === 0
  const t = useTranslations("Home.projects")

  const { tilt, handleMouseMove, handleMouseLeave } = use3DTilt(innerRef)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  // Gentle zoom from slightly larger
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.85, 1], [1.8, 1.1, 1, 1, 0.95])

  // Opacity: quick fade in, hold, gentle fade out
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.82, 0.95], [0, 0.6, 1, 1, 0])

  // Soft lateral drift to left/right
  const x = useTransform(
    scrollYProgress,
    [0, 0.35, 0.5],
    [0, isEven ? -20 : 20, isEven ? -30 : 30]
  )

  // Rise into view and drift up to exit
  const y = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.85, 1], [80, 15, 0, -20, -120])

  // Subtle Y-axis rotation
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.5],
    [isEven ? 4 : -4, isEven ? 1 : -1, 0]
  )

  // RotateZ tilt — slight angle that straightens on center
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.8, 1],
    [isEven ? -3 : 3, isEven ? -1.5 : 1.5, 0, isEven ? 1 : -1, isEven ? 2 : -2]
  )

  // Blur clears as it approaches
  const filter = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4],
    ["blur(12px)", "blur(3px)", "blur(0px)"]
  )

  // Staggered content transforms
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1])
  const titleY = useTransform(scrollYProgress, [0.3, 0.45], [20, 0])

  const descOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1])
  const descY = useTransform(scrollYProgress, [0.35, 0.5], [15, 0])

  const tagsOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1])
  const tagsY = useTransform(scrollYProgress, [0.4, 0.55], [10, 0])

  return (
    <div
      ref={cardRef}
      className="h-[140vh] flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ scale, opacity, x, y, rotateY, rotateZ, filter }}
        className="w-full max-w-2xl mx-auto"
      >
        <Link href={`/${locale}/projects/${project.slug}`} className="group block" data-cursor="View">
          <div
            ref={innerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden rounded-2xl bg-background-dark/90 backdrop-blur-sm border border-white/10 shadow-2xl shadow-black/50 transition-shadow duration-500 group-hover:border-green-glow/30 group-hover:shadow-[0_0_60px_rgba(0,255,156,0.15)]"
            style={{
              transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 680px"
                />
              ) : (
                <div className="w-full h-full bg-green-primary/10 flex items-center justify-center">
                  <span className="text-green-glow/40 font-mono text-lg">
                    {project.title}
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* View label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-medium text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 bg-green-glow/20 backdrop-blur-sm px-6 py-2 rounded-full">
                  {t("viewProject")} →
                </span>
              </div>

              {/* Year badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-background-dark/70 backdrop-blur-sm rounded-full text-xs font-mono text-white/70 border border-white/10">
                {project.year}
              </div>
            </div>

            {/* Content — staggered reveal */}
            <div className="p-6">
              <motion.h3
                className="text-xl md:text-2xl font-medium text-white mb-2 group-hover:text-green-glow transition-colors duration-300"
                style={{ opacity: titleOpacity, y: titleY }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                className="text-sm md:text-base text-white/55 line-clamp-2 mb-4 leading-relaxed"
                style={{ opacity: descOpacity, y: descY }}
              >
                {project.description}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-2"
                style={{ opacity: tagsOpacity, y: tagsY }}
              >
                {project.stack?.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 bg-white/5 text-white/50 rounded-full border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack?.length > 4 && (
                  <span className="text-xs px-2.5 py-1 text-white/30">
                    +{project.stack.length - 4}
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}

export default function MemoryWall({ projects, locale }) {
  const containerRef = useRef(null)
  const t = useTranslations("Home.projects")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15], [0, 1, 1])
  const headerY = useTransform(scrollYProgress, [0, 0.08], [40, 0])

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative"
      style={{ perspective: "1200px" }}
    >
      {/* Header — sticky */}
      <div className="sticky top-0 z-10 pt-20 pb-72 pointer-events-none">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-3">
            <Balancer>{t("title")}</Balancer>
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Projects — one per scroll "page" */}
      <div className="relative z-20 px-6 lg:px-8 pb-32">
        {projects.map((project, index) => (
          <ProjectPoster
            key={project.slug}
            project={project}
            index={index}
            locale={locale}
            totalCount={projects.length}
          />
        ))}
      </div>
    </section>
  )
}
