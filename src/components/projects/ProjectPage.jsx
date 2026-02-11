"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { Balancer } from "react-wrap-balancer"

// Arrow left icon
function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

// External link icon
function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

// Parse markdown content to JSX (simple version)
function parseContent(content) {
  if (!content) return null

  const lines = content.split("\n")
  const elements = []
  let currentList = []
  let inList = false

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    if (trimmed.startsWith("## ")) {
      if (inList) {
        elements.push(
          <ul key={`ul-${index}`} className="list-disc list-inside text-white/70 mb-6 space-y-2">
            {currentList}
          </ul>
        )
        currentList = []
        inList = false
      }
      elements.push(
        <h2 key={index} className="text-2xl md:text-3xl font-semibold text-white mb-4 mt-12">
          {trimmed.replace("## ", "")}
        </h2>
      )
    } else if (trimmed.startsWith("- ")) {
      inList = true
      currentList.push(
        <li key={`li-${index}`} className="text-white/70">
          {trimmed.replace("- ", "")}
        </li>
      )
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      if (inList) {
        elements.push(
          <ul key={`ul-${index}`} className="list-disc list-inside text-white/70 mb-6 space-y-2">
            {currentList}
          </ul>
        )
        currentList = []
        inList = false
      }
      const text = trimmed.replace(/\*\*/g, "")
      elements.push(
        <p key={index} className="text-white font-semibold mb-2">
          {text}
        </p>
      )
    } else if (trimmed) {
      if (inList) {
        elements.push(
          <ul key={`ul-${index}`} className="list-disc list-inside text-white/70 mb-6 space-y-2">
            {currentList}
          </ul>
        )
        currentList = []
        inList = false
      }
      elements.push(
        <p key={index} className="text-white/70 leading-relaxed mb-4">
          {trimmed}
        </p>
      )
    }
  })

  if (inList && currentList.length > 0) {
    elements.push(
      <ul className="list-disc list-inside text-white/70 mb-6 space-y-2">
        {currentList}
      </ul>
    )
  }

  return elements
}

export default function ProjectPage({ project }) {
  const locale = useLocale()
  const t = useTranslations("Project")

  return (
    <main className="min-h-screen bg-background-dark">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background image or video */}
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-primary/40 to-background-dark" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent" />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-24 left-6 lg:left-12 z-10"
        >
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-background-dark/50 backdrop-blur-sm text-white rounded-full border border-white/10 hover:bg-background-dark/70 transition-all"
          >
            <ArrowLeftIcon />
            <span className="text-sm">Back</span>
          </Link>
        </motion.div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-4">
              <Balancer>{project.title}</Balancer>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-sm font-mono text-green-glow/70 uppercase tracking-wider mb-4">
              {t("stack")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-green-primary/20 text-green-glow rounded-full text-sm border border-green-glow/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {parseContent(project.content)}
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-12 pt-12 border-t border-white/10"
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-glow text-background-dark font-medium rounded-full hover:bg-green-glow/90 transition-colors"
              >
                {t("viewLive")}
                <ExternalLinkIcon />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
              >
                {t("viewCode")}
                <ExternalLinkIcon />
              </a>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
