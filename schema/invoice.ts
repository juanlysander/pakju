// schema/invoice.ts
import { z } from "zod"

export const invoiceItemSchema = z.object({
  id: z.string().min(1),
  description: z.string().min(1, "Deskripsi item wajib diisi"),
  quantity: z.number().min(1, "Kuantitas minimal 1"),
  price: z.number().min(0, "Harga tidak boleh negatif"),
  total: z.number().min(0, "Total tidak boleh negatif"), // Tambahan baru
})

export const invoiceSchema = z.object({
  id: z.string().optional(),
  senderName: z.string().min(1, "Nama Toko/Pengirim wajib diisi"),
  senderAddress: z.string().optional(),
  senderEmail: z.email("Format email tidak valid").optional().or(z.literal("")),
  senderPhone: z.string().optional(),
  bankDetails: z.string().optional(),
  logoBase64: z.string().optional(), // Maks < 1MB akan divalidasi di UI

  // Invoice Specific (Tidak perlu di-persist selamanya, tapi ada default-nya)
  invoiceNumber: z.string().min(1, "Nomor Invoice wajib diisi"),
  date: z.date(),
  dueDate: z.date().optional(),

  // Client/Receiver Info
  clientName: z.string().min(1, "Nama Klien wajib diisi"),
  clientAddress: z.string().optional(),
  clientEmail: z
    .string()
    .email("Format email tidak valid")
    .optional()
    .or(z.literal("")),

  // Items & Extras
  items: z
    .array(invoiceItemSchema)
    .min(1, "Minimal satu item harus ditambahkan"),
  notes: z.string().optional(),
  terms: z.string().optional(), // "Kalimat Sakti" akan masuk ke sini
})

// Infer type untuk digunakan di TypeScript
export type InvoiceData = z.infer<typeof invoiceSchema>
export type InvoiceItem = z.infer<typeof invoiceItemSchema>
