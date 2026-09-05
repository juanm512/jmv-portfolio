import { Link } from "@/i18n/navigation"
import Arrow from "@/components/ui/Arrow"

// Shared shell for both row kinds: leading year column (tabular figures,
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

// `ref` and the extra handlers are used by FeaturedProjectList to drive the
// hover popover. `line` lets the wrapper own the hairline instead of the link
// (mobile: the inline popover sits between the row and its hairline).
export function FeaturedProjectRow({ project, line = true, ref, ...rest }) {
  return (
    <Link
      ref={ref}
      href={`/projects/${project.slug}`}
      id={`project-${project.slug}`}
      data-project-row
      data-slug={project.slug}
      style={{ "--accent": project.accentColor || "#00FF9C" }}
      className={`${rowBase} ${line ? rowLine : ""} py-6`}
      {...rest}
    >
      <Year year={project.year} />
      <div className="min-w-0">
        <h3 className="text-xl md:text-2xl font-semibold text-ink leading-[1.25] group-hover:text-[var(--accent)] transition-colors duration-200">
          {project.title}
          {project.tagline && (
            <span className="block sm:inline sm:ml-3 text-base md:text-lg font-normal text-ink-2 sm:before:content-['·'] sm:before:mr-3 sm:before:text-ink-3">
              {project.tagline}
            </span>
          )}
        </h3>
        <p className="mt-2 text-ink-2 text-sm md:text-base max-w-[60ch] leading-[1.6]">
          {project.description}
        </p>
        {project.stack?.length > 0 && (
          <p className="hidden sm:block mt-3 font-mono text-xs text-ink-3 truncate" aria-label="Stack">
            {project.stack.join(" · ")}
          </p>
        )}
      </div>
      <RowArrow />
    </Link>
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
