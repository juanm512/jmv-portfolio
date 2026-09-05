// The one key badge used across the site: navbar hints, TV-menu legend,
// shortcuts help, project prev/next. Keep every keycap looking the same.
// The base display is only added when the caller did not set one, so
// `className="hidden md:inline-flex"` hides the cap below md as expected.
export default function Kbd({ children, className = "" }) {
  const hasDisplay = /(^|\s)(hidden|inline-flex|flex)(\s|$)/.test(className)
  return (
    <kbd
      className={`${className} ${hasDisplay ? "" : "inline-flex"} items-center justify-center min-w-6 h-5 px-1.5 rounded font-mono text-[11px] leading-none text-ink-2 border border-line-strong`}
    >
      {children}
    </kbd>
  )
}
