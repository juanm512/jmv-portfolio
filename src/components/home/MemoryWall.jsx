"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import { Balancer } from "react-wrap-balancer"

// Project card component
function ProjectCard({ project, index, locale }) {
  // Generate a slight random rotation for each card
  const rotation = index % 2 === 0 ? -2 : 2
  const delay = index * 0.1

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
      className="group relative"
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center"
      }}
    >
      <Link href={`/${locale}/projects/${project.slug}`}>
        <div className="relative overflow-hidden rounded-lg bg-background-dark border border-green-primary/20 shadow-2xl transition-all duration-500 group-hover:border-green-glow/30 group-hover:shadow-[0_0_40px_rgba(0,255,156,0.1)]">
          {/* Image container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-green-primary/20 flex items-center justify-center">
                <span className="text-green-glow/50 font-mono text-sm">
                  {project.title}
                </span>
              </div>
            )}

            {/* Green overlay on hover */}
            <div className="absolute inset-0 bg-green-primary/0 group-hover:bg-green-primary/40 transition-all duration-500 flex items-center justify-center">
              <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Ver proyecto →
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-medium text-white mb-2 group-hover:text-green-glow transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-white/60 line-clamp-2 mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack?.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-green-primary/20 text-green-glow/80 rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.stack?.length > 3 && (
                <span className="text-xs px-2 py-1 text-white/40">
                  +{project.stack.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Year badge */}
          <div className="absolute top-3 right-3 px-2 py-1 bg-background-dark/80 backdrop-blur-sm rounded text-xs font-mono text-white/60">
            {project.year}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function MemoryWall({ projects, locale }) {
  const containerRef = useRef(null)
  const t = useTranslations("Home.projects")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const headerY = useTransform(scrollYProgress, [0, 0.2], [30, 0])

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-32 bg-background-dark overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-green-primary/5 to-background-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-glow/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-4">
            <Balancer>{t("title")}</Balancer>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Projects grid - Floating posters style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              locale={locale}
            />
          ))}
        </div>
      </div>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-dark to-transparent pointer-events-none" />
    </section>
  )
}
