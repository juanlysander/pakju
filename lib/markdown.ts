import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/satu-persen-hari-ini")

export type BlogPost = {
  slug: string
  title: string
  date: string
  description: string
  content: string
}

// Mengambil semua post dan mengurutkan dari yang terbaru
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        content,
      }
    })

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Mengambil 1 post spesifik berdasarkan slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      content,
    }
  } catch (error) {
    return null
  }
}
