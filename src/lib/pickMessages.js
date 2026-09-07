// Namespaces the client actually renders. Server components keep using
// getTranslations, so the full message file never ships in the HTML.
export const CLIENT_NAMESPACES = ["Menu", "Locales", "Shortcuts", "Error"]

export function pickMessages(messages, keys = CLIENT_NAMESPACES) {
  const out = {}
  for (const key of keys) {
    if (messages[key] !== undefined) out[key] = messages[key]
  }
  return out
}
