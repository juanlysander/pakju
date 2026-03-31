// app/invoicing/components/invoice-sidebar.tsx
"use client"

import { FileText, LogOutIcon, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react" // 1. Tambahkan import ini

import { Button } from "@/components/ui/button"
import { useInvoiceStore } from "@/lib/store"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export const InvoiceSidebar = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { invoices, activeId, setActiveId, addInvoice, deleteInvoice } =
    useInvoiceStore()

  useEffect(() => setIsMounted(true), [])

  if (!isMounted) {
    return (
      <div className="flex h-full flex-col border-r bg-background">
        <div className="flex flex-col gap-2 border-b p-3">
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-10" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex-1 space-y-2 p-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col border-r">
      <div className="flex flex-col gap-2 border-b p-3">
        <div className="flex gap-2">
          <Button asChild variant={"outline"} className="flex-1">
            <Link href={"/"}>
              <LogOutIcon className="mr-2" />
              pakju.com
            </Link>
          </Button>
          <ThemeToggle className="size-8!" />
        </div>

        <Button onClick={addInvoice}>
          <Plus className="mr-2 h-4 w-4" /> Invoice Baru
        </Button>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto p-3">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            onClick={() => setActiveId(inv.id as string)}
            className={cn(
              activeId === inv.id ? "bg-secondary" : "bg-transparent",
              "group flex cursor-pointer items-center justify-between rounded-md px-2 py-1 transition-colors hover:bg-secondary"
            )}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="truncate text-sm">
                <p className="truncate font-medium">
                  {inv.clientName || "Klien Baru"}
                </p>
                <p className="truncate text-xs text-zinc-400">
                  {inv.invoiceNumber}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400"
              onClick={(e) => {
                e.stopPropagation()
                deleteInvoice(inv.id as string)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
