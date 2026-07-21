import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatPillProps {
  icon: LucideIcon
  label: string
  value: string | number
  accent?: "primary" | "success" | "accent" | "destructive"
  className?: string
}

const accentMap = {
  primary: "text-primary",
  success: "text-success",
  accent: "text-accent",
  destructive: "text-destructive",
} as const

export function StatPill({ icon: Icon, label, value, accent = "primary", className }: StatPillProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2 sm:px-4",
        className,
      )}
    >
      <Icon className={cn("size-5 shrink-0", accentMap[accent])} aria-hidden="true" />
      <div className="flex flex-col leading-none">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="font-mono text-base font-semibold tabular-nums text-foreground">{value}</span>
      </div>
    </div>
  )
}
