"use client"

import { useLanguageToggle } from "@/lib/useLanguageToggle"
import { openTvMenu } from "@/lib/tvMenuStore"
import Kbd from "@/components/ui/Kbd"

function LangIcon() {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h7" />
      <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
      <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
      <path d="M12 20l4 -9l4 9" />
      <path d="M19.1 18h-6.2" />
    </svg>
  )
}

const navButton =
  "flex items-center gap-2 h-9 min-h-11 md:min-h-9 px-2 -mx-1 rounded-sm text-sm text-ink-2 hover:text-ink transition-colors outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"

// The only interactive part of the navbar: "Menú" opens the TV menu, the
// language button swaps es/en. Labels arrive from the server component.
export default function NavButtons({ menuLabel, menuHint, switchLabel }) {
  const { nextLocale, toggleLanguage } = useLanguageToggle()

  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <span className="flex items-center gap-1.5">
        <button type="button" onClick={(e) => openTvMenu(e.currentTarget)} className={navButton}>
          {menuLabel}
          <Kbd className="hidden md:inline-flex">{menuHint}</Kbd>
        </button>
      </span>

      <button type="button" onClick={toggleLanguage} aria-label={switchLabel} className={navButton}>
        <LangIcon />
        <span className="hidden sm:inline uppercase text-xs font-mono">{nextLocale}</span>
        <Kbd className="hidden md:inline-flex">L</Kbd>
      </button>
    </div>
  )
}
