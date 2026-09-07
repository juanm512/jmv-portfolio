import Link from "next/link"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import Kbd from "@/components/ui/Kbd"
import Arrow from "@/components/ui/Arrow"
import LightboxProvider from "@/components/projects/LightboxProvider"
import ZoomButton, { focusRing } from "@/components/projects/ZoomButton"
import LazyVideo from "@/components/projects/LazyVideo"
import GridImage from "@/components/projects/GridImage"
import HeroMedia from "@/components/projects/HeroMedia"
import Reveal from "@/components/projects/Reveal"

// Server component: every block is static HTML. The client islands are the
// zoom buttons (+ lazy lightbox), the in-view videos, the two figures that
// detect their orientation on load, and the scroll-in reveal wrapper.

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

// "Label — explanation" inside a bullet becomes "Label: explanation";
// dashes inside prose sentences are left as they are.
function bulletText(line) {
  return line.replace(/^([^—]{1,60}?) — /, "$1: ")
}

// Splits block text into paragraphs on blank lines; consecutive lines that
// start with "• " become a list.
function parseText(text = "") {
  return text.split(/\n\s*\n/).map((chunk) => {
    const lines = chunk.split("\n").filter((l) => l.trim().length)
    const bullets = lines.filter((l) => l.trim().startsWith("• "))
    if (bullets.length === 0) return { kind: "p", text: chunk.trim() }
    const intro = lines.filter((l) => !l.trim().startsWith("• "))
    return {
      kind: "list",
      intro: intro.join(" ").trim(),
      items: bullets.map((l) => bulletText(l.trim().slice(2)))
    }
  })
}

