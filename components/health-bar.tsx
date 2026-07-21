import { cn } from "@/lib/utils"

interface HealthBarProps {
  name: string
  hp: number
  maxHp: number
  side: "hero" | "enemy"
}

export function HealthBar({ name, hp, maxHp, side }: HealthBarProps) {
  const pct = Math.max(0, (hp / maxHp) * 100)
  const low = pct <= 30

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs font-semibold">
        <span className={cn(side === "hero" ? "text-primary" : "text-destructive")}>{name}</span>
        <span className="font-mono text-muted-foreground">
          {Math.max(0, Math.round(hp))}/{maxHp}
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full border border-border bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500 ease-out",
            side === "hero" ? "bg-primary" : "bg-destructive",
            low && "animate-pulse",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
