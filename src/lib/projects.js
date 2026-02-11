import fs from "fs"
import path from "path"
import matter from "gray-matter"

const projectsDirectory = path.join(process.cwd(), "content/projects")

export function getAllProjects() {
  // Check if directory exists (for build time)
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  const allProjects = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Extract metadata from the MDX export
      const metadataMatch = fileContents.match(
        /export const metadata = ({[\s\S]*?})/
      )
      let metadata = {}

      if (metadataMatch) {
        try {
          // Parse the metadata object (simple approach)
          const metadataStr = metadataMatch[1]
            .replace(/\n/g, " ")
            .replace(/\s+/g, " ")
          // Use a safer eval approach with a function
          metadata = new Function(`return ${metadataStr}`)()
        } catch (e) {
          console.error(`Error parsing metadata for ${slug}:`, e)
        }
      }

      return {
        slug,
        ...metadata
      }
    })

  // Sort by year descending
  return allProjects.sort((a, b) => {
    const yearA = parseInt(a.year) || 0
    const yearB = parseInt(b.year) || 0
    return yearB - yearA
  })
}

export function getProjectBySlug(slug) {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Extract metadata
  const metadataMatch = fileContents.match(/export const metadata = ({[\s\S]*?})/)
  let metadata = {}

  if (metadataMatch) {
    try {
      const metadataStr = metadataMatch[1]
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ")
      metadata = new Function(`return ${metadataStr}`)()
    } catch (e) {
      console.error(`Error parsing metadata for ${slug}:`, e)
    }
  }

  // Extract content (everything after the metadata export)
  const contentMatch = fileContents.match(/export const metadata = {[\s\S]*?}\s*\n\n([\s\S]*)/)
  const content = contentMatch ? contentMatch[1] : ""

  return {
    slug,
    content,
    ...metadata
  }
}

export function getAllProjectSlugs() {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => ({
      slug: fileName.replace(/\.mdx$/, "")
    }))
}
