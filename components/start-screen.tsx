"use client"

import { useState } from "react"
import { BookOpen, Calculator, GraduationCap, PenLine, Timer, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Category } from "@/lib/questions"

export type Filter = Category | "all"

interface StartScreenProps {
  onStart: (filter: Filter, seconds: number) => void
  sessionCoinsEarned?: number
  sessionCorrect?: number
  currentCoins?: number
}

const filters: { value: Filter; label: string; icon: typeof BookOpen }[] = [
  { value: "all", label: "Mixed", icon: GraduationCap },
  { value: "math", label: "Math", icon: Calculator },
  { value: "reading", label: "Reading", icon: BookOpen },
  { value: "grammar", label: "Grammar", icon: PenLine },
]

const times = [
  { value: 20, label: "Fast", desc: "20s / question" },
  { value: 30, label: "Standard", desc: "30s / question" },
  { value: 45, label: "Relaxed", desc: "45s / question" },
]

export function StartScreen({ onStart, sessionCoinsEarned = 0, sessionCorrect = 0, currentCoins = 0 }: StartScreenProps) {
  const [filter, setFilter] = useState<Filter>("all")
  const [seconds, setSeconds] = useState(30)

  const hasSessionData = sessionCoinsEarned > 0 || sessionCorrect > 0

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-lg liquid-glass border-2 border-primary">
        <GraduationCap className="size-8 text-primary" aria-hidden="true" />
      </div>

      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl minecraft-title">SAT Sprint</h1>
      <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
        A timed challenge to sharpen your SAT skills. Answer fast, keep your streak alive, and learn from instant
        explanations.
      </p>

      {hasSessionData && (
        <div className="mt-8 w-full rounded-xl border border-border bg-gradient-to-br from-secondary/40 to-background/40 p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-accent">{sessionCorrect}</span>
              <span className="text-xs text-muted-foreground">Correct</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-amber-400">⬥ {sessionCoinsEarned}</span>
              <span className="text-xs text-muted-foreground">This Session</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-foreground">⬥ {currentCoins}</span>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 w-full text-left">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Zap className="size-4 text-accent" aria-hidden="true" />
          Choose a topic
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {filters.map(({ value, label, icon: Icon }) => {
            const active = filter === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={active}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors",
                  active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                <Icon className={cn("size-6", active ? "text-primary" : "")} aria-hidden="true" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8 w-full text-left">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Timer className="size-4 text-accent" aria-hidden="true" />
          Pace
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {times.map(({ value, label, desc }) => {
            const active = seconds === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => setSeconds(value)}
                aria-pressed={active}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border p-3 transition-colors",
                  active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                <span className="text-sm font-semibold">{label}</span>
                <span className="text-xs text-muted-foreground">{desc}</span>
              </button>
            )
          })}
        </div>
      </div>

      <Button size="lg" className="mt-10 w-full sm:w-auto sm:px-12" onClick={() => onStart(filter, seconds)}>
        Start Challenge
      </Button>
    </div>
  )
}
