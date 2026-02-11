import Image from "next/image"

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components) {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-white mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-white mb-3 mt-8">{children}</h2>
    ),
    p: ({ children }) => (
      <p className="text-white/70 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-white/70 mb-4 space-y-1">
        {children}
      </ul>
    ),
    li: ({ children }) => <li className="text-white/70">{children}</li>,
    img: ({ src, alt }) => (
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="rounded-lg my-6"
      />
    ),
    ...components
  }
}
