import { ImageResponse } from "next/og"
import fs from "fs"
import path from "path"

import Article from "@/lib/models"
import { dbConnect } from "@/lib/mongo-db"

export const alt = "Satu Persen Hari Ini Thumbnail"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const fontPath = path.join(
  process.cwd(),
  "app/fonts/Oxanium-VariableFont_wght.ttf"
)
const fontData = fs.readFileSync(fontPath)

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params

  await dbConnect()
  const post = await Article.findOne({
    slug: resolvedParams.slug,
    isPublished: true,
  })
    .select("title")
    .lean()

  const title = post?.title || "1% Hari Ini"

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
          color: "#000000",
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
