<<<<<<< HEAD
# SAT Sprint — Timed SAT Prep Game

A gamified SAT preparation platform where students sharpen their skills through timed challenges in math, reading, and grammar. Features an RPG-style battle system with persistent upgrades and economy tracking.

## Live Demo
🔗 **https://purgeprep.xyz**

## Features

- **Timed Challenges**: Choose between Fast (20s), Standard (30s), or Relaxed (45s) per question
- **Category Selection**: Filter by Math, Reading, Grammar, or mix all three
- **RPG Battle System**: Visual battle arena with HP tracking and wave progression
- **Persistent Economy**: 
  - Earn coins by defeating enemies (correct answers)
  - Purchase upgrades: Twin Blades, Golden Touch, Scholar's Ward
  - Track lifetime stats: games played, enemies defeated, best streak
- **Instant Explanations**: Every question includes a detailed explanation
- **Score Tracking**: Real-time score, streak counter, and progress bar
- **Mobile Responsive**: Fully optimized for mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics
- **Storage**: localStorage (client-side persistence)

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sat-prep-game.git
cd sat-prep-game

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

```bash
# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Project Structure

```
sat-prep-game/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── sat-sprint.tsx           # Main game component
│   ├── battle-arena.tsx         # Battle visualization
│   ├── quiz-card.tsx            # Question card
│   ├── results-screen.tsx       # Results display
│   ├── start-screen.tsx         # Game settings screen
│   ├── game-modal.tsx           # Upgrades/stats modal
│   ├── top-bar.tsx              # Header with coins
│   ├── health-bar.tsx           # HP visualization
│   ├── stat-pill.tsx            # Stat badges
│   ├── error-boundary.tsx       # Error handling
│   └── ui/                      # shadcn/ui components
├── lib/                          # Utilities
│   ├── questions.ts             # Question bank & shuffle
│   ├── game.ts                  # Game mechanics & calculations
│   └── utils.ts                 # Helper functions
├── public/                       # Static assets
│   ├── manifest.json            # PWA manifest
│   ├── robots.txt               # SEO robots file
│   ├── sitemap.xml              # SEO sitemap
│   └── ...icons & images
├── vercel.json                   # Vercel deployment config
├── next.config.mjs              # Next.js config
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind config
├── postcss.config.mjs           # PostCSS config
└── package.json                 # Dependencies
```

## Game Mechanics

### Economy System
- **Coins**: Earned by defeating enemies (correct answers)
  - Base: 10 coins per kill
  - Golden Touch upgrade: +6 coins per level
  
- **Upgrades**:
  - **Twin Blades** (Max Level 4): Increases kills per correct answer (1-5 kills)
    - Base cost: 40 coins, scaling 2x per level
  - **Golden Touch** (Max Level 5): Increases coins per kill
    - Base cost: 30 coins, scaling 1.8x per level
  - **Scholar's Ward** (Max Level 4): Increases max HP (100-220 HP)
    - Base cost: 35 coins, scaling 1.9x per level

### Battle System
- Hero HP decreases on wrong answers or timeouts
- Enemy waves scale in difficulty
- Defeating enemies grants coins
- Game ends when hero HP reaches 0

### Question Bank
- **24 questions total** (8 per category)
- **Categories**: Math, Reading, Grammar
- Each question has 4 multiple-choice options
- Instant explanations for every question

## Deployment

### Deployed on Vercel

The app is automatically deployed to [purgeprep.xyz](https://purgeprep.xyz) using Vercel's GitHub integration.

**Deploy settings**:
- Build Command: `next build`
- Install Command: `pnpm install`
- Output Directory: `.next`
- Environment: Production

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Environment Variables

See `.env.example` for available environment variables:

```env
NEXT_PUBLIC_DOMAIN=purgeprep.xyz
NODE_ENV=production
```

## Performance

- **Lighthouse Score**: 95+
- **Core Web Vitals**: Optimized
- **Image Optimization**: AVIF + WebP formats
- **Code Splitting**: Automatic via Next.js
- **Caching**: Vercel edge caching enabled

## SEO

- **Metadata**: Comprehensive title, description, keywords
- **Open Graph**: Social media sharing optimization
- **Twitter Card**: Enhanced tweet previews
- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: Proper indexing rules at `/robots.txt`
- **PWA Support**: Installable on mobile devices

## Persistence

All game data persists in browser localStorage:
- `sat_coins`: Current coin balance
- `sat_upgrades`: Upgrade levels
- `sat_stats`: Lifetime statistics

Data survives page refreshes but not browser cache clearing.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Improvements

- [ ] Backend database for server-side persistence
- [ ] User authentication & leaderboards
- [ ] More questions (100+ per category)
- [ ] Question difficulty levels
- [ ] Timed sprints (5min, 10min, 20min modes)
- [ ] Analytics dashboard
- [ ] Dark/Light theme toggle
- [ ] Offline mode support
- [ ] Mobile app (React Native)

## Contributing

Contributions welcome! Please follow the existing code style and patterns.

## License

MIT © 2026 PurgePrep

## Support

For issues, suggestions, or feedback, please open an issue on GitHub.

---

**Built with ❤️ for SAT students everywhere**
=======
# PurgePrep
>>>>>>> 409426e4d0e1f466216e9f290ce23bb25f4cd6c0
