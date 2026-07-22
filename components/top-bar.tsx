"use client"

import { useEffect, useState } from "react"
import { BarChart3, Coins, Backpack, Store } from "lucide-react"
import { cn } from "@/lib/utils"

export type PanelType = "shop" | "inventory" | "stats"

interface TopBarProps {
  coins: number
  /** Incrementing id + amount for a transient "coins earned" burst. */
  pulse: { id: number; amount: number } | null
  onOpen: (panel: PanelType) => void
}

const buttons: { id: PanelType; label: string; icon: typeof Store }[] = [
  { id: "shop", label: "Shop", icon: Store },
  { id: "inventory", label: "Inventory", icon: Backpack },
  { id: "stats", label: "Stats", icon: BarChart3 },
]

export function TopBar({ coins, pulse, onOpen }: TopBarProps) {
  const [hovered, setHovered] = useState(false)
  const [pulsing, setPulsing] = useState(false)
  const [gain, setGain] = useState<number | null>(null)

  // When coins are earned, reveal the counter briefly then tuck it away.
  useEffect(() => {
    if (!pulse) return
    setPulsing(true)
    setGain(pulse.amount)
    const t1 = setTimeout(() => setGain(null), 1400)
    const t2 = setTimeout(() => setPulsing(false), 2000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pulse])

  const revealed = hovered || pulsing

  return (
    <header
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="sticky top-0 z-40 flex h-14 items-center justify-between px-4 liquid-glass-strong border-b"
    >
      {/* Coin counter — slides in from the left on hover or coin gain */}
      <div className="flex items-center">
        <div
          key={pulse?.id}
          className={cn(
            "flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 py-1.5 pl-2 pr-3 transition-all duration-300 ease-out",
            revealed ? "translate-x-0 opacity-100" : "-translate-x-[calc(100%+1.5rem)] opacity-0",
            pulsing && "animate-[coinPop_0.4s_ease-out]",
          )}
        >
          <Coins className="size-5 text-amber-400" aria-hidden="true" />
          <span className="font-mono text-sm font-bold tabular-nums text-amber-300">{coins.toLocaleString()}</span>
          {gain !== null && (
            <span className="ml-0.5 animate-[floatUp_1.4s_ease-out] font-mono text-xs font-bold text-amber-400">
              +{gain}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="mr-1 hidden text-sm font-bold tracking-tight text-foreground sm:inline">SAT Sprint</span>
        {buttons.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onOpen(id)}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            aria-label={label}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </header>
  )
}
