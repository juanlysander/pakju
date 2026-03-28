import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/markdown'
import fs from 'fs'
import path from 'path'

export const alt = "Satu Persen Hari Ini Thumbnail"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const fontOxanium = fetch(
  new URL("../../fonts/Oxanium-VariableFont_wght.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug)
  const fontPath = path.join(process.cwd(), 'app/fonts/Oxanium-VariableFont_wght.ttf')
  const fontData = fs.readFileSync(fontPath)

  const title = post?.title || '1% Hari Ini'

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        padding: "80px",
        fontFamily: "Oxanium",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "24px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#000000", // Hitam Pekat
          marginBottom: "40px",
        }}
      >
        pakju.com
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "84px",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "#111111",
          letterSpacing: "-0.02em",
          width: "100%",
          wordBreak: "break-word",
        }}
      >
        {title}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Oxanium",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  )
}
