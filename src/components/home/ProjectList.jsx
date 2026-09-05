import { Link } from "@/i18n/navigation"

const MAX_STACK_CHIPS = 5

function StackChips({ stack }) {
  if (!stack?.length) return null
  const shown = stack.slice(0, MAX_STACK_CHIPS)
  const remaining = stack.length - shown.length

  return (
    <div className="hidden sm:flex flex-wrap gap-1.5">
      {shown.map((tech) => (
        <span
          key={tech}
          className="px-2 py-0.5 rounded-full text-[11px] font-mono text-white/50 border border-white/10"
        >
          {tech}
        </span>
      ))}
      {remaining > 0 && (
        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono text-white/40 border border-white/10">
          +{remaining}
        </span>
      )}
    </div>
  )
}

export function FeaturedProjectRow({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      id={`project-${project.slug}`}
      data-project-row
      data-slug={project.slug}
      style={{ "--accent": project.accentColor || "#00FF9C" }}
      className="group block border-l-2 border-transparent hover:border-[var(--accent)] pl-4 -ml-4 py-5 rounded-r-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
        <h3 className="text-xl md:text-2xl font-semibold text-white/90 group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-xs text-white/40">{project.year}</span>
      </div>
      <p className="mt-1.5 text-white/70 text-sm md:text-base max-w-2xl">
        {project.description}
      </p>
      <div className="mt-3">
        <StackChips stack={project.stack} />
      </div>
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
      className="group flex items-baseline justify-between gap-4 border-l-2 border-transparent hover:border-[var(--accent)] pl-4 -ml-4 py-2.5 rounded-r-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
    >
      <span className="text-white/80 group-hover:text-[var(--accent)] transition-colors text-sm md:text-base">
        {project.title}
      </span>
      <span className="hidden md:inline text-white/60 text-sm truncate max-w-md">
        {project.description}
      </span>
      <span className="shrink-0 font-mono text-xs text-white/40">{project.year}</span>
    </Link>
  )
}
