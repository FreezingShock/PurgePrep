export type UpgradeId = "blade" | "coin" | "armor"

export interface UpgradeDef {
  id: UpgradeId
  name: string
  tagline: string
  description: string
  maxLevel: number
  baseCost: number
  costGrowth: number
  /** Human-readable effect for a given level. */
  effect: (level: number) => string
}

export type Upgrades = Record<UpgradeId, number>

export interface LifetimeStats {
  gamesPlayed: number
  enemiesDefeated: number
  coinsEarned: number
  bestStreak: number
  correct: number
  answered: number
}

export const INITIAL_UPGRADES: Upgrades = { blade: 0, coin: 0, armor: 0 }

export const INITIAL_STATS: LifetimeStats = {
  gamesPlayed: 0,
  enemiesDefeated: 0,
  coinsEarned: 0,
  bestStreak: 0,
  correct: 0,
  answered: 0,
}

export const UPGRADES: UpgradeDef[] = [
  {
    id: "blade",
    name: "Twin Blades",
    tagline: "Slay more foes per answer",
    description: "Each correct answer cleaves through one additional enemy.",
    maxLevel: 4,
    baseCost: 40,
    costGrowth: 2,
    effect: (lvl) => `${1 + lvl} ${1 + lvl === 1 ? "kill" : "kills"} / correct answer`,
  },
  {
    id: "coin",
    name: "Golden Touch",
    tagline: "Earn more coins per kill",
    description: "Every defeated enemy drops extra coins.",
    maxLevel: 5,
    baseCost: 30,
    costGrowth: 1.8,
    effect: (lvl) => `+${coinsPerKill(lvl)} coins / kill`,
  },
  {
    id: "armor",
    name: "Scholar's Ward",
    tagline: "Survive more mistakes",
    description: "Raises your max HP so wrong answers sting less.",
    maxLevel: 4,
    baseCost: 35,
    costGrowth: 1.9,
    effect: (lvl) => `${heroMaxHp(lvl)} max HP`,
  },
]

/** Cost to buy the NEXT level given the current level. Returns null when maxed. */
export function upgradeCost(def: UpgradeDef, currentLevel: number): number | null {
  if (currentLevel >= def.maxLevel) return null
  return Math.round(def.baseCost * Math.pow(def.costGrowth, currentLevel))
}

export function killsPerCorrect(bladeLevel: number): number {
  return 1 + bladeLevel
}

export function coinsPerKill(coinLevel: number): number {
  return 10 + coinLevel * 6
}

export function heroMaxHp(armorLevel: number): number {
  return 100 + armorLevel * 30
}

/** Damage a foe deals when you miss. Scales up as you get deeper. */
export function enemyDamage(wave: number): number {
  return 18 + Math.floor(wave / 4) * 4
}

/** Cosmetic max HP for the enemy on a given wave. */
export function enemyMaxForWave(wave: number): number {
  return 60 + wave * 12
}
