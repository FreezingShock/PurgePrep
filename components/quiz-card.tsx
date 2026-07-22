"use client"

import { Check, Lightbulb, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CATEGORY_LABELS, type Question } from "@/lib/questions"

interface QuizCardProps {
  question: Question
  selected: number | null
  answered: boolean
  timedOut: boolean
  onSelect: (index: number) => void
  onSubmit: () => void
  onNext: () => void
  isLast: boolean
}

const optionLabels = ["A", "B", "C", "D", "E"]

export function QuizCard({ question, selected, answered, timedOut, onSelect, onSubmit, onNext, isLast }: QuizCardProps) {
  const isCorrect = selected === question.answerIndex

  return (
    <div className="rounded-lg liquid-glass p-5 sm:p-7">
      <span className="inline-flex items-center rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
        {CATEGORY_LABELS[question.category]}
      </span>

      {question.passage && (
        <p className="mt-4 rounded-xl border border-border bg-secondary/40 p-4 text-sm leading-relaxed text-muted-foreground">
          {question.passage}
        </p>
      )}

      <h2 className="mt-4 text-pretty text-lg font-semibold leading-snug sm:text-xl">{question.prompt}</h2>

      <div className="mt-5 flex flex-col gap-3">
        {question.choices.map((choice, index) => {
          const isAnswer = index === question.answerIndex
          const isChosen = index === selected

          let state: "idle" | "selected" | "correct" | "wrong" | "faded" = "idle"
          if (answered) {
            if (isAnswer) state = "correct"
            else if (isChosen) state = "wrong"
            else state = "faded"
          } else if (isChosen) {
            state = "selected"
          }

          return (
            <button
              key={index}
              type="button"
              disabled={answered}
              onClick={() => onSelect(index)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors sm:p-4",
                state === "idle" &&
                  "border-border bg-background hover:border-primary hover:bg-primary/5",
                state === "selected" && "border-primary bg-primary/10",
                state === "correct" && "border-success bg-success/10",
                state === "wrong" && "border-destructive bg-destructive/10",
                state === "faded" && "border-border bg-background opacity-55",
              )}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-semibold",
                  state === "selected" && "border-primary bg-primary text-primary-foreground",
                  state === "correct" && "border-success bg-success text-success-foreground",
                  state === "wrong" && "border-destructive bg-destructive text-primary-foreground",
                  (state === "idle" || state === "faded") && "border-border text-muted-foreground",
                )}
                aria-hidden="true"
              >
                {state === "correct" ? (
                  <Check className="size-4" />
                ) : state === "wrong" ? (
                  <X className="size-4" />
                ) : (
                  optionLabels[index]
                )}
              </span>
              <span className="text-sm leading-relaxed sm:text-base">{choice}</span>
            </button>
          )
        })}
      </div>

      {(selected !== null || answered) && (
        <div className="mt-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {answered && (
            <>
              <div
                className={cn(
                  "mb-4 flex items-center gap-2 text-sm font-semibold",
                  timedOut ? "text-accent" : isCorrect ? "text-success" : "text-destructive",
                )}
              >
                {timedOut ? "Time's up!" : isCorrect ? "Correct!" : "Not quite."}
              </div>
              <div className="flex gap-3 rounded-xl border border-border bg-secondary/40 p-4">
                <Lightbulb className="size-5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-muted-foreground">{question.explanation}</p>
              </div>
            </>
          )}
          <Button
            className="mt-5 w-full sm:w-auto sm:px-10"
            onClick={answered ? onNext : onSubmit}
          >
            {answered ? (isLast ? "See Results" : "Next Question") : "Answer (or press Enter/Space)"}
          </Button>
        </div>
      )}
    </div>
  )
}
