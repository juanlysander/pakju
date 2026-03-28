import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const BrandCards = ({ discontinued }: { discontinued?: boolean }) => {
  if (discontinued)
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <a
                className="group mb-1 flex items-center gap-2 text-base font-medium underline transition-colors group-hover:text-primary"
                href={"https://rocketalpha.vercel.app/stock-analysis/ICBP"}
              >
                Rocket Alpha
                <ArrowUpRight className="size-4 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>
              <Badge variant="secondary">Pending</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Platform Workflow Analisa Fundamental Saham yang terstruktur untuk
              memudahkan user membaca laporan keuangan dan metriks-metriksnya
            </p>
          </div>
        </Card>
      </div>
    )

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <a
              className="group mb-1 flex items-center gap-2 text-base font-medium underline transition-colors group-hover:text-primary"
              href={"https://dearmylove.co"}
            >
              Dear My Love
              <ArrowUpRight className="size-4 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </a>
            <Badge variant="default">Live</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Platform manajemen tamu dan undangan digital untuk pernikahan
          </p>
        </div>
      </Card>
      <Card className="p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3
              className="group mb-1 flex items-center gap-2 text-base font-medium transition-colors group-hover:text-primary"
              // href={"https://entraloka.com"}
            >
              Entraloka
              {/* <ArrowUpRight className="size-4 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" /> */}
            </h3>
            <Badge variant="secondary">Soon</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Platform manajemen event all in one, mulai dari event planning,
            landing page, check-in, reporting, sampai generate sertifikat
          </p>
        </div>
      </Card>
    </div>
  )
}

export default BrandCards
