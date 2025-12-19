import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface AdminStatsProps {
  icon: LucideIcon
  label: string
  value: string | number
  color?: string
}

export function AdminStats({ icon: Icon, label, value, color = "text-primary" }: AdminStatsProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
          </div>
          <Icon className={`w-8 h-8 ${color} opacity-50`} />
        </div>
      </CardContent>
    </Card>
  )
}
