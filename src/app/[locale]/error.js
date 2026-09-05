"use client"

import { useTranslations } from "next-intl"

export default function Error({ reset }) {
  const t = useTranslations("Error")
  return (
    <main className="min-h-[calc(100vh-3.5rem)] px-6 max-w-4xl mx-auto flex flex-col justify-center py-20">
      <p className="font-mono text-sm text-green-glow mb-4">{t("label")}</p>
      <h1 className="text-2xl md:text-3xl font-semibold text-ink leading-[1.25] mb-8">{t("title")}</h1>
      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex items-center min-h-11 self-start text-sm text-ink-2 hover:text-ink transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-green-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
      >
        {t("retry")}
      </button>
    </main>
  )
}
