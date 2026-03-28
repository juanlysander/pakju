"use client"

import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"

export default function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get("q") || ""
  const [text, setText] = useState(initialQuery)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentQuery = searchParams.get("q") || ""

      if (text !== currentQuery) {
        const params = new URLSearchParams(searchParams.toString())
        if (text) {
          params.set("q", text)
        } else {
          params.delete("q")
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [text, pathname, router, searchParams])

  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Cari dari judul, isi, atau tanggal (YYYY-MM-DD)..."
        className="h-12 rounded-xl border-muted-foreground/20 bg-muted/30 pl-10 transition-colors focus-visible:bg-background"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}
