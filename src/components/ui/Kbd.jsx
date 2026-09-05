// The one key badge used across the site: navbar hints, TV-menu legend,
// shortcuts help, project prev/next. Keep every keycap looking the same.
export default function Kbd({ children, className = "" }) {
  return (
    <kbd
      className={`inline-flex items-center justify-center min-w-6 h-5 px-1.5 rounded font-mono text-[11px] leading-none text-ink-2 border border-line-strong ${className}`}
    >
      {children}
    </kbd>
  )
}
