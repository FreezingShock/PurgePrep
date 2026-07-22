"use client"

import { useState, useEffect } from "react"
import { BarChart3, Backpack, CheckCircle2, Coins, Lock, Store, Swords, Sword, Coins as CoinIcon, Shield, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  UPGRADES,
  upgradeCost,
  killsPerCorrect,
  coinsPerKill,
  heroMaxHp,
  type LifetimeStats,
  type UpgradeId,
  type Upgrades,
} from "@/lib/game"
import type { PanelType } from "@/components/top-bar"

interface GameModalProps {
  type: PanelType
  coins: number
  upgrades: Upgrades
  stats: LifetimeStats
  onBuy: (id: UpgradeId) => void
  onClose: () => void
}

const titles: Record<PanelType, { label: string; icon: LucideIcon }> = {
  shop: { label: "Shop", icon: Store },
  inventory: { label: "Inventory", icon: Backpack },
  stats: { label: "Career Stats", icon: BarChart3 },
}

export function GameModal({ type, coins, upgrades, stats, onBuy, onClose }: GameModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const { label, icon: TitleIcon } = titles[type]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <TitleIcon className="size-5 text-primary" aria-hidden="true" />
            <h2 className="text-lg font-bold">{label}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1">
              <Coins className="size-4 text-amber-400" aria-hidden="true" />
              <span className="font-mono text-sm font-bold text-amber-300">{coins.toLocaleString()}</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-4">
          {type === "shop" && <ShopContent coins={coins} upgrades={upgrades} onBuy={onBuy} />}
          {type === "inventory" && <InventoryContent upgrades={upgrades} />}
          {type === "stats" && <StatsContent stats={stats} />}
        </div>
      </div>
    </div>
  )
}

function ShopContent({
  coins,
  upgrades,
  onBuy,
}: {
  coins: number
  upgrades: Upgrades
  onBuy: (id: UpgradeId) => void
}) {
  const [hoverId, setHoverId] = useState<UpgradeId | null>(null)

  const categories = [
    { key: "damage", label: "⚔️ Damage", color: "from-red-900/20 to-red-950/10" },
    { key: "defense", label: "🛡️ Defense", color: "from-blue-900/20 to-blue-950/10" },
    { key: "economy", label: "💰 Economy", color: "from-yellow-900/20 to-yellow-950/10" },
    { key: "utility", label: "📚 Utility", color: "from-purple-900/20 to-purple-950/10" },
  ] as const

  return (
    <div className="flex flex-col gap-5">
      {categories.map((cat) => {
        const items = UPGRADES.filter((u) => u.category === cat.key)
        return (
          <div key={cat.key} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-1">
              <h3 className="text-sm font-bold text-foreground">{cat.label}</h3>
              <div className="h-px flex-1 bg-border/40" />
            </div>
            <div className="grid gap-2">
              {items.map((def) => {
                const level = upgrades[def.id]
                const cost = upgradeCost(def, level)
                const maxed = cost === null
                const affordable = !maxed && coins >= cost
                return (
                  <div
                    key={def.id}
                    className="relative group"
                    onMouseEnter={() => setHoverId(def.id)}
                    onMouseLeave={() => setHoverId(null)}
                  >
                    <div className={cn(
                      "flex items-start gap-3 rounded-lg border border-border bg-gradient-to-br p-3",
                      "transition-all duration-200",
                      hoverId === def.id ? "border-primary/50 shadow-lg shadow-primary/20" : "bg-background/40",
                      maxed && "opacity-75"
                    )}>
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border-2 border-border bg-secondary/40 text-2xl">
                        {def.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">{def.name}</span>
                          <span className="rounded-sm bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                            Lv {level}/{def.maxLevel}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-snug mt-0.5">{def.tagline}</p>
                        <p className="mt-1 text-xs font-semibold text-accent">{def.effect(level)}</p>
                      </div>
                      <Button
                        size="sm"
                        disabled={maxed || !affordable}
                        onClick={() => onBuy(def.id)}
                        className={cn("shrink-0 h-9", maxed && "opacity-50")}
                        variant={affordable ? "default" : "secondary"}
                      >
                        {maxed ? (
                          "✓"
                        ) : (
                          <span className="flex items-center gap-1 text-xs">
                            <span>⬥</span>
                            {cost}
                          </span>
                        )}
                      </Button>
                    </div>
                    {hoverId === def.id && (
                      <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-border bg-secondary/95 p-2 text-xs leading-snug text-foreground backdrop-blur-sm pointer-events-none">
                        {def.description}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      <div className="mt-2 rounded-lg border border-border bg-background/40 p-3 text-center text-xs leading-relaxed text-muted-foreground">
        💡 Answer correctly to defeat enemies and earn coins. Spend coins here to unlock powerful minecraft-style gear and dominate the arena!
      </div>
    </div>
  )
}

function InventoryContent({ upgrades }: { upgrades: Upgrades }) {
  const owned = UPGRADES.filter((d) => upgrades[d.id] > 0)

  if (owned.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <div className="text-4xl">📦</div>
        <p className="text-sm font-medium text-foreground">No gear yet</p>
        <p className="text-xs text-muted-foreground">
          Visit the Shop to spend your coins on epic minecraft-style gear!
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2">
        {owned.map((def) => {
          const level = upgrades[def.id]
          return (
            <div key={def.id} className="flex items-start gap-3 rounded-lg border border-green-700/30 bg-gradient-to-br from-green-950/20 to-green-900/10 p-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-green-700/50 bg-green-950/30 text-xl">
                {def.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{def.name}</span>
                  <span className="rounded-sm bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Lv {level}/{def.maxLevel}
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-accent">
                  <span>✓</span>
                  {def.effect(level)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="rounded-lg border border-border bg-background/40 p-3 grid grid-cols-3 gap-2 text-center">
        <LoadoutStat emoji="⚔️" label="Hits" value={killsPerCorrect(upgrades.blade)} />
        <LoadoutStat emoji="⬥" label="Gold/Kill" value={coinsPerKill(upgrades.coin)} />
        <LoadoutStat emoji="❤️" label="Max HP" value={heroMaxHp(upgrades.armor)} />
      </div>
    </div>
  )
}

function LoadoutStat({ emoji, label, value }: { emoji: string; label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-lg">{emoji}</span>
      <span className="font-mono text-xl font-bold tabular-nums">{value}</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  )
}

function StatsContent({ stats }: { stats: LifetimeStats }) {
  const accuracy = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0
  const items: { icon: LucideIcon; label: string; value: string | number }[] = [
    { icon: Swords, label: "Enemies Defeated", value: stats.enemiesDefeated },
    { icon: Coins, label: "Coins Earned", value: stats.coinsEarned.toLocaleString() },
    { icon: CheckCircle2, label: "Accuracy", value: `${accuracy}%` },
    { icon: BarChart3, label: "Games Played", value: stats.gamesPlayed },
    { icon: Sword, label: "Best Streak", value: stats.bestStreak },
    { icon: CheckCircle2, label: "Correct Answers", value: stats.correct },
  ]
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex flex-col gap-1.5 rounded-xl border border-border bg-background/40 p-3">
          <Icon className="size-5 text-primary" aria-hidden="true" />
          <span className="font-mono text-2xl font-bold tabular-nums">{value}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}
