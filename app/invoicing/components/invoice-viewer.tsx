"use client"

import { useEffect, useState, memo } from "react"
import { PDFViewer, BlobProvider } from "@react-pdf/renderer"
import { Download } from "lucide-react"
import { useDebounce } from "use-debounce"

import { useInvoiceStore } from "@/lib/store"
import { MinimalistTemplate } from "./templates/minimalist"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const MemoizedDesktopViewer = memo(({ data }: { data: any }) => {
  return (
    <PDFViewer width="100%" height="100%" className="border-none bg-white">
      <MinimalistTemplate data={data} />
    </PDFViewer>
  )
})
MemoizedDesktopViewer.displayName = "MemoizedDesktopViewer"

const MemoizedMobileViewer = memo(
  ({ data, fileName }: { data: any; fileName: string }) => {
    return (
      <BlobProvider document={<MinimalistTemplate data={data} />}>
        {({ url, loading, error }) => {
          if (loading) {
            return (
              <span className="animate-pulse text-sm text-zinc-500">
                Memproses file PDF...
              </span>
            )
          }
          if (error) {
            return (
              <span className="text-sm text-red-500">
                Gagal memuat dokumen.
              </span>
            )
          }
          return (
            <div className="flex w-full max-w-xs flex-col gap-3">
              <Button
                asChild
                variant="default"
                className="w-full bg-zinc-900 hover:bg-zinc-800"
              >
                <a href={url || "#"} target="_blank" rel="noreferrer">
                  Buka Preview PDF
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-zinc-300 text-zinc-700"
              >
                <a href={url || "#"} download={fileName}>
                  <Download className="mr-2 h-4 w-4" />
                  Download File
                </a>
              </Button>
            </div>
          )
        }}
      </BlobProvider>
    )
  }
)
MemoizedMobileViewer.displayName = "MemoizedMobileViewer"

export const InvoiceViewer = () => {
  const [isMounted, setIsMounted] = useState(false)

  const { invoices, activeId } = useInvoiceStore()
  const data = invoices.find((i) => i.id === activeId) || invoices[0] || {}

  const [debouncedData] = useDebounce(data, 700)

  useEffect(() => setIsMounted(true), [])

  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background p-4 md:p-8">
        <div className="flex w-full max-w-3xl flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Skeleton className="h-4 w-4 rounded-full" />
            <span className="text-sm font-medium">
              Menyiapkan Engine PDF...
            </span>
          </div>
          <Skeleton className="aspect-[1/1.414] w-full max-w-3xl rounded-sm shadow-sm" />
        </div>
      </div>
    )
  }

  const fileName = `Invoice_${debouncedData.clientName?.replace(/\s+/g, "_") || "Baru"}_${debouncedData.invoiceNumber || ""}.pdf`

  return (
    <div className="relative flex h-full w-full items-stretch justify-stretch bg-white">
      {/* DESKTOP VIEW */}
      <div className="hidden h-full w-full overflow-hidden bg-white md:block">
        {/* Panggil komponen yang sudah di-memoize */}
        <MemoizedDesktopViewer data={debouncedData} />
      </div>

      {/* MOBILE VIEW */}
      <div className="flex flex-1 flex-col items-center justify-center space-y-4 p-6 text-center text-zinc-900 md:hidden">
        <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100">
          <svg
            className="h-10 w-10 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Preview Dokumen</h3>
        <p className="mb-6 px-4 text-sm text-zinc-500">
          Data invoice tersimpan. Gunakan Desktop untuk melihat *live preview*
          real-time. Di mobile Anda bisa mengunduh PDF.
        </p>

        {/* Panggil komponen yang sudah di-memoize */}
        <MemoizedMobileViewer data={debouncedData} fileName={fileName} />
      </div>
    </div>
  )
}
