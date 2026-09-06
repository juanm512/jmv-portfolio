// Decorative arrow glyph for links. Parent uses `group` so the arrow can
// nudge on hover via `group-hover:translate-x-0.5`.
export default function Arrow({ direction = "right", className = "" }) {
  const rotate = { right: "", left: "rotate-180", down: "rotate-90", up: "-rotate-90" }[direction] || ""
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${rotate} ${className}`}
    >
      <path d="M3 8h10" />
      <path d="M9 4l4 4-4 4" />
    </svg>
  )
}
