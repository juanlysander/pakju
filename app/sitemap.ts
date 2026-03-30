import { MetadataRoute } from "next"

import { dbConnect } from "@/lib/mongo-db"
import Article from "@/lib/models"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pakju.com"

  await dbConnect()

  const articles = await Article.find({ isPublished: true })
    .select("slug updatedAt")
    .lean()

  const articlePages: MetadataRoute.Sitemap = articles.map((article: any) => ({
    url: `${baseUrl}/satu-persen-hari-ini/${article.slug}`,

    lastModified: article.updatedAt || new Date(),
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

  return [...staticPages, ...articlePages]
}
