"use client"

export default function Error({ reset }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-green-glow mb-4">Error</p>
      <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">
        Something went wrong
      </h1>
      <button
        onClick={() => reset()}
        className="text-white/70 hover:text-white transition-colors"
      >
        Try again
      </button>
    </main>
  )
}
