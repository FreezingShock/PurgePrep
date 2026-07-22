"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeft, Flame, Target, Timer as TimerIcon } from "lucide-react"
import { StartScreen, type Filter } from "@/components/start-screen"
import { QuizCard } from "@/components/quiz-card"
import { ResultsScreen } from "@/components/results-screen"
import { StatPill } from "@/components/stat-pill"
import { BattleArena, type StrikeEvent } from "@/components/battle-arena"
import { TopBar, type PanelType } from "@/components/top-bar"
import { GameModal } from "@/components/game-modal"
import { getShuffledQuestions, questions as allQuestions, type Question } from "@/lib/questions"
import {
  INITIAL_STATS,
  INITIAL_UPGRADES,
  UPGRADES,
  coinsPerKill,
  enemyDamage,
  enemyMaxForWave,
  heroMaxHp,
  killsPerCorrect,
  upgradeCost,
  type LifetimeStats,
  type UpgradeId,
  type Upgrades,
} from "@/lib/game"
import { cn } from "@/lib/utils"

type Phase = "start" | "playing" | "finished"
type Outcome = "win" | "lose" | null

const QUESTION_COUNT = 8

export function SatSprint() {
  const [phase, setPhase] = useState<Phase>("start")
  const [deck, setDeck] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)

  // Persistent economy with localStorage
  const [coins, setCoins] = useState(() => {
    if (typeof window === 'undefined') return 0
    const saved = localStorage.getItem('sat_coins')
    return saved ? parseInt(saved, 10) : 0
  })
  const [upgrades, setUpgrades] = useState<Upgrades>(() => {
    if (typeof window === 'undefined') return INITIAL_UPGRADES
    const saved = localStorage.getItem('sat_upgrades')
    return saved ? JSON.parse(saved) : INITIAL_UPGRADES
  })
  const [stats, setStats] = useState<LifetimeStats>(() => {
    if (typeof window === 'undefined') return INITIAL_STATS
    const saved = localStorage.getItem('sat_stats')
    return saved ? JSON.parse(saved) : INITIAL_STATS
  })
  const [coinPulse, setCoinPulse] = useState<{ id: number; amount: number } | null>(null)
  const [panel, setPanel] = useState<PanelType | null>(null)

  // Battle state
  const maxHp = heroMaxHp(upgrades.armor)
  const [heroHp, setHeroHp] = useState(maxHp)
  const [enemyHp, setEnemyHp] = useState(enemyMaxForWave(1))
  const [enemyMaxHp, setEnemyMaxHp] = useState(enemyMaxForWave(1))
  const [defeated, setDefeated] = useState(0)
  const [strike, setStrike] = useState<StrikeEvent | null>(null)
  const [outcome, setOutcome] = useState<Outcome>(null)
  const [expanded, setExpanded] = useState(true)
  const eventId = useRef(0)
  const respawnRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [perQuestion, setPerQuestion] = useState(30)
  const [timeLeft, setTimeLeft] = useState(30)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const question = deck[current]

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const nextEventId = () => {
    eventId.current += 1
    return eventId.current
  }

  // The foe strikes the hero on a wrong answer or a timeout.
  const enemyStrike = useCallback(() => {
    const dmg = enemyDamage(defeated + 1)
    setStrike({ id: nextEventId(), type: "hurt", damage: dmg })
    setHeroHp((hp) => {
      const next = Math.max(0, hp - dmg)
      if (next <= 0) setOutcome("lose")
      return next
    })
  }, [defeated])

  const handleTimeout = useCallback(() => {
    clearTimer()
    setAnswered(true)
    setTimedOut(true)
    setStreak(0)
    setStats((s) => ({ ...s, answered: s.answered + 1 }))
    enemyStrike()
  }, [clearTimer, enemyStrike])

  // Countdown — runs while a question is unanswered.
  useEffect(() => {
    if (phase !== "playing" || answered) return
    setTimeLeft(perQuestion)
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleTimeout()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return clearTimer
  }, [phase, current, answered, perQuestion, handleTimeout, clearTimer])

  useEffect(() => () => { respawnRef.current && clearTimeout(respawnRef.current); }, [])

  // Persist coins to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sat_coins', coins.toString())
    }
  }, [coins])

  // Persist upgrades to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sat_upgrades', JSON.stringify(upgrades))
    }
  }, [upgrades])

  // Persist stats to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sat_stats', JSON.stringify(stats))
    }
  }, [stats])

  const startGame = (filter: Filter, seconds: number) => {
    const pool =
      filter === "all"
        ? getShuffledQuestions(QUESTION_COUNT)
        : getShuffledQuestions(allQuestions.length).filter((q) => q.category === filter).slice(0, QUESTION_COUNT)
    setDeck(pool)
    setPerQuestion(seconds)
    setTimeLeft(seconds)
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setTimedOut(false)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setHeroHp(heroMaxHp(upgrades.armor))
    setEnemyHp(enemyMaxForWave(1))
    setEnemyMaxHp(enemyMaxForWave(1))
    setDefeated(0)
    setStrike(null)
    setOutcome(null)
    setExpanded(true)
    setStats((s) => ({ ...s, gamesPlayed: s.gamesPlayed + 1 }))
    setPhase("playing")
  }

  const slayEnemies = (kills: number) => {
    const reward = kills * coinsPerKill(upgrades.coin)
    // Drain current foe, award coins, then bring in the next wave.
    setEnemyHp(0)
    setStrike({ id: nextEventId(), type: "slay", kills, coins: reward })
    setCoins((c) => c + reward)
    setCoinPulse({ id: nextEventId(), amount: reward })
    setStats((s) => ({
      ...s,
      enemiesDefeated: s.enemiesDefeated + kills,
      coinsEarned: s.coinsEarned + reward,
    }))
    if (respawnRef.current) clearTimeout(respawnRef.current)
    respawnRef.current = setTimeout(() => {
      setDefeated((d) => {
        const nd = d + kills
        const nm = enemyMaxForWave(nd + 1)
        setEnemyMaxHp(nm)
        setEnemyHp(nm)
        return nd
      })
    }, 700)
  }

  const handleSelect = (index: number) => {
    if (answered) return
    clearTimer()
    setSelected(index)
    setAnswered(true)
    setStats((s) => ({ ...s, answered: s.answered + 1 }))

    if (index === question.answerIndex) {
      setScore((s) => s + 1)
      setStats((s) => ({ ...s, correct: s.correct + 1 }))
      setStreak((prev) => {
        const next = prev + 1
        setBestStreak((b) => Math.max(b, next))
        setStats((s) => ({ ...s, bestStreak: Math.max(s.bestStreak, next) }))
        return next
      })
      slayEnemies(killsPerCorrect(upgrades.blade))
    } else {
      setStreak(0)
      enemyStrike()
    }
  }

  const handleNext = () => {
    if (outcome === "lose") {
      setPhase("finished")
      return
    }
    if (current + 1 >= deck.length) {
      setOutcome("win")
      setPhase("finished")
      return
    }
    setCurrent((c) => c + 1)
    setSelected(null)
    setAnswered(false)
    setTimedOut(false)
  }

  const restart = () => {
    clearTimer()
    setPhase("start")
    setOutcome(null)
    setHeroHp(heroMaxHp(upgrades.armor))
    setEnemyHp(enemyMaxForWave(1))
    setEnemyMaxHp(enemyMaxForWave(1))
    setDefeated(0)
    setStrike(null)
  }

  const goBack = () => {
    clearTimer()
    setPhase("start")
    setDeck([])
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setTimedOut(false)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setOutcome(null)
    setHeroHp(heroMaxHp(upgrades.armor))
    setEnemyHp(enemyMaxForWave(1))
    setEnemyMaxHp(enemyMaxForWave(1))
    setDefeated(0)
    setStrike(null)
  }

  const buyUpgrade = (id: UpgradeId) => {
    const def = UPGRADES.find((u) => u.id === id)
    if (!def) return
    const level = upgrades[id]
    const cost = upgradeCost(def, level)
    if (cost === null || coins < cost) return
    setCoins((c) => c - cost)
    setUpgrades((u) => ({ ...u, [id]: u[id] + 1 }))
    if (id === "armor") {
      const delta = heroMaxHp(level + 1) - heroMaxHp(level)
      setHeroHp((hp) => hp + delta)
    }
  }

  const progress = useMemo(
    () => (deck.length > 0 ? ((current + (answered ? 1 : 0)) / deck.length) * 100 : 0),
    [current, answered, deck.length],
  )

  const lowTime = !answered && timeLeft <= 5
  const status: "idle" | "playing" | "finished" = phase === "playing" ? "playing" : phase === "finished" ? "finished" : "idle"

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar coins={coins} pulse={coinPulse} onOpen={setPanel} />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 py-6 lg:flex-row lg:items-start lg:py-10">
        {/* Primary column */}
        <div className="mx-auto w-full max-w-2xl lg:mx-0 lg:flex-1">
          {phase === "start" && <StartScreen onStart={startGame} />}

          {phase === "playing" && question && (
            <div className="flex flex-col gap-5">
              <button
                onClick={goBack}
                className="flex w-fit items-center gap-2 rounded-lg border border-muted-foreground/30 px-3 py-1.5 text-sm text-muted-foreground transition-all hover:border-muted-foreground/60 hover:bg-muted/50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <div className="grid grid-cols-3 gap-3">
                <StatPill icon={Target} label="Score" value={score} accent="primary" />
                <StatPill icon={Flame} label="Streak" value={streak} accent="destructive" />
                <StatPill
                  icon={TimerIcon}
                  label="Time"
                  value={`${timeLeft}s`}
                  accent={lowTime ? "destructive" : "accent"}
                  className={cn(lowTime && "animate-pulse border-destructive")}
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Question {current + 1} of {deck.length}
                  </span>
                  <span className="font-mono">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <QuizCard
                question={question}
                selected={selected}
                answered={answered}
                timedOut={timedOut}
                onSelect={handleSelect}
                onNext={handleNext}
                isLast={outcome === "lose" || current + 1 >= deck.length}
              />
            </div>
          )}

          {phase === "finished" && (
            <ResultsScreen
              score={score}
              total={deck.length}
              bestStreak={bestStreak}
              outcome={outcome}
              onRestart={restart}
            />
          )}
        </div>

        {/* Battle arena — always present */}
        <div className="lg:sticky lg:top-20">
          <BattleArena
            heroHp={heroHp}
            heroMaxHp={maxHp}
            enemyHp={enemyHp}
            enemyMaxHp={enemyMaxHp}
            wave={defeated + 1}
            defeated={defeated}
            strike={strike}
            outcome={outcome}
            status={status}
            expanded={expanded}
            onToggle={() => setExpanded((o) => !o)}
          />
        </div>
      </main>

      {panel && (
        <GameModal
          type={panel}
          coins={coins}
          upgrades={upgrades}
          stats={stats}
          onBuy={buyUpgrade}
          onClose={() => setPanel(null)}
        />
      )}
    </div>
  )
}
