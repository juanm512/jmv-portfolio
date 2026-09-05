import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-green-glow mb-4">404</p>
      <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">
        Page not found
      </h1>
      <Link href="/" className="text-white/70 hover:text-white transition-colors">
        ← Back to home
      </Link>
    </main>
  )
}
