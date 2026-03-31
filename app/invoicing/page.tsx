// app/invoicing/page.tsx
import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { InvoiceEditor } from "./components/invoice-editor"
import { InvoiceViewer } from "./components/invoice-viewer"
import { InvoiceSidebar } from "./components/invoice-sidebar"

export default function InvoicingWorkspace() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* MOBILE HEADER & BURGER MENU (Tampil Hanya di HP) */}
      <div className="z-20 flex items-center border-b border-zinc-200 bg-white p-4 shadow-sm md:hidden">
        <Sheet>
          <SheetHeader className="sr-only">
            <SheetTitle>Burger Menu</SheetTitle>
            <SheetDescription>Burger Menu</SheetDescription>
          </SheetHeader>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[80%] max-w-[300px] border-none p-0"
          >
            <InvoiceSidebar />
          </SheetContent>
        </Sheet>
        <h1 className="font-oxanium ml-4 text-lg font-bold">
          Pakju Pro Invoicing
        </h1>
      </div>

      {/* SECTION 1: SIDEBAR (19% Desktop Only) */}
      <aside className="hidden h-screen w-[19%] md:block">
        <InvoiceSidebar />
      </aside>

      {/* SECTION 2: EDITOR (28%) */}
      <section className="z-10 h-[calc(100vh-73px)] w-full overflow-y-auto border-r md:h-screen md:w-[28%]">
        <InvoiceEditor />
      </section>

      {/* SECTION 3: VIEWER (53%) */}
      <main className="relative flex h-[calc(100vh-73px)] w-full flex-col items-stretch bg-white p-0 md:h-screen md:w-[53%]">
        <div className="flex w-full flex-1 items-stretch justify-stretch overflow-hidden">
          <div className="flex h-full w-full items-stretch justify-stretch overflow-hidden">
            <InvoiceViewer />
          </div>
        </div>
      </main>
    </div>
  )
}
