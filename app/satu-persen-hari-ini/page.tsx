import { format } from "date-fns"
import { id } from "date-fns/locale"
import { ArrowUpRight, LogOutIcon } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import pakju from "@/assets/pakju.jpg"
import SocialLinks from "@/components/shared/social-links"
import { Card } from "@/components/ui/card"
import { getAllPosts } from "@/lib/markdown"
import SearchBar from "./components/search-bar"

export const metadata: Metadata = {
  title: "1% Hari Ini | Rangkuman Bisnis Pakju",
  description:
    "Rangkuman bacaan bisnis 15 menit sehari untuk bantu usahamu tumbuh satu persen setiap harinya.",
  openGraph: {
    title: "1% Hari Ini | Rangkuman Bisnis Pakju",
    description:
      "Rangkuman bacaan bisnis 15 menit sehari untuk bantu usahamu tumbuh satu persen setiap harinya.",
    url: "https://pakju.com/satu-persen-hari-ini",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1% Hari Ini | Rangkuman Bisnis Pakju",
    description:
      "Rangkuman bacaan bisnis 15 menit sehari untuk bantu usahamu tumbuh satu persen setiap harinya.",
  },
}

export default async function SatuPersenHariIniPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const searcParamsRes = await searchParams
  const query = searcParamsRes?.q?.toLowerCase() || ""
  const allPosts = getAllPosts()

  // Filter artikel berdasarkan judul, deskripsi, isi konten, atau tanggal
  const filteredPosts = allPosts.filter((post) => {
    if (!query) return true
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.date.includes(query)
    )
  })

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-24">
        <div className="relative flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* KOLOM KIRI (Sama seperti Homepage) */}
          <section className="flex h-fit flex-col gap-8 lg:sticky lg:top-24 lg:w-1/3">
            <div className="flex flex-col gap-6">
              <Link
                href={"/"}
                className="flex w-max items-center justify-center gap-2"
              >
                <LogOutIcon className="w-3.5!" />
                Kembali
              </Link>

              <Image
                src={pakju}
                alt="Pakju"
                loading="eager"
                placeholder="blur"
                className="h-28 w-28 rounded-full border bg-muted lg:h-32 lg:w-32"
              />
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                  1% Hari Ini
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Rangkuman bacaan bisnis 15 menit sehari untuk bantu usahamu
                  tumbuh.
                </p>
              </div>
            </div>
            <SocialLinks />
          </section>

          {/* KOLOM KANAN */}
          <section className="flex flex-col gap-8 lg:w-2/3">
            {/* Search Bar yang Sticky */}
            <div className="sticky top-4 z-10 bg-background/80 backdrop-blur-md lg:top-24">
              <SearchBar />
            </div>

            {/* List Artikel */}
            <div className="flex flex-col gap-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/satu-persen-hari-ini/${post.slug}`}
                  >
                    <Card className="group flex flex-col gap-3 rounded-2xl border-muted/50 p-6 transition-all duration-300 hover:border-border hover:shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-medium transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground opacity-50 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                      </div>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {post.description}
                      </p>
                      <time className="pt-2 text-xs font-medium tracking-wider text-muted-foreground/70 uppercase">
                        {format(new Date(post.date), "d MMMM yyyy", {
                          locale: id,
                        })}
                      </time>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-muted-foreground/20 py-12 text-center">
                  <p className="text-muted-foreground">
                    Tidak ada artikel yang cocok dengan pencarianmu.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
