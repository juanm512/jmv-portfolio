// Fake window templates for the floating "windows" background.
// kind: shell | code | browser | app. Lines are arrays of tokens {t, c} where
// c is a colour key: g (green-glow), i (ink-2), b (muted blue), d (dim).
const g = (t) => ({ t, c: "g" })
const i = (t) => ({ t, c: "i" })
const b = (t) => ({ t, c: "b" })
const d = (t) => ({ t, c: "d" })

export const WINDOWS = [
  {
    kind: "shell",
    title: "~/tuerca — zsh",
    lines: [
      [g("$ "), i("pnpm build")],
      [d("▲ Next.js 16.0.0")],
      [d("  Creating an optimized production build ...")],
      [g("✓ "), i("Compiled in 480ms")],
      [g("✓ "), i("Generating static pages (24/24)")],
      [d("  Route (app)            Size")],
      [d("  ○ /                    2.1 kB")],
      [g("$ "), d("_")],
    ],
  },
  {
    kind: "shell",
    title: "~/copon — bash",
    lines: [
      [g("$ "), i("docker compose up -d")],
      [d("[+] Running 3/3")],
      [g(" ✔ "), i("Container copon-db     Started")],
      [g(" ✔ "), i("Container copon-redis  Started")],
      [g(" ✔ "), i("Container copon-api    Started")],
      [g("$ "), i("curl localhost:4000/health")],
      [d('{"status":"ok","uptime":12}')],
    ],
  },
  {
    kind: "shell",
    title: "git — zsh",
    lines: [
      [g("$ "), i("git log --oneline -4")],
      [b("22510ef "), i("agregar proyecto Copon")],
      [b("055f287 "), i("mejorando contenido")],
      [b("e2f2092 "), i("deleting unused code")],
      [b("909a302 "), i("changing favicon")],
      [g("$ "), i("git push origin main")],
      [d("Everything up-to-date")],
    ],
  },
  {
    kind: "shell",
    title: "vitest — node",
    lines: [
      [g("$ "), i("pnpm test")],
      [g(" ✓ "), i("lib/projects.test.ts "), d("(12)")],
      [g(" ✓ "), i("lib/i18n.test.ts "), d("(8)")],
      [g(" ✓ "), i("api/splats.test.ts "), d("(31)")],
      [d(" Test Files  3 passed (3)")],
      [d("      Tests  51 passed (51)")],
      [d("   Duration  1.24s")],
    ],
  },
  {
    kind: "code",
    title: "schema.ts — code",
    lines: [
      [b("export const "), i("tenants "), d("= "), g("pgTable"), d("("), i('"tenants"'), d(", {")],
      [d("  "), i("id"), d(": "), g("uuid"), d("().primaryKey(),")],
      [d("  "), i("slug"), d(": "), g("text"), d("().notNull().unique(),")],
      [d("  "), i("plan"), d(": "), g("planEnum"), d("().default("), i('"free"'), d("),")],
      [d("  "), i("createdAt"), d(": "), g("timestamp"), d("().defaultNow(),")],
      [d("})")],
      [b("export type "), i("Tenant "), d("= "), b("typeof "), i("tenants.$inferSelect")],
    ],
  },
  {
    kind: "code",
    title: "route.ts — code",
    lines: [
      [b("export async function "), g("POST"), d("("), i("req"), d(": Request) {")],
      [d("  "), b("const "), i("body "), d("= "), b("await "), i("req"), d(".json()")],
      [d("  "), b("const "), i("parsed "), d("= "), i("schema"), d(".safeParse("), i("body"), d(")")],
      [d("  "), b("if "), d("(!"), i("parsed"), d(".success) "), b("return "), g("json"), d("(400)")],
      [d("  "), b("await "), i("db"), d(".insert("), i("orders"), d(").values("), i("parsed"), d(".data)")],
      [d("  "), b("return "), g("json"), d("({ ok: "), b("true"), d(" })")],
      [d("}")],
    ],
  },
  {
    kind: "code",
    title: "useSplat.ts — code",
    lines: [
      [b("export function "), g("useSplat"), d("("), i("url"), d(": string) {")],
      [d("  "), b("const "), d("["), i("gs"), d(", "), i("setGs"), d("] = "), g("useState"), d("<"), i("Splat"), d(">()")],
      [d("  "), g("useEffect"), d("(() => {")],
      [d("    "), g("loadPly"), d("("), i("url"), d(").then("), i("setGs"), d(")")],
      [d("  }, ["), i("url"), d("])")],
      [d("  "), b("return "), i("gs")],
      [d("}")],
    ],
  },
  {
    kind: "code",
    title: "Row.jsx — code",
    lines: [
      [b("export default function "), g("Row"), d("({ "), i("project"), d(" }) {")],
      [d("  "), b("return "), d("(")],
      [d("    <"), g("Link"), d(" "), i("href"), d("={`/projects/${"), i("project.slug"), d("}`}>")],
      [d("      <"), g("h3"), d(">{"), i("project.title"), d("}</"), g("h3"), d(">")],
      [d("    </"), g("Link"), d(">")],
      [d("  )")],
      [d("}")],
    ],
  },
  {
    kind: "browser",
    title: "localhost:3000",
    lines: [[g("Tuerca")], [d("SaaS multi-tenant para talleres")], [i("Ver proyecto →")]],
  },
  {
    kind: "browser",
    title: "app.copon.ar/dashboard",
    lines: [[i("Pedidos de hoy")], [g("128")], [d("+12% vs ayer")]],
  },
  {
    kind: "app",
    title: "Expo Go — iPhone 15",
    lines: [
      [g("● "), i("Metro waiting on exp://192.168.0.12:8081")],
      [d("› Press a │ open Android")],
      [d("› Press i │ open iOS simulator")],
      [d("› Press r │ reload app")],
      [g("iOS Bundled 1412ms "), d("(index.ts)")],
      [d("LOG  splat loaded: 1.2M points")],
    ],
  },
  {
    kind: "app",
    title: "PageSpeed — mobile",
    lines: [
      [g("98 "), i("Performance")],
      [g("100 "), i("Accessibility")],
      [g("100 "), i("Best Practices")],
      [g("100 "), i("SEO")],
      [d("LCP 1.1s  ·  CLS 0  ·  INP 40ms")],
    ],
  },
]
