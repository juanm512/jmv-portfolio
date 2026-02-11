"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import { Balancer } from "react-wrap-balancer"

// Icons
function EmailIcon() {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function GitHubIcon() {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedInIcon() {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function ContactSection() {
  const containerRef = useRef(null)
  const t = useTranslations("Home.contact")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const y = useTransform(scrollYProgress, [0.2, 0.4], [50, 0])

  const contactLinks = [
    {
      label: t("email"),
      href: "mailto:juanmanuelvila99@gmail.com",
      icon: EmailIcon
    },
    {
      label: t("github"),
      href: "https://github.com/juanmvila",
      icon: GitHubIcon,
      external: true
    },
    {
      label: t("linkedin"),
      href: "https://linkedin.com/in/juanmvila",
      icon: LinkedInIcon,
      external: true
    }
  ]

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-background-dark overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-glow/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-6">
          <Balancer>{t("title")}</Balancer>
        </h2>

        <p className="text-lg md:text-xl text-white/60 mb-12">
          {t("subtitle")}
        </p>

        {/* Contact buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-green-primary/20 text-white border border-green-glow/20 rounded-full hover:bg-green-primary/30 hover:border-green-glow/40 transition-all duration-300"
              >
                <span className="text-green-glow/70 group-hover:text-green-glow transition-colors">
                  <link.icon />
                </span>
                <span className="font-medium">{link.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-sm text-white/30 font-mono"
        >
          © {new Date().getFullYear()} Juan Manuel Vila
        </motion.p>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-glow/20 to-transparent" />
    </section>
  )
}
