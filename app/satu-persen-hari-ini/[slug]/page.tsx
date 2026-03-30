import { format } from "date-fns"
import { id } from "date-fns/locale"
import { ArrowRight, LogOutIcon } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

import { Button } from "@/components/ui/button"
import { dbConnect } from "@/lib/mongo-db"
import Article, { IArticle } from "@/lib/models"

export const revalidate = 1200
export const dynamicParams = true

export async function generateStaticParams() {
  await dbConnect()

  const recentArticles = await Article.find({ isPublished: true })
    .select("slug")
    .sort({ createdAt: -1 })
    .limit(20)
    .lean()

  return recentArticles.map((article: any) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const paramsRes = await params

  await dbConnect()
  const post = (await Article.findOne({
    slug: paramsRes.slug,
    isPublished: true,
  }).lean()) as IArticle | null

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan | Pakju",
      description: "Halaman yang kamu cari tidak tersedia.",
    }
  }

  return {
    title: `${post.title} | 1% Hari Ini`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post?.createdAt?.toISOString(),
      url: `https://pakju.com/satu-persen-hari-ini/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const paramsRes = await params

  await dbConnect()

  const post = (await Article.findOne({
    slug: paramsRes.slug,
    isPublished: true,
  }).lean()) as IArticle | null

  if (!post) notFound()

  const recentPosts = (await Article.find({
    slug: { $ne: paramsRes.slug },
    isPublished: true,
  })
    .select("title slug createdAt")
    .sort({ createdAt: -1 })
    .limit(4)
    .lean()) as Pick<IArticle, "title" | "slug" | "createdAt">[]

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-10">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="-ml-3 gap-2 text-muted-foreground hover:text-foreground"
          >
            <Link href="/satu-persen-hari-ini">
              <LogOutIcon className="w-3.5!" />
              Kembali ke Daftar
            </Link>
          </Button>
        </div>

        <div className="relative flex flex-col gap-16 lg:flex-row lg:gap-24">
          {/* KOLOM KIRI: Konten Artikel Utama */}
          <article className="lg:w-2/3">
            <header className="mb-10 space-y-4">
              <time className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                {/* Update post.date -> post.createdAt */}
                {format(new Date(post.createdAt!), "d MMMM yyyy", {
                  locale: id,
                })}
              </time>
              <h1 className="text-3xl leading-snug font-bold tracking-tight text-foreground lg:text-4xl">
                {post.title}
              </h1>
            </header>

            {/* Area render Markdown tetap sama */}
            <div className="prose max-w-none prose-neutral dark:prose-invert prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </article>

          {/* KOLOM KANAN: Sidebar */}
          <aside className="flex h-fit flex-col gap-8 lg:sticky lg:top-24 lg:w-1/3">
            <div className="space-y-6">
              <h3 className="pb-4 text-sm font-semibold text-muted-foreground uppercase">
                Artikel Lainnya
              </h3>

              <nav className="flex flex-col gap-4">
                {recentPosts.map((recentPost) => (
                  <Link
                    key={recentPost.slug}
                    href={`/satu-persen-hari-ini/${recentPost.slug}`}
                    className="group flex flex-col gap-1"
                  >
                    <h4 className="line-clamp-2 text-base font-medium text-foreground transition-colors group-hover:text-primary">
                      {recentPost.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {/* Update recentPost.date -> recentPost.createdAt */}
                      {new Date(recentPost.createdAt!).toLocaleDateString(
                        "id-ID",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="pt-4">
                <Button
                  variant="outline"
                  className="group w-full justify-between rounded-xl text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link href="/satu-persen-hari-ini">
                    Lihat semua artikel
                    <ArrowRight className="h-4 w-4 opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
