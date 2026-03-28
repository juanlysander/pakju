import { NotebookPen } from "lucide-react"
import Image from "next/image"

import pakju from "@/assets/pakju.jpg"
import AppCard from "./components/app-card"
import BrandCards from "./components/brand-card"
import SocialLinks from "@/components/shared/social-links"

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-24">
        <div className="relative flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* KOLOM KIRI */}
          <section className="flex h-fit flex-col gap-8 lg:sticky lg:top-24 lg:w-1/3">
            <div className="flex flex-col gap-6">
              <Image
                src={pakju}
                alt="Pakju"
                loading="eager"
                placeholder="blur"
                className="h-28 w-28 rounded-full border bg-muted lg:h-32 lg:w-32"
              />
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                  Pakju
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  1% lebih baik tiap hari. Untuk kamu dan bisnismu.
                </p>
              </div>
            </div>
            <SocialLinks />
          </section>

          {/* KOLOM KANAN */}
          <section className="flex flex-col gap-16 lg:w-2/3 lg:pt-2">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-semibold tracking-tight">
                The Founders
              </h2>

              <BrandCards />
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-semibold tracking-tight">
                1% Better Vault
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <AppCard
                  title="1% Hari Ini"
                  description="Rangkuman bacaan bisnis 15 menit sehari untuk bantu kamu dan usahamu tumbuh satu persen setiap harinya."
                  status="live"
                  href="/satu-persen-hari-ini"
                  icon={NotebookPen}
                  iconDivClassName="bg-secondary"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
