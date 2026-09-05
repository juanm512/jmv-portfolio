import { useTranslations } from "next-intl"
import Arrow from "@/components/ui/Arrow"

const EMAIL = "mailto:512juanm@gmail.com"
const GITHUB = "https://github.com/juanm512"
const LINKEDIN = "https://linkedin.com/in/juanmanuelvila/"
const CV = "/cv-es.pdf"

const linkClass =
  "group flex items-center justify-between gap-4 min-h-11 py-3 text-ink-2 hover:text-ink transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"

// Closing block before the footer: a small heading and plain links with
// hairlines between them. No cards, no buttons (DESIGN.md, la regla del filete).
// Compact variant: one line of links (used under the home title and in footers).
export function ContactLinks({ className = "" }) {
  const t = useTranslations("Home.contact")
  const links = [
    { id: "email", label: t("email"), href: EMAIL },
    { id: "github", label: t("github"), href: GITHUB, external: true },
    { id: "linkedin", label: t("linkedin"), href: LINKEDIN, external: true },
    { id: "cv", label: t("cv"), href: CV, download: true }
  ]
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-1 text-sm ${className}`}>
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            download={link.download ? true : undefined}
            className="inline-flex items-center min-h-11 md:min-h-0 py-2 -my-2 text-ink-2 hover:text-green-glow transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function ContactBlock({ className = "" }) {
  const t = useTranslations("Home.contact")

  const links = [
    { id: "email", label: t("email"), href: EMAIL, value: "512juanm@gmail.com" },
    { id: "github", label: t("github"), href: GITHUB, value: "github.com/juanm512", external: true },
    { id: "linkedin", label: t("linkedin"), href: LINKEDIN, value: "linkedin.com/in/juanmanuelvila", external: true },
    { id: "cv", label: t("cv"), href: CV, value: "cv-es.pdf", download: true }
  ]

  return (
    <section aria-labelledby="contact-heading" className={className}>
      <h2 id="contact-heading" className="text-sm text-ink-2 mb-2">
        {t("title")}
      </h2>
      <ul className="border-t border-line">
        {links.map((link) => (
          <li key={link.id} className="border-b border-line">
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              download={link.download ? true : undefined}
              className={linkClass}
            >
              <span className="text-ink">{link.label}</span>
              <span className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-xs text-ink-3 truncate">{link.value}</span>
                <Arrow
                  className="text-ink-3 group-hover:text-ink transition-[color,transform] duration-200 ease-out-expo group-hover:translate-x-0.5 motion-reduce:transform-none"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
