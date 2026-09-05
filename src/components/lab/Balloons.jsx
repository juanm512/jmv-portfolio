"use client"

import { useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"

/*
 * Balloons — stack chips that float out of an origin point with a spring and
 * then bob gently while visible.
 *
 * Tunables (props):
 *   spring   — { stiffness, damping } for the float-out (default 220 / 16)
 *   staggerMs — delay between chips (default 45)
 *   spread   — horizontal spread in px (default 330)
 *   bobAmp   — vertical bob amplitude in px (default 6)
 *   max      — max chips shown (default 6)
 */
function seeded(n) {
  // deterministic pseudo-random so SSR/CSR don't disagree
  const x = Math.sin(n * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

export default function Balloons({
  stack,
  accent,
  visible,
  spring = { stiffness: 220, damping: 16 },
  staggerMs = 45,
  spread = 330,
  bobAmp = 6,
  max = 6,
  className = "",
}) {
  const chips = useMemo(() => {
    const list = stack.slice(0, max)
    const n = list.length
    return list.map((tech, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1)
      return {
        tech,
        x: (t - 0.5) * spread + (seeded(i + 1) - 0.5) * 20,
        y: -14 - seeded(i + 7) * 16 - (i % 2) * 34,
        rot: (seeded(i + 3) - 0.5) * 10,
        bobDur: 2.2 + seeded(i + 11) * 1.4,
        delay: i * (staggerMs / 1000),
      }
    })
  }, [stack, spread, staggerMs, max])

  return (
    <div
      className={`pointer-events-none absolute left-1/2 bottom-2 ${className}`}
      style={{ "--accent": accent }}
      aria-hidden
    >
      <AnimatePresence>
        {visible &&
          chips.map((c) => (
            <motion.div
              key={c.tech}
              className="absolute"
              initial={{ opacity: 0, x: 0, y: 24, scale: 0.4, rotate: 0 }}
              animate={{ opacity: 1, x: c.x, y: c.y, scale: 1, rotate: c.rot }}
              exit={{ opacity: 0, y: 28, scale: 0.5, transition: { duration: 0.18 } }}
              transition={{ type: "spring", ...spring, delay: c.delay }}
              style={{ translateX: "-50%" }}
            >
              <motion.span
                className="block whitespace-nowrap rounded-full border bg-background-dark/80 px-2.5 py-1 font-mono text-[11px] text-white/80 backdrop-blur-sm"
                style={{
                  borderColor: "var(--accent)",
                  boxShadow: "0 0 14px 0 color-mix(in srgb, var(--accent) 45%, transparent)",
                }}
                animate={{ y: [0, -bobAmp, 0, bobAmp * 0.5, 0] }}
                transition={{
                  duration: c.bobDur,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: c.delay,
                }}
              >
                {c.tech}
              </motion.span>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  )
}