function TextBlock({ block }) {
  const parts = parseText(block.text)
  const lead = "text-lg md:text-xl text-ink-2 leading-[1.65] max-w-[65ch]"
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-6">
      {block.title && (
        <h2 className="text-2xl md:text-3xl font-semibold text-ink leading-[1.25] mb-5 text-balance">
          {block.title}
        </h2>
      )}
      <div className="flex flex-col gap-5">
        {parts.map((part, i) =>
          part.kind === "p" ? (
            <p key={i} className={lead}>{part.text}</p>
          ) : (
            <div key={i} className="flex flex-col gap-3">
              {part.intro && <p className={lead}>{part.intro}</p>}
              <ul className={`${lead} flex flex-col gap-2 pl-5 list-disc marker:text-ink-3`}>
                {part.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  )
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|ogg)$/i

function GridVideo({ item, t }) {
  return (
    <figure className="sm:col-span-2 lg:col-span-3">
      <ZoomButton
        label={t("openVideo")}
        src={item.src}
        type="video"
        alt={item.caption}
        className="relative aspect-[4/3] rounded-sm overflow-hidden bg-ink/5"
      >
        <LazyVideo src={item.src} poster={item.poster} className="w-full h-full object-cover" />
      </ZoomButton>
      <Caption text={item.caption} />
    </figure>
  )
}

// Portrait shots (phones) sit three across on desktop, two on mobile, in
// 9/16 cells with `contain`; landscape shots span the row at 4/3 `cover`.
function GridBlock({ block, t }) {
  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {block.items.map((item, idx) =>
          VIDEO_EXTENSIONS.test(item.src) ? (
            <GridVideo key={idx} item={item} t={t} />
          ) : (
            <GridImage
              key={idx}
              src={item.src}
              caption={item.caption}
              alt={item.caption || t("projectImage")}
              label={t("openImage")}
            />
          )
        )}
      </div>
    </div>
  )
}

function FullWidthImageBlock({ block, t }) {
  const alt = block.caption || t("projectImage")
  return (
    <figure className="py-12 w-full">
      <ZoomButton
        label={t("openImage")}
        src={block.src}
        type="image"
        alt={alt}
        className="relative w-full h-[50vh] md:h-[80vh]"
      >
        <Image
          src={block.src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </ZoomButton>
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
        <h3 className="text-xl md:text-2xl font-semibold text-ink leading-[1.25] mb-5 text-balance">
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

function VideoBlock({ block, t }) {
  return (
    <figure className="py-12 px-6 max-w-7xl mx-auto">
      {block.title && (
        <h3 className="text-xl md:text-2xl font-semibold text-ink leading-[1.25] mb-5 text-balance">
          {block.title}
        </h3>
      )}
      <ZoomButton
        label={t("openVideo")}
        src={block.src}
        type="video"
        alt={block.caption}
        className="relative w-full rounded-sm overflow-hidden bg-ink/5"
      >
        <LazyVideo
          src={block.src}
          poster={block.poster}
          className="w-full h-auto max-h-[80vh] object-contain bg-background-darker"
        />
      </ZoomButton>
      <Caption text={block.caption} />
    </figure>
  )
}

function renderBlock(block, index, t) {
  let content = null

  switch (block.type) {
    case "text":
      content = <TextBlock block={block} />
      break
    case "grid":
      content = <GridBlock block={block} t={t} />
      break
    case "full-width-image":
      content = <FullWidthImageBlock block={block} t={t} />
      break
    case "stats":
      content = <StatsBlock block={block} />
      break
    case "code":
      content = <CodeBlock block={block} />
      break
    case "video":
      content = <VideoBlock block={block} t={t} />
      break
    default:
      return null
  }

  return <Reveal key={index}>{content}</Reveal>
}

function linkLabel(key, url, t) {
  if (key === "repo") return t("code")
  if (key === "live") return t("web")
  if (key === "live2") return /play\.google\.com/.test(url) ? t("playStore") : t("app")
  return key
}

// Prev/next as one hairline row: previous on the left, next on the right,
// each with its arrow key cap (from md up, where a keyboard is likely).
function AdjacentRow({ prevProject, nextProject, locale, t }) {
  const item = "group inline-flex items-center gap-2 min-h-11 py-2 text-sm text-ink-2 hover:text-ink transition-colors " + focusRing
  return (
    <nav aria-label={t("prevProject") + " / " + t("nextProject")} className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between gap-6 border-y border-line">
        {prevProject ? (
          <Link href={`/${locale}/projects/${prevProject.slug}`} className={item}>
            <Kbd className="hidden md:inline-flex">{"←"}</Kbd>
            <Arrow direction="left" className="transition-transform duration-200 ease-out-expo group-hover:-translate-x-0.5 motion-reduce:transform-none" />
            <span className="sr-only">{t("prevProject")}: </span>
            <span className="text-ink">{prevProject.title}</span>
          </Link>
        ) : <span />}
        {nextProject && (
          <Link href={`/${locale}/projects/${nextProject.slug}`} className={`${item} text-right`}>
            <span className="sr-only">{t("nextProject")}: </span>
            <span className="text-ink">{nextProject.title}</span>
            <Arrow className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 motion-reduce:transform-none" />
            <Kbd className="hidden md:inline-flex">{"→"}</Kbd>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default async function ProjectPage({ project, nextProject, prevProject, locale }) {
  const t = await getTranslations("Project")

  if (!project) return null

  const accent = project.accentColor || "#00FF9C"
  const links = Object.entries(project.links || {}).filter(([, url]) => Boolean(url))
  const context = project.context || project.client
  const lightboxLabels = { lightbox: t("lightbox"), closeLightbox: t("closeLightbox") }

  return (
    <LightboxProvider labels={lightboxLabels}>
    <main
      data-prev={prevProject ? `/${locale}/projects/${prevProject.slug}` : undefined}
      data-next={nextProject ? `/${locale}/projects/${nextProject.slug}` : undefined}
      className="min-h-screen bg-background-dark text-ink font-sans selection:bg-green-glow/30"
      style={{ "--accent": accent }}
    >
      {/* 1. Title block on plain ground; the image comes after, not behind. */}
      <section className="max-w-7xl mx-auto px-6 pt-8 md:pt-12 pb-10 md:pb-14">
        <div className="flex items-center justify-between gap-6 mb-10 md:mb-16">
          <Link
            href={`/${locale}`}
            className={`group inline-flex items-center gap-2 min-h-11 -my-2 text-sm text-ink-2 hover:text-ink transition-colors ${focusRing}`}
          >
            <Arrow direction="left" className="transition-transform duration-200 ease-out-expo group-hover:-translate-x-0.5 motion-reduce:transform-none" />
            <span>{t("backToHome")}</span>
            <Kbd className="hidden md:inline-flex">{"⌫"}</Kbd>
          </Link>
          <div className="hidden md:flex items-center gap-4 text-sm text-ink-3">
            {prevProject && (
              <Link href={`/${locale}/projects/${prevProject.slug}`} className={`inline-flex items-center gap-2 min-h-11 -my-2 hover:text-ink transition-colors ${focusRing}`}>
                <Kbd>{"←"}</Kbd>
                <span>{prevProject.title}</span>
              </Link>
            )}
            {nextProject && (
              <Link href={`/${locale}/projects/${nextProject.slug}`} className={`inline-flex items-center gap-2 min-h-11 -my-2 hover:text-ink transition-colors ${focusRing}`}>
                <span>{nextProject.title}</span>
                <Kbd>{"→"}</Kbd>
              </Link>
            )}
          </div>
        </div>

        {/* Fades up on load via CSS (globals.css), so the h1 needs no JS to paint. */}
        <div data-reveal="load">
          <p className="text-[var(--accent)] font-mono text-sm tabular-nums mb-4">
            {context} · {project.year}
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold tracking-[-0.02em] leading-[1.05] text-ink mb-4">
            {project.title}
          </h1>
          {project.tagline && (
            <p className="text-xl md:text-2xl text-ink-2 max-w-[48ch] leading-[1.5] mb-6">
              {project.tagline}
            </p>
          )}
          <p className="text-base md:text-lg text-ink-2 max-w-[65ch] leading-[1.6]">
            {project.description}
          </p>
        </div>
      </section>

      <HeroMedia
        hero={project.hero}
        title={project.title}
        label={project.hero?.type === "video" ? t("openVideo") : t("openImage")}
      />

      {/* 2. Metadata */}
      <section className="border-b border-line">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <p className="font-mono text-xs text-ink-3 mb-1.5">{t("role")}</p>
              <p className="text-lg text-ink">{project.role}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-ink-3 mb-1.5">{t("context")}</p>
              <p className="text-lg text-ink">{context}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-ink-3 mb-1.5">{t("year")}</p>
              <p className="text-lg text-ink tabular-nums">{project.year}</p>
            </div>
            {links.length > 0 && (
              <div>
                <p className="font-mono text-xs text-ink-3 mb-1.5">{t("links")}</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {links.map(([key, url]) => (
                    <li key={key}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 min-h-11 -my-2 transition-colors ${
                          key === "repo" ? "text-ink-2 hover:text-ink" : "text-[var(--accent)] hover:text-ink"
                        } ${focusRing}`}
                      >
                        {linkLabel(key, url, t)} <ExternalLinkIcon />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Stack: one mono line, separated by middle dots. */}
          <p className="mt-8 pt-6 border-t border-line font-mono text-xs text-ink-3 leading-[2]">
            <span className="sr-only">{t("stack")}: </span>
            {project.stack?.map((tech, i) => (
              <span key={tech}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                {tech}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* 3. Narrative blocks */}
      <section className="py-12 md:py-24">
        {project.content?.map((block, idx) => renderBlock(block, idx, t))}
      </section>

      {/* 4. Prev / next */}
      <section className="pb-24 md:pb-32">
        <AdjacentRow prevProject={prevProject} nextProject={nextProject} locale={locale} t={t} />
        <div className="max-w-7xl mx-auto px-6 mt-8">
          <Link
            href={`/${locale}`}
            className={`group inline-flex items-center gap-1.5 min-h-11 text-sm text-ink-2 hover:text-ink transition-colors ${focusRing}`}
          >
            {t("viewAllProjects")}
            <Arrow className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 motion-reduce:transform-none" />
          </Link>
        </div>
      </section>
    </main>
    </LightboxProvider>
  )
}
