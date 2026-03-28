import { ArrowUpRight, LucideProps } from "lucide-react"
import Link from "next/link"
import { ForwardRefExoticComponent, RefAttributes } from "react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const AppCard = ({
  title,
  description,
  status,
  href,
  icon: Icon,
  iconDivClassName,
}: {
  title: string
  description: string
  status: "live" | "pending" | "none"
  href: string
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
  iconDivClassName?: string
}) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              iconDivClassName,
              "flex h-10 w-10 items-center justify-center rounded-sm"
            )}
          >
            {Icon ? (
              <Icon className="size-4.5! text-muted-foreground" />
            ) : (
              <div className="size-4.5! rounded-sm bg-primary" />
            )}
          </div>
          {status === "live" ? (
            <Badge variant="default">Live</Badge>
          ) : status === "pending" ? (
            <Badge variant="secondary" className="bg-muted">
              Coming Soon
            </Badge>
          ) : null}
        </div>
        <div>
          <Link
            className="group mb-1 flex items-center gap-2 text-base font-medium underline transition-colors group-hover:text-primary"
            href={href}
          >
            {title}
            <ArrowUpRight className="size-4 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </Link>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  )
}

export default AppCard
