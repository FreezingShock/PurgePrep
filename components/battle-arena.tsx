"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { ChevronDown, Coins, Skull, Swords, Trophy } from "lucide-react"
import { HealthBar } from "@/components/health-bar"
import { cn } from "@/lib/utils"

export interface StrikeEvent {
  id: number
  type: "slay" | "hurt"
  kills?: number
  coins?: number
  damage?: number
}

interface BattleArenaProps {
  heroHp: number
  heroMaxHp: number
  enemyHp: number
  enemyMaxHp: number
  wave: number
  defeated: number
  strike: StrikeEvent | null
  outcome: "win" | "lose" | null
  status: "idle" | "playing" | "finished"
  expanded: boolean
  onToggle: () => void
}

export function BattleArena({
  heroHp,
  heroMaxHp,
  enemyHp,
  enemyMaxHp,
  wave,
  defeated,
  strike,
  outcome,
  status,
  expanded,
  onToggle,
}: BattleArenaProps) {
  const [lunge, setLunge] = useState<"hero" | "enemy" | null>(null)
  const [slaying, setSlaying] = useState(false)
  const [hurt, setHurt] = useState(false)
  const [popup, setPopup] = useState<StrikeEvent | null>(null)
  const [coinBurst, setCoinBurst] = useState<{ id: number; coins: number } | null>(null)

  useEffect(() => {
    if (!strike) return
    setPopup(strike)
    const timers: ReturnType<typeof setTimeout>[] = []
    if (strike.type === "slay") {
      setLunge("hero")
      setSlaying(true)
      setCoinBurst({ id: strike.id, coins: strike.coins ?? 0 })
      timers.push(setTimeout(() => setLunge(null), 400))
      timers.push(setTimeout(() => setSlaying(false), 650))
      timers.push(setTimeout(() => setCoinBurst(null), 1000))
    } else {
      setLunge("enemy")
      setHurt(true)
      timers.push(setTimeout(() => setLunge(null), 400))
      timers.push(setTimeout(() => setHurt(false), 550))
    }
    timers.push(setTimeout(() => setPopup(null), 950))
    return () => timers.forEach(clearTimeout)
  }, [strike])

  // A handful of coins for the burst, each drifting a slightly different way.
  const coins = useMemo(() => {
    if (!coinBurst) return []
    const n = Math.min(3 + (coinBurst.coins > 20 ? 3 : 1), 6)
    return Array.from({ length: n }, (_, i) => ({
      key: `${coinBurst.id}-${i}`,
      dx: (i - (n - 1) / 2) * 18,
      delay: i * 60,
    }))
  }, [coinBurst])

  return (
    <aside
      className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card lg:w-[340px]"
      aria-label="Battle arena"
    >
      <div className="flex items-center justify-between gap-2 border-b border-border p-3">
        <div className="flex items-center gap-2">
          <Swords className="size-5 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold">Battle Arena</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground">
            <Skull className="size-3.5 text-destructive" aria-hidden="true" />
            {defeated}
          </span>
          <button
            type="button"
            onClick={onToggle}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label={expanded ? "Collapse battle arena" : "Expand battle arena"}
            aria-expanded={expanded}
          >
            <ChevronDown className={cn("size-4 transition-transform", expanded ? "" : "-rotate-90")} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="flex flex-col gap-3 p-3">
          <HealthBar name={`Enemy #${wave}`} hp={enemyHp} maxHp={enemyMaxHp} side="enemy" />

          {/* Arena stage */}
          <div className="relative h-44 overflow-hidden rounded-xl border border-border bg-gradient-to-b from-secondary/60 to-background">
            <div className="absolute bottom-7 left-0 right-0 h-px bg-border" />

            {/* Hero */}
            <div
              className={cn(
                "absolute bottom-4 left-4 transition-transform duration-300 ease-out",
                lunge === "hero" && "translate-x-20",
              )}
            >
              <Image
                src="/fighter-hero.png"
                alt="Your hero fighter"
                width={80}
                height={96}
                className="h-20 w-auto object-contain drop-shadow-[0_0_10px_oklch(0.58_0.19_264/0.5)]"
                priority
              />
            </div>

            {/* Enemy */}
            <div
              className={cn(
                "absolute bottom-4 right-4 transition-all duration-300 ease-out",
                lunge === "enemy" && "-translate-x-20",
                slaying && "scale-50 opacity-0",
                hurt && "animate-[wiggle_0.4s_ease-in-out]",
              )}
            >
              <Image
                src="/fighter-enemy.png"
                alt="Enemy fighter"
                width={80}
                height={96}
                className={cn(
                  "h-20 w-auto object-contain drop-shadow-[0_0_10px_oklch(0.62_0.22_20/0.5)]",
                  slaying && "brightness-200 saturate-0",
                )}
              />
            </div>

            {/* SLAIN flash */}
            {popup?.type === "slay" && (
              <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 animate-[slayFlash_0.65s_ease-out] text-lg font-extrabold text-destructive">
                {popup.kills && popup.kills > 1 ? `x${popup.kills} SLAIN!` : "SLAIN!"}
              </div>
            )}

            {/* Damage to hero */}
            {popup?.type === "hurt" && (
              <div className="pointer-events-none absolute bottom-16 left-8 animate-[floatUp_0.9s_ease-out] text-xl font-extrabold text-destructive">
                -{popup.damage}
              </div>
            )}

            {/* Coin burst */}
            {coinBurst && (
              <div className="pointer-events-none absolute right-10 top-1/2">
                {coins.map((c) => (
                  <span
                    key={c.key}
                    className="absolute animate-[coinBurst_1s_ease-out_forwards]"
                    style={{ ["--coin-dx" as string]: `${c.dx}px`, animationDelay: `${c.delay}ms` }}
                  >
                    <Coins className="size-4 text-amber-400" aria-hidden="true" />
                  </span>
                ))}
                <span className="absolute -top-2 left-2 animate-[floatUp_1s_ease-out] whitespace-nowrap font-mono text-sm font-bold text-amber-300">
                  +{coinBurst.coins}
                </span>
              </div>
            )}

            {/* Outcome overlay */}
            {outcome && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/85 backdrop-blur-sm">
                {outcome === "win" ? (
                  <>
                    <Trophy className="size-9 text-success" aria-hidden="true" />
                    <span className="text-lg font-bold text-success">Victory!</span>
                  </>
                ) : (
                  <>
                    <Skull className="size-9 text-destructive" aria-hidden="true" />
                    <span className="text-lg font-bold text-destructive">Defeated!</span>
                  </>
                )}
              </div>
            )}

            {status === "idle" && !outcome && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-background/70 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur-sm">
                  Awaiting battle
                </span>
              </div>
            )}
          </div>

          <HealthBar name="You" hp={heroHp} maxHp={heroMaxHp} side="hero" />

          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            {status === "playing"
              ? "Correct answers slay foes for coins. Wrong answers let them strike back!"
              : outcome === "win"
                ? "You cleared the gauntlet. Spend your coins in the Shop!"
                : outcome === "lose"
                  ? "The foes overwhelmed you. Upgrade and try again!"
                  : "Pick a topic and start to enter the arena."}
          </p>
        </div>
      )}
    </aside>
  )
}
