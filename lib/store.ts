// lib/store.ts

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { InvoiceData } from "../schema/invoice"

interface InvoiceState {
  invoices: InvoiceData[]
  activeId: string | null | undefined
  addInvoice: () => void
  updateData: (newData: Partial<InvoiceData>) => void
  deleteInvoice: (id: string) => void
  setActiveId: (id: string) => void
}

const createNewInvoice = (baseProfile?: Partial<InvoiceData>): InvoiceData =>
  ({
    id: Date.now().toString(),
    senderName: baseProfile?.senderName || "",
    senderAddress: baseProfile?.senderAddress || "",
    senderEmail: baseProfile?.senderEmail || "",
    senderPhone: baseProfile?.senderPhone || "",
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
    date: new Date(),
    clientName: "",
    items: [
      {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ],
  }) as InvoiceData

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set, get) => ({
      invoices: [createNewInvoice()],
      activeId: null,
      addInvoice: () => {
        const { invoices, activeId } = get()
        const current = invoices.find((i) => i.id === activeId) || invoices[0]
        const newInvoice = createNewInvoice(current)
        set({
          invoices: [newInvoice, ...invoices],
          activeId: newInvoice.id,
        })
      },
      updateData: (newData) => {
        set((state) => ({
          invoices: state.invoices.map((inv) =>
            inv.id === state.activeId ? { ...inv, ...newData } : inv
          ),
        }))
      },
      deleteInvoice: (id) => {
        set((state) => {
          const filtered = state.invoices.filter((inv) => inv.id !== id)
          if (filtered.length === 0) {
            const fresh = createNewInvoice()
            return { invoices: [fresh], activeId: fresh.id }
          }
          return {
            invoices: filtered,
            activeId: state.activeId === id ? filtered[0].id : state.activeId,
          }
        })
      },
      setActiveId: (id) => set({ activeId: id }),
    }),
    {
      name: "pakju-invoice-storage",
      onRehydrateStorage: () => (state) => {
        // Otomatis aktifkan invoice pertama saat web baru di-load
        if (state && !state.activeId && state.invoices.length > 0) {
          state.activeId = state.invoices[0].id
        }
      },
    }
  )
)
