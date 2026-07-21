export type Category = "math" | "reading" | "grammar"

export interface Question {
  id: string
  category: Category
  prompt: string
  passage?: string
  choices: string[]
  answerIndex: number
  explanation: string
}

export const CATEGORY_LABELS: Record<Category, string> = {
  math: "Math",
  reading: "Reading",
  grammar: "Grammar",
}

export const questions: Question[] = [
  // ---------------- MATH ----------------
  {
    id: "m1",
    category: "math",
    prompt: "If 3x + 7 = 22, what is the value of x?",
    choices: ["3", "5", "7", "15"],
    answerIndex: 1,
    explanation:
      "Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5.",
  },
  {
    id: "m2",
    category: "math",
    prompt:
      "A shirt originally priced at $40 is on sale for 25% off. What is the sale price?",
    choices: ["$10", "$25", "$30", "$35"],
    answerIndex: 2,
    explanation:
      "25% of $40 is $10. Subtract the discount: $40 − $10 = $30.",
  },
  {
    id: "m3",
    category: "math",
    prompt: "What is the slope of the line passing through (2, 3) and (6, 11)?",
    choices: ["1/2", "2", "4", "8"],
    answerIndex: 1,
    explanation:
      "Slope = (11 − 3) / (6 − 2) = 8 / 4 = 2.",
  },
  {
    id: "m4",
    category: "math",
    prompt: "If f(x) = 2x² − 3x + 1, what is f(3)?",
    choices: ["10", "13", "16", "19"],
    answerIndex: 0,
    explanation:
      "f(3) = 2(9) − 3(3) + 1 = 18 − 9 + 1 = 10.",
  },
  {
    id: "m5",
    category: "math",
    prompt:
      "The average of 5 numbers is 12. If a sixth number is added and the new average is 13, what is the sixth number?",
    choices: ["13", "16", "18", "20"],
    answerIndex: 2,
    explanation:
      "Sum of first 5 = 60. New sum for average 13 over 6 values = 78. Sixth number = 78 − 60 = 18.",
  },
  {
    id: "m6",
    category: "math",
    prompt: "Solve for x: |x − 4| = 6.",
    choices: ["x = 10 only", "x = −2 only", "x = 10 or x = −2", "x = 2 or x = 6"],
    answerIndex: 2,
    explanation:
      "x − 4 = 6 gives x = 10; x − 4 = −6 gives x = −2. Both satisfy the equation.",
  },
  {
    id: "m7",
    category: "math",
    prompt:
      "A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?",
    choices: ["10", "12", "14", "48"],
    answerIndex: 0,
    explanation:
      "By the Pythagorean theorem: √(6² + 8²) = √(36 + 64) = √100 = 10.",
  },
  {
    id: "m8",
    category: "math",
    prompt: "If 2^x = 32, what is the value of x?",
    choices: ["4", "5", "6", "16"],
    answerIndex: 1,
    explanation: "32 = 2⁵, so x = 5.",
  },

  // ---------------- READING ----------------
  {
    id: "r1",
    category: "reading",
    passage:
      "The old lighthouse had not been lit in decades, yet the townspeople spoke of it with a reverence usually reserved for the living. To them it was less a building than a sentinel, a silent witness to every storm the coast had weathered.",
    prompt: "As used in the passage, the word 'sentinel' most nearly means:",
    choices: ["a prisoner", "a guard or watchman", "a monument", "a traveler"],
    answerIndex: 1,
    explanation:
      "The passage describes the lighthouse as a 'silent witness' that watches over the coast, matching the meaning of a guard or watchman.",
  },
  {
    id: "r2",
    category: "reading",
    passage:
      "Maria hesitated at the door of the interview room. She had rehearsed her answers a hundred times, but now the words felt slippery, just out of reach. Still, she squared her shoulders and reminded herself why she had come.",
    prompt: "The passage primarily suggests that Maria feels:",
    choices: [
      "confident and relaxed",
      "nervous but determined",
      "angry and resentful",
      "bored and indifferent",
    ],
    answerIndex: 1,
    explanation:
      "Her hesitation and 'slippery' words show nervousness, while squaring her shoulders and recalling her purpose show determination.",
  },
  {
    id: "r3",
    category: "reading",
    passage:
      "Scientists once assumed that the deep ocean was a barren desert, too dark and cold to support much life. Recent expeditions, however, have revealed thriving communities clustered around hydrothermal vents, powered not by sunlight but by chemical energy.",
    prompt: "The main purpose of the passage is to:",
    choices: [
      "argue that ocean exploration is too expensive",
      "correct a former misconception about deep-sea life",
      "describe how hydrothermal vents form",
      "compare the ocean to a desert",
    ],
    answerIndex: 1,
    explanation:
      "The passage contrasts what scientists 'once assumed' with what expeditions have since 'revealed,' correcting an earlier misconception.",
  },
  {
    id: "r4",
    category: "reading",
    passage:
      "The mayor's proposal was met with polite applause, but the murmurs that followed told a different story. Few in the audience believed the budget could stretch as far as she promised.",
    prompt: "The phrase 'told a different story' implies that the audience was:",
    choices: [
      "enthusiastically supportive",
      "quietly skeptical",
      "completely confused",
      "openly hostile",
    ],
    answerIndex: 1,
    explanation:
      "The contrast between 'polite applause' and doubtful 'murmurs' shows the audience was skeptical, though not openly hostile.",
  },
  {
    id: "r5",
    category: "reading",
    passage:
      "Unlike his brother, who charged into every problem headfirst, Daniel preferred to study a situation from every angle before acting. This caution sometimes cost him opportunities, but it rarely cost him regret.",
    prompt: "It can reasonably be inferred that Daniel values:",
    choices: [
      "speed over accuracy",
      "careful deliberation",
      "avoiding all risk",
      "his brother's approval",
    ],
    answerIndex: 1,
    explanation:
      "Daniel studies situations 'from every angle before acting,' indicating he values careful deliberation over impulsiveness.",
  },
  {
    id: "r6",
    category: "reading",
    passage:
      "The novel's early chapters move at a glacial pace, burdened by lengthy descriptions of the countryside. Yet readers who persist are rewarded with a final act of remarkable emotional force.",
    prompt: "The author's attitude toward the novel is best described as:",
    choices: [
      "uniformly negative",
      "qualified appreciation",
      "complete indifference",
      "unreserved enthusiasm",
    ],
    answerIndex: 1,
    explanation:
      "The author criticizes the slow start but praises the powerful ending, expressing appreciation that is qualified by reservations.",
  },

  // ---------------- GRAMMAR ----------------
  {
    id: "g1",
    category: "grammar",
    prompt:
      "Choose the option that best completes the sentence: 'Each of the students ___ responsible for their own project.'",
    choices: ["are", "is", "were", "be"],
    answerIndex: 1,
    explanation:
      "The subject 'Each' is singular, so it takes the singular verb 'is.'",
  },
  {
    id: "g2",
    category: "grammar",
    prompt:
      "Which choice correctly punctuates the sentence? 'We visited three cities ___ Paris, Rome, and Madrid.'",
    choices: [", namely", ": namely,", ": ", "; "],
    answerIndex: 2,
    explanation:
      "A colon introduces a list that follows an independent clause: 'We visited three cities: Paris, Rome, and Madrid.'",
  },
  {
    id: "g3",
    category: "grammar",
    prompt:
      "Select the correct word: 'The committee will announce ___ decision tomorrow.'",
    choices: ["they're", "their", "its", "it's"],
    answerIndex: 2,
    explanation:
      "'Committee' is a singular collective noun, so the possessive pronoun is 'its' (no apostrophe).",
  },
  {
    id: "g4",
    category: "grammar",
    prompt:
      "Choose the option that corrects the modifier: 'Walking to school, ___.'",
    choices: [
      "the rain began to fall",
      "my backpack felt heavy",
      "I noticed the leaves changing color",
      "the bell was ringing loudly",
    ],
    answerIndex: 2,
    explanation:
      "The introductory phrase must modify the person walking. Only 'I' can be walking to school, so option 3 avoids the dangling modifier.",
  },
  {
    id: "g5",
    category: "grammar",
    prompt:
      "Which choice best combines the sentences? 'The experiment failed. The researchers learned valuable lessons.'",
    choices: [
      "The experiment failed, the researchers learned valuable lessons.",
      "The experiment failed, but the researchers learned valuable lessons.",
      "The experiment failed the researchers learned valuable lessons.",
      "The experiment failed; and the researchers learned valuable lessons.",
    ],
    answerIndex: 1,
    explanation:
      "A comma plus the coordinating conjunction 'but' correctly joins two independent clauses that contrast.",
  },
  {
    id: "g6",
    category: "grammar",
    prompt:
      "Select the sentence with correct verb tense: 'By the time we arrived, the movie ___.'",
    choices: ["already started", "has already started", "had already started", "will already start"],
    answerIndex: 2,
    explanation:
      "The past perfect 'had already started' describes an action completed before another past action ('arrived').",
  },
  {
    id: "g7",
    category: "grammar",
    prompt:
      "Choose the correct pronoun: 'Between you and ___, this is the best plan.'",
    choices: ["I", "me", "myself", "mine"],
    answerIndex: 1,
    explanation:
      "After the preposition 'between,' the objective pronoun 'me' is required, not 'I.'",
  },
]

export function getShuffledQuestions(count: number): Question[] {
  const shuffled = [...questions]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
