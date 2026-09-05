"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { useLanguageToggle } from "@/lib/useLanguageToggle"

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.37 4.25 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

function LangIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h7" />
      <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
      <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
      <path d="M12 20l4 -9l4 9" />
      <path d="M19.1 18h-6.2" />
    </svg>
  )
}

function KeyBadge({ children }) {
  return (
    <span className="hidden md:inline-flex text-[10px] font-mono ring-1 ring-white/20 text-white/40 px-1.5 py-0.5 rounded-md ml-1.5">
      {children}
    </span>
  )
}

export default function Navbar() {
  const t = useTranslations("Navigation")
  const { nextLocale, toggleLanguage } = useLanguageToggle()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background-dark/70 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-kode text-sm sm:text-base text-white hover:text-green-glow transition-colors tracking-tight"
        >
          Juan Manuel Vila
        </Link>

        <div className="flex items-center gap-1 sm:gap-2 text-white/70">
          <Link
            href="/about"
            className="hidden sm:inline-flex items-center px-2.5 py-1.5 rounded-md text-sm hover:text-white hover:bg-white/5 transition-colors"
          >
            {t("about")}
            <KeyBadge>A</KeyBadge>
          </Link>

          <a
            href="https://github.com/juanm512"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-md hover:text-white hover:bg-white/5 transition-colors"
          >
            <GithubIcon />
          </a>

          <a
            href="https://linkedin.com/in/juanmanuelvila/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-md hover:text-white hover:bg-white/5 transition-colors"
          >
            <LinkedinIcon />
          </a>

          <a
            href="mailto:512juanm@gmail.com"
            aria-label="Email"
            className="p-2 rounded-md hover:text-white hover:bg-white/5 transition-colors"
          >
            <MailIcon />
          </a>

          <a
            href="/cv-es.pdf"
            download
            aria-label="CV"
            className="p-2 rounded-md hover:text-white hover:bg-white/5 transition-colors"
          >
            <DownloadIcon />
          </a>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={`Switch to ${nextLocale}`}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-sm hover:text-white hover:bg-white/5 transition-colors"
          >
            <LangIcon />
            <span className="hidden sm:inline uppercase text-xs font-mono">{nextLocale}</span>
            <KeyBadge>L</KeyBadge>
          </button>

          <Link
            href="/about"
            aria-label={t("about")}
            className="sm:hidden p-2 rounded-md hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="text-xs font-mono">A</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
