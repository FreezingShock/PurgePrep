export type UpgradeId = "blade" | "coin" | "armor" | "pickaxe" | "apple" | "shield" | "emerald" | "book"

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
  emoji: string
  category: "damage" | "defense" | "economy" | "utility"
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

export const INITIAL_UPGRADES: Upgrades = { blade: 0, coin: 0, armor: 0, pickaxe: 0, apple: 0, shield: 0, emerald: 0, book: 0 }

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
    name: "Iron Sword",
    tagline: "Strike harder in battle",
    description: "Each correct answer strikes down one additional foe.",
    maxLevel: 4,
    baseCost: 40,
    costGrowth: 2,
    effect: (lvl) => `${1 + lvl} ${1 + lvl === 1 ? "hit" : "hits"} / correct`,
    emoji: "⚔️",
    category: "damage",
  },
  {
    id: "coin",
    name: "Golden Apple",
    tagline: "Restore health & fortune",
    description: "Enemies drop more gold when defeated.",
    maxLevel: 5,
    baseCost: 30,
    costGrowth: 1.8,
    effect: (lvl) => `+${coinsPerKill(lvl)} gold / kill`,
    emoji: "🍎",
    category: "economy",
  },
  {
    id: "armor",
    name: "Diamond Armor",
    tagline: "Legendary protection",
    description: "Increases your maximum health pool.",
    maxLevel: 4,
    baseCost: 35,
    costGrowth: 1.9,
    effect: (lvl) => `${heroMaxHp(lvl)} max HP`,
    emoji: "💎",
    category: "defense",
  },
  {
    id: "pickaxe",
    name: "Diamond Pickaxe",
    tagline: "Mine more resources",
    description: "Increases gold drop rate on every kill.",
    maxLevel: 3,
    baseCost: 50,
    costGrowth: 2.2,
    effect: (lvl) => `+${20 + lvl * 10}% gold bonus`,
    emoji: "⛏️",
    category: "economy",
  },
  {
    id: "shield",
    name: "Obsidian Shield",
    tagline: "Reduce incoming damage",
    description: "Absorb 5% of incoming damage per level.",
    maxLevel: 4,
    baseCost: 45,
    costGrowth: 2,
    effect: (lvl) => `${lvl * 5}% damage reduction`,
    emoji: "🛡️",
    category: "defense",
  },
  {
    id: "emerald",
    name: "Emerald Fortune",
    tagline: "Multiply your wealth",
    description: "Boosts total gold earned from all sources.",
    maxLevel: 3,
    baseCost: 55,
    costGrowth: 2.3,
    effect: (lvl) => `+${lvl * 15}% total gold`,
    emoji: "💚",
    category: "economy",
  },
  {
    id: "book",
    name: "Enchanted Book",
    tagline: "Boost your knowledge",
    description: "Increases streak multiplier and retention.",
    maxLevel: 3,
    baseCost: 38,
    costGrowth: 1.9,
    effect: (lvl) => `+${lvl * 10}% streak bonus`,
    emoji: "📖",
    category: "utility",
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

export function pickaxeGoldBonus(pickaxeLevel: number): number {
  return 20 + pickaxeLevel * 10
}

export function shieldDamageReduction(shieldLevel: number): number {
  return shieldLevel * 5
}

export function emeraldGoldMultiplier(emeraldLevel: number): number {
  return 1 + emeraldLevel * 0.15
}

export function enchantedBookStreakBonus(bookLevel: number): number {
  return bookLevel * 10
}
