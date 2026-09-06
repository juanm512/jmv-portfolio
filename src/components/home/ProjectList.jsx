import { Link } from "@/i18n/navigation"
import Arrow from "@/components/ui/Arrow"

// Shell for the secondary rows (FeaturedProjectRow has its own grid): leading year column (tabular figures,
// baseline-aligned with the title), a hairline below that brightens on hover,
// title takes the project accent, arrow slides in from the right.
export const rowBase =
  "group grid grid-cols-[3.25rem_minmax(0,1fr)_auto] sm:grid-cols-[4rem_minmax(0,1fr)_auto] items-baseline gap-x-3 sm:gap-x-4 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark rounded-none px-4 sm:px-5 sm:-mx-5"

export const rowLine = "border-b border-line hover:border-line-strong"

function Year({ year }) {
  return (
    <span className="font-mono text-xs text-ink-3 tabular-nums self-baseline pt-1 sm:pt-0">{year}</span>
  )
}

function RowArrow() {
  return (
    <span className="text-ink-3 group-hover:text-[var(--accent)] transition-[color,transform] duration-200 ease-out-expo translate-x-0 group-hover:translate-x-0.5 motion-reduce:transform-none">
      <Arrow />
    </span>
  )
}

export function SecondaryProjectRow({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      id={`project-${project.slug}`}
      data-project-row
      data-slug={project.slug}
      style={{ "--accent": project.accentColor || "#00FF9C" }}
      className={`${rowBase} ${rowLine} py-2.5 min-h-11`}
    >
      <Year year={project.year} />
      <span className="min-w-0 flex items-baseline gap-x-3">
        <span className="shrink-0 text-ink-2 text-sm group-hover:text-[var(--accent)] transition-colors duration-200">
          {project.title}
        </span>
        <span className="hidden md:inline text-ink-3 text-xs truncate">
          {project.tagline || project.description}
        </span>
      </span>
      <RowArrow />
    </Link>
  )
}
