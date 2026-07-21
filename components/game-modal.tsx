"use client"

import { useEffect } from "react"
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

const upgradeIcons: Record<UpgradeId, LucideIcon> = {
  blade: Sword,
  coin: CoinIcon,
  armor: Shield,
}

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
  return (
    <div className="flex flex-col gap-3">
      {UPGRADES.map((def) => {
        const level = upgrades[def.id]
        const cost = upgradeCost(def, level)
        const maxed = cost === null
        const affordable = !maxed && coins >= cost
        const Icon = upgradeIcons[def.id]
        return (
          <div key={def.id} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-semibold">{def.name}</span>
                <span className="shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  Lv {level}/{def.maxLevel}
                </span>
              </div>
              <p className="truncate text-xs text-muted-foreground">{def.description}</p>
              <p className="mt-0.5 text-xs font-medium text-accent">{def.effect(level)}</p>
            </div>
            <Button
              size="sm"
              disabled={maxed || !affordable}
              onClick={() => onBuy(def.id)}
              className={cn("shrink-0", maxed && "opacity-60")}
              variant={affordable ? "default" : "secondary"}
            >
              {maxed ? (
                "Maxed"
              ) : (
                <span className="flex items-center gap-1">
                  <Coins className="size-3.5" aria-hidden="true" />
                  {cost}
                </span>
              )}
            </Button>
          </div>
        )
      })}
      <p className="mt-1 text-center text-xs leading-relaxed text-muted-foreground">
        Defeat enemies with correct answers to earn coins, then spend them here to grow stronger.
      </p>
    </div>
  )
}

function InventoryContent({ upgrades }: { upgrades: Upgrades }) {
  const owned = UPGRADES.filter((d) => upgrades[d.id] > 0)

  if (owned.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <Lock className="size-8 text-muted-foreground" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          No upgrades yet. Visit the Shop to spend your coins on powerful gear.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {owned.map((def) => {
        const level = upgrades[def.id]
        const Icon = upgradeIcons[def.id]
        return (
          <div key={def.id} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-success/15 text-success ring-1 ring-success/25">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{def.name}</span>
                <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  Lv {level}/{def.maxLevel}
                </span>
              </div>
              <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-accent">
                <CheckCircle2 className="size-3.5 text-success" aria-hidden="true" />
                {def.effect(level)}
              </p>
            </div>
          </div>
        )
      })}
      <div className="mt-1 grid grid-cols-3 gap-2 rounded-xl border border-border bg-background/40 p-3 text-center">
        <LoadoutStat icon={Sword} label="Kills / hit" value={killsPerCorrect(upgrades.blade)} />
        <LoadoutStat icon={CoinIcon} label="Coins / kill" value={coinsPerKill(upgrades.coin)} />
        <LoadoutStat icon={Shield} label="Max HP" value={heroMaxHp(upgrades.armor)} />
      </div>
    </div>
  )
}

function LoadoutStat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon className="size-4 text-primary" aria-hidden="true" />
      <span className="font-mono text-lg font-bold tabular-nums">{value}</span>
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
