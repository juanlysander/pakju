import mongoose, { Schema, Document, models } from "mongoose"

export interface IArticle extends Document {
  title: string
  slug: string
  content: string
  excerpt?: string
  tags?: string[]
  isPublished: boolean
  createdAt?: Date
  updatedAt?: Date
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    tags: { type: [String] },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Article =
  models.Article || mongoose.model<IArticle>("Article", ArticleSchema)

export default Article
