// app/invoicing/components/templates/minimalist.tsx

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer"
import { InvoiceData } from "@/schema/invoice"

Font.register({
  family: "Oxanium",
  fonts: [
    { src: "/fonts/Oxanium-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/Oxanium-Bold.ttf", fontWeight: "bold" },
  ],
})

// Skema warna disesuaikan dengan Zinc/Slate dari Tailwind
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Oxanium", fontSize: 10, color: "#3f3f46" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#18181b",
    textTransform: "uppercase",
  },
  subtitle: { fontSize: 10, color: "#71717a", marginTop: 4 },
  section: { marginBottom: 30 },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "2pt solid #18181b",
    paddingBottom: 8,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#18181b",
  },
  row: {
    flexDirection: "row",
    borderBottom: "1pt solid #e4e4e7",
    paddingVertical: 8,
  },
  colQty: { width: "10%" },
  colDesc: { width: "50%" },
  colPrice: { width: "20%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    paddingTop: 8,
    borderTop: "1pt solid #e4e4e7",
  },
  bold: { fontWeight: "bold", color: "#18181b" },
})

export const MinimalistTemplate = ({
  data,
}: {
  data: Partial<InvoiceData>
}) => {
  // Hitung subtotal dinamis dari data
  const subtotal =
    data.items?.reduce((acc, item) => acc + (item.total || 0), 0) || 0

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER: Info Toko & Nomor Invoice */}
        <View style={styles.header}>
          <View style={{ width: "50%" }}>
            <Text style={styles.title}>{data.senderName || "NAMA TOKO"}</Text>
            <Text style={styles.subtitle}>{data.senderEmail}</Text>
            <Text style={styles.subtitle}>{data.senderAddress}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={{ fontSize: 20, color: "#a1a1aa", fontWeight: "bold" }}
            >
              INVOICE
            </Text>
            <Text style={[styles.bold, { marginTop: 4 }]}>
              {data.invoiceNumber || "INV-..."}
            </Text>
          </View>
        </View>

        {/* INFO KLIEN */}
        <View style={styles.section}>
          <Text style={{ color: "#a1a1aa", marginBottom: 4 }}>
            Tagihan Kepada:
          </Text>
          <Text style={[styles.bold, { fontSize: 12 }]}>
            {data.clientName || "Nama Klien"}
          </Text>
        </View>

        {/* TABEL ITEM */}
        <View style={styles.tableHeader}>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colDesc}>Deskripsi</Text>
          <Text style={styles.colPrice}>Harga</Text>
          <Text style={styles.colTotal}>Total</Text>
        </View>

        {data.items?.map((item, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colDesc}>{item.description || "-"}</Text>
            <Text style={styles.colPrice}>
              Rp {item.price?.toLocaleString("id-ID")}
            </Text>
            <Text style={styles.colTotal}>
              Rp {item.total?.toLocaleString("id-ID")}
            </Text>
          </View>
        ))}

        {/* TOTAL TAGIHAN */}
        <View style={styles.totalRow}>
          <Text
            style={{
              width: "20%",
              textAlign: "right",
              paddingRight: 10,
              color: "#71717a",
            }}
          >
            Total:
          </Text>
          <Text
            style={{
              width: "20%",
              textAlign: "right",
              fontWeight: "bold",
              color: "#18181b",
              fontSize: 12,
            }}
          >
            Rp {subtotal.toLocaleString("id-ID")}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
