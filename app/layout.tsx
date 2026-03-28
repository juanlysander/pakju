import { Metadata } from "next"
import localFont from "next/font/local"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"

const oxanium = localFont({
  src: "./fonts/Oxanium-VariableFont_wght.ttf",
  variable: "--font-sans",
  weight: "100 700",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://pakju.com"),
  title: {
    default: "Pakju | Mendorong Bisnismu Maju 1% Setiap Hari",
    template: "%s | Pakju",
  },
  description:
    "Hub digital Pakju berisi tools gratis, aplikasi pendukung untuk bisnis kamu, dan rangkuman bacaan bisnis harian untuk para pengusaha pemula.",
  keywords: [
    "Pakju",
    "UMKM",
    "SaaS gratis",
    "bisnis pemula",
    "tech creator",
    "tools bisnis",
    "1% lebih baik",
    "1% Hari Ini",
  ],
  authors: [{ name: "Pakju", url: "https://pakju.com" }],
  creator: "Pakju",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://pakju.com",
    title: "Pakju | Mendorong Bisnismu Maju 1% Setiap Hari",
    description:
      "Hub digital Pakju berisi tools gratis, aplikasi pendukung UMKM, dan rangkuman bacaan bisnis harian untuk para pengusaha pemula.",
    siteName: "Pakju Hub",
    images: [
      {
        url: "/og-images/og.jpg",
        width: 1200,
        height: 1200,
        alt: "Pakju Hub Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakju | Mendorong Bisnismu Maju 1% Setiap Hari",
    description:
      "Hub digital Pakju berisi tools gratis, aplikasi pendukung UMKM, dan rangkuman bacaan bisnis harian untuk para pengusaha pemula.",
    images: ["/og-images/og.jpg"],
    creator: "@pakju",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans antialiased", oxanium.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
