// The locale layout (src/app/[locale]/layout.js) owns <html> and <body>.
// This root layout exists only so Next can render src/app/not-found.js for
// URLs that match no locale route (e.g. /es/nope).
export default function RootLayout({ children }) {
  return children
}
