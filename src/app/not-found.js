import "@/styles/globals.css"
import localFont from "next/font/local"
import { GeistSans } from "geist/font/sans"
import RootNotFound from "@/components/layout/RootNotFound"
import es from "../../messages/es.json"
import en from "../../messages/en.json"

// Only the 404 strings reach the client; the JSON files stay on the server.
const MESSAGES = { es: es.NotFound, en: en.NotFound }

const kodeMono = localFont({
  src: "../../styles/Kode_Mono/KodeMono-latin-400-600.woff2",
  display: "swap",
  variable: "--font-kode-mono"
})

export const metadata = {
  title: "404 | Juan Manuel Vila",
  robots: { index: false, follow: false }
}

// Reached for URLs that match no locale route (e.g. /es/nope). The locale
// layout never runs here, so this page owns <html>/<body> and picks the
// language from the first path segment on the client.
export default function NotFound() {
  return (
    <html lang="es" className={`${GeistSans.variable} ${kodeMono.variable}`}>
      <body className="relative font-sans w-full min-h-screen p-0 m-0 overflow-x-hidden bg-background-dark text-ink">
        <RootNotFound messages={MESSAGES} />
      </body>
    </html>
  )
}
