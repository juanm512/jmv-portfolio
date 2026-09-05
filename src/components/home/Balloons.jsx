"use client"

import { useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"

/*
 * Balloons — stack chips that float out of the bottom of the popover with a
 * spring and then bob gently while visible. Mono, 11px, 1px accent border.
 *
 * Tunables (props):
 *   spring    — { stiffness, damping } for the float-out (default 220 / 16)
 *   staggerMs — delay between chips (default 45)
 *   spread    — horizontal spread in px (default 300)
 *   bobAmp    — vertical bob amplitude in px (default 5)
 *   max       — max chips shown (default 6)
 */
function seeded(n) {
  // deterministic pseudo-random so SSR/CSR agree
  const x = Math.sin(n * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

export default function Balloons({
  stack,
  visible,
  spring = { stiffness: 220, damping: 16 },
  staggerMs = 45,
  spread = 300,
  bobAmp = 5,
  max = 6,
}) {
  const chips = useMemo(() => {
    const list = (stack || []).slice(0, max)
    const n = list.length
    return list.map((tech, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1)
      return {
        tech,
        x: (t - 0.5) * spread + (seeded(i + 1) - 0.5) * 20,
        y: -14 - seeded(i + 7) * 16 - (i % 2) * 32,
        rot: (seeded(i + 3) - 0.5) * 10,
        bobDur: 2.2 + seeded(i + 11) * 1.4,
        delay: i * (staggerMs / 1000),
      }
    })
  }, [stack, spread, staggerMs, max])

  return (
    <div className="pointer-events-none absolute left-1/2 bottom-2" aria-hidden>
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
                className="block whitespace-nowrap rounded-full border bg-background-dark/85 px-2.5 py-1 font-mono text-[11px] leading-none text-ink-2"
                style={{
                  borderColor: "color-mix(in srgb, var(--accent) 60%, transparent)",
                  boxShadow: "0 0 12px 0 color-mix(in srgb, var(--accent) 25%, transparent)",
                }}
                animate={{ y: [0, -bobAmp, 0, bobAmp * 0.5, 0] }}
                transition={{ duration: c.bobDur, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
              >
                {c.tech}
              </motion.span>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  )
}
