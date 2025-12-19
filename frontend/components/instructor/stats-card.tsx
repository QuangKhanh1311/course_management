import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
}

export function StatsCard({ icon: Icon, label, value }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
          </div>
          <Icon className="w-8 h-8 text-primary opacity-50" />
        </div>
      </CardContent>
    </Card>
  )
}
