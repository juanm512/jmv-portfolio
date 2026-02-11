"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("Navigation")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}#projects`, label: t("projects") },
    { href: `/${locale}#contact`, label: t("contact") }
  ]

  const toggleLocale = () => {
    const newLocale = locale === "es" ? "en" : "es"
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    window.location.href = newPath
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background-dark/80 backdrop-blur-md border-b border-green-primary/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="font-mono text-lg tracking-tight hover:text-green-glow transition-colors"
            >
              <span className="text-green-glow">JMV</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-glow transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Language toggle */}
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1 text-sm font-mono text-white/60 hover:text-green-glow transition-colors"
              >
                <span className={locale === "es" ? "text-white" : ""}>ES</span>
                <span className="text-white/30">|</span>
                <span className={locale === "en" ? "text-white" : ""}>EN</span>
              </button>

              {/* Contact button - Desktop */}
              <Link
                href={`/${locale}#contact`}
                className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium bg-green-primary/20 text-green-glow border border-green-glow/30 rounded-full hover:bg-green-primary/30 transition-all"
              >
                {t("contact")}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0
                  }}
                  className="w-5 h-px bg-white block"
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className="w-5 h-px bg-white block"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0
                  }}
                  className="w-5 h-px bg-white block"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background-dark/95 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-medium text-white hover:text-green-glow transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
