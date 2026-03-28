import { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pakju.com"

  const contentPath = path.join(process.cwd(), "content/satu-persen-hari-ini")

  const articleSlugs = fs
    .readdirSync(contentPath)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      url: `${baseUrl}/satu-persen-hari-ini/${file.replace(".md", "")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/satu-persen-hari-ini`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ]

  return [...staticPages, ...articleSlugs]
}
