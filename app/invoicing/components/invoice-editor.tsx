// app/invoicing/components/invoice-editor.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useInvoiceStore } from "@/lib/store"
import { InvoiceData, invoiceSchema } from "@/schema/invoice"
import { Skeleton } from "@/components/ui/skeleton"

export const InvoiceEditor = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { activeId, updateData } = useInvoiceStore()

  const {
    register,
    watch,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<InvoiceData>({
    resolver: zodResolver(invoiceSchema),
  })

  const { fields, append, remove } = useFieldArray({ control, name: "items" })

  useEffect(() => {
    setIsMounted(true)
    const store = useInvoiceStore.getState()
    const currentInvoice =
      store.invoices.find((i) => i.id === store.activeId) || store.invoices[0]
    if (currentInvoice) {
      reset(currentInvoice as InvoiceData)
    }
  }, [activeId, reset])

  useEffect(() => {
    const subscription = watch((value) => {
      updateData(value as Partial<InvoiceData>)
    })
    return () => subscription.unsubscribe()
  }, [watch, updateData])

  const handleAutoCalculate = (index: number) => {
    const qty = getValues(`items.${index}.quantity`) || 0
    const price = getValues(`items.${index}.price`) || 0
    setValue(`items.${index}.total`, qty * price, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  if (!isMounted) {
    return (
      <div className="space-y-10 p-6 pb-20">
        {/* Skeleton Info Pengirim */}
        <div className="space-y-4">
          <Skeleton className="h-7 w-40" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>

        {/* Skeleton Info Klien */}
        <div className="space-y-4">
          <Skeleton className="h-7 w-40" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        {/* Skeleton Item */}
        <div className="space-y-4">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    )
  }

  return (
    <form className="pb-28" onSubmit={(e) => e.preventDefault()}>
      {/* SECTION 1: INFO PENGIRIM */}
      <section className="space-y-4 border-b p-6">
        <h3 className="text-lg font-semibold">Info Pengirim</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field data-invalid={!!errors.senderName}>
            <FieldLabel htmlFor="senderName">Nama Toko/Bisnis</FieldLabel>
            <Input
              id="senderName"
              placeholder="PT Maju Mundur"
              {...register("senderName")}
            />
            {errors.senderName && (
              <FieldError>{errors.senderName.message}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.senderEmail}>
            <FieldLabel htmlFor="senderEmail">Email Bisnis</FieldLabel>
            <Input
              id="senderEmail"
              placeholder="hello@tokoku.com"
              {...register("senderEmail")}
            />
            {errors.senderEmail && (
              <FieldError>{errors.senderEmail.message}</FieldError>
            )}
          </Field>
        </div>
        <Field data-invalid={!!errors.senderAddress}>
          <FieldLabel htmlFor="senderAddress">Alamat Lengkap</FieldLabel>
          <Textarea
            id="senderAddress"
            placeholder="Jl. Sudirman No. 1..."
            className="resize-none"
            {...register("senderAddress")}
          />
          {errors.senderAddress && (
            <FieldError>{errors.senderAddress.message}</FieldError>
          )}
        </Field>
      </section>

      {/* SECTION 2: INFO KLIEN & INVOICE (Sama seperti sebelumnya) */}
      <section className="space-y-4 border-b p-6">
        <h3 className="text-lg font-semibold">Tagihan Kepada</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field data-invalid={!!errors.clientName}>
            <FieldLabel htmlFor="clientName">Nama Klien</FieldLabel>
            <Input
              id="clientName"
              placeholder="Budi Santoso"
              {...register("clientName")}
            />
            {errors.clientName && (
              <FieldError>{errors.clientName.message}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!errors.invoiceNumber}>
            <FieldLabel htmlFor="invoiceNumber">Nomor Invoice</FieldLabel>
            <Input
              id="invoiceNumber"
              placeholder="INV-2026-001"
              {...register("invoiceNumber")}
            />
            {errors.invoiceNumber && (
              <FieldError>{errors.invoiceNumber.message}</FieldError>
            )}
          </Field>
        </div>
      </section>

      {/* SECTION 3: DYNAMIC ITEMS */}
      <section className="space-y-4 p-6">
        <h3 className="text-lg font-semibold">Item Tagihan</h3>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative flex flex-col gap-4 border-b pb-6"
            >
              {/* TOMBOL DELETE (Pojok Kanan Atas) */}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-6 right-0"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              {/* BARIS 1: DESKRIPSI (Diberi padding kanan agar tidak menabrak tombol delete) */}
              <div className="pr-10">
                <Field data-invalid={!!errors.items?.[index]?.description}>
                  <FieldLabel className="text-xs font-semibold text-zinc-600">
                    Deskripsi
                  </FieldLabel>
                  <Input
                    placeholder="Jasa Desain Logo"
                    className="border-zinc-300 bg-white"
                    {...register(`items.${index}.description`)}
                  />
                  {errors.items?.[index]?.description && (
                    <FieldError>
                      {errors.items[index]?.description?.message}
                    </FieldError>
                  )}
                </Field>
              </div>

              {/* BARIS 2: QTY, HARGA, TOTAL */}
              <div className="grid grid-cols-3 gap-3">
                <Field data-invalid={!!errors.items?.[index]?.quantity}>
                  <FieldLabel className="text-xs font-semibold text-zinc-600">
                    Qty
                  </FieldLabel>
                  <Input
                    type="number"
                    placeholder="1"
                    className="border-zinc-300 bg-white"
                    {...register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                      onChange: () => handleAutoCalculate(index),
                    })}
                  />
                </Field>

                <Field data-invalid={!!errors.items?.[index]?.price}>
                  <FieldLabel className="text-xs font-semibold text-zinc-600">
                    Harga
                  </FieldLabel>
                  <Input
                    type="number"
                    placeholder="500000"
                    className="border-zinc-300 bg-white"
                    {...register(`items.${index}.price`, {
                      valueAsNumber: true,
                      onChange: () => handleAutoCalculate(index),
                    })}
                  />
                </Field>

                <Field data-invalid={!!errors.items?.[index]?.total}>
                  <FieldLabel className="text-xs font-semibold text-zinc-600">
                    Total
                  </FieldLabel>
                  <Input
                    type="number"
                    placeholder="500000"
                    className="border-zinc-300 bg-white font-medium text-zinc-900"
                    {...register(`items.${index}.total`, {
                      valueAsNumber: true,
                    })}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Tambah Item */}
        <Button
          type="button"
          variant="outline"
          className="mt-2 w-full border-dashed border-zinc-300 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
          onClick={() =>
            append({
              id: Date.now().toString(),
              description: "",
              quantity: 1,
              price: 0,
              total: 0,
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Baris Baru
        </Button>
      </section>
    </form>
  )
}
