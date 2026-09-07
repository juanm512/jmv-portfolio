"use client"

import dynamic from "next/dynamic"

// Error boundaries are part of every route's client graph; the translated
// content (and with it the next-intl runtime) only loads if an error happens.
const ErrorContent = dynamic(() => import("./ErrorContent"), { ssr: false })

export default function Error({ reset }) {
  return <ErrorContent reset={reset} />
}
