import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { getProjectBySlug } from "@/lib/projects"

// Inline project name. Hover or keyboard focus opens a card with the cover,
// tagline and stack. CSS only (group-hover / focus-within), no client JS.
// Touch devices get a plain link: the card is hidden where there is no hover.
export default function ProjectMention({ slug, label, locale }) {
  const p = getProjectBySlug(slug, locale)
  if (!p) return label || slug
  const cover = p.hero?.type === "video" ? p.hero.poster : p.hero?.src

  return (
    <span className="group relative inline-block">
      <Link
        href={`/projects/${slug}`}
        className="text-ink underline decoration-[var(--accent)] decoration-1 underline-offset-4 hover:decoration-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow"
        style={{ "--accent": p.accentColor || "#00FF9C" }}
      >
        {label || p.title}
      </Link>
      <span
        role="tooltip"
        className="pointer-events-none invisible opacity-0 translate-y-1 absolute left-0 bottom-full z-40 mb-2 w-72 border border-line-strong bg-background-dark text-left shadow-[0_0_40px_-12px_var(--accent)] transition duration-150 ease-out group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 motion-reduce:transition-none [@media(hover:none)]:hidden"
        style={{ "--accent": p.accentColor || "#00FF9C" }}
      >
        {cover && (
          <span className="relative block aspect-[16/10] border-b border-line">
            <Image src={cover} alt="" fill sizes="288px" className="object-cover" />
          </span>
        )}
        <span className="block p-3">
          <span className="flex items-baseline justify-between gap-2">
            <span className="font-semibold text-ink text-base leading-tight">{p.title}</span>
            <span className="font-mono text-xs text-ink-3">{p.year}</span>
          </span>
          {p.tagline && <span className="mt-1 block text-sm leading-snug text-ink-2">{p.tagline}</span>}
          <span className="mt-2 flex flex-wrap gap-1">
            {p.stack?.slice(0, 5).map((s) => (
              <span key={s} className="border border-line px-1.5 font-mono text-[11px] leading-5 text-ink-2">{s}</span>
            ))}
          </span>
        </span>
      </span>
    </span>
  )
}
