"use client"

import { forwardRef } from "react"
import { Link } from "@/i18n/navigation"

const MAX_STACK_CHIPS = 5

// Copy of FeaturedProjectRow (src/components/home/ProjectList.jsx) that
// forwards a ref and accepts extra handlers/children for the lab prototypes.
const LabRow = forwardRef(function LabRow(
  { project, children, className = "", hideChips = false, style, ...rest },
  ref
) {
  const shown = project.stack.slice(0, MAX_STACK_CHIPS)
  const remaining = project.stack.length - shown.length

  return (
    <Link
      ref={ref}
      href={`/projects/${project.slug}`}
      id={`lab-project-${project.slug}`}
      data-project-row
      data-slug={project.slug}
      style={{ "--accent": project.accent, ...style }}
      className={`group block border-l-2 border-transparent hover:border-[var(--accent)] pl-4 -ml-4 py-5 rounded-r-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark ${className}`}
      {...rest}
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
      {!hideChips && (
        <div className="mt-3 hidden sm:flex flex-wrap gap-1.5">
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
      )}
      {children}
    </Link>
  )
})

export default LabRow
