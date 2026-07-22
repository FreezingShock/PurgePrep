"use client"

import { Award, RotateCcw, Skull, Target, Trophy, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ResultsScreenProps {
  score: number
  total: number
  bestStreak: number
  outcome: "win" | "lose" | null
  onRestart: () => void
}

function getMessage(pct: number): { title: string; note: string } {
  if (pct >= 90) return { title: "Outstanding!", note: "You're SAT-ready. Keep that edge sharp." }
  if (pct >= 70) return { title: "Great work!", note: "Solid performance — a little polish and you'll ace it." }
  if (pct >= 50) return { title: "Good effort!", note: "You're on the right track. Review the explanations and go again." }
  return { title: "Keep practicing!", note: "Every rep counts. Try another round to build momentum." }
}

export function ResultsScreen({ score, total, bestStreak, outcome, onRestart }: ResultsScreenProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const { title, note } = getMessage(pct)
  const won = outcome === "win"

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
      {outcome && (
        <div
          className={cn(
            "mb-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold liquid-glass border-2",
            won ? "border-success/50 text-success" : "border-destructive/50 text-destructive",
          )}
        >
          {won ? <Trophy className="size-4" aria-hidden="true" /> : <Skull className="size-4" aria-hidden="true" />}
          {won ? "Battle Won" : "Battle Lost"}
        </div>
      )}

      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/25">
        <Award className="size-8 text-primary" aria-hidden="true" />
      </div>

      <h1 className="text-balance text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{note}</p>

      <div className="mt-8 w-full rounded-2xl border border-border bg-card p-6">
        <div className="text-sm text-muted-foreground">Final Score</div>
        <div className="mt-1 font-mono text-5xl font-bold tabular-nums text-foreground">
          {score}
          <span className="text-2xl text-muted-foreground">/{total}</span>
        </div>
        <div className="mt-2 font-mono text-sm text-primary">{pct}% accuracy</div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-background p-4">
            <Target className="size-5 text-accent" aria-hidden="true" />
            <span className="font-mono text-xl font-semibold tabular-nums">{score}</span>
            <span className="text-xs text-muted-foreground">Correct</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-background p-4">
            <Zap className="size-5 text-success" aria-hidden="true" />
            <span className="font-mono text-xl font-semibold tabular-nums">{bestStreak}</span>
            <span className="text-xs text-muted-foreground">Best Streak</span>
          </div>
        </div>
      </div>

      <Button size="lg" className="mt-8 w-full sm:w-auto sm:px-12" onClick={onRestart}>
        <RotateCcw className="size-4" aria-hidden="true" />
        Play Again
      </Button>
    </div>
  )
}
