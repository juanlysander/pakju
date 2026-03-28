import { format } from "date-fns"
import { id } from "date-fns/locale"
import { ArrowRight } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

import { Button } from "@/components/ui/button"
import { getAllPosts, getPostBySlug } from "@/lib/markdown"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const paramsRes = await params
  const post = getPostBySlug(paramsRes.slug)

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan | Pakju",
      description: "Halaman yang kamu cari tidak tersedia.",
    }
  }

  return {
    title: `${post.title} | 1% Hari Ini`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `https://pakju.com/satu-persen-hari-ini/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const paramsRes = await params
  const post = getPostBySlug(paramsRes.slug)
  if (!post) notFound()

  // Ambil 10 artikel terbaru untuk sidebar, kecualikan artikel yang sedang dibaca
  const allPosts = getAllPosts()
  const recentPosts = allPosts
    .filter((p) => p.slug !== paramsRes.slug)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="relative flex flex-col gap-16 lg:flex-row lg:gap-24">
          {/* KOLOM KIRI: Konten Artikel Utama */}
          <article className="lg:w-2/3">
            <header className="mb-10 space-y-4">
              <time className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                {format(new Date(post.date), "d MMMM yyyy", {
                  locale: id,
                })}
              </time>
              <h1 className="text-3xl leading-snug font-bold tracking-tight text-foreground lg:text-4xl">
                {post.title}
              </h1>
            </header>

            {/* Area render Markdown. Menggunakan class 'prose' dari Tailwind Typography */}
            <div className="prose max-w-none prose-neutral dark:prose-invert prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </article>

          {/* KOLOM KANAN: Minimalist Sidebar Navigation */}
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
                      {new Date(recentPost.date).toLocaleDateString("id-ID", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="pt-4">
                <Button
                  variant="ghost"
                  className="group w-full justify-between text-muted-foreground hover:text-foreground"
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
