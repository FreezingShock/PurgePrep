# SAT Sprint Project Guide

## Project Overview
SAT Sprint is a gamified SAT preparation platform built with Next.js 16. It combines timed quiz challenges with RPG-style battle mechanics and a persistent upgrade economy.

## Key Features
- **Game Loop**: Start screen → Question cards → Battle visualization → Results
- **Persistence**: localStorage saves coins, upgrades, and lifetime stats
- **Economy System**: Coins → Upgrades (Blades, Gold, Armor)
- **Questions**: 24 questions (8 math, 8 reading, 8 grammar) with explanations

## Tech Decisions

### Why This Stack?
- **Next.js 16**: SSR + App Router for modern React patterns
- **TypeScript**: Type safety for complex game state
- **Tailwind CSS 4**: Fast styling, dark mode by default
- **shadcn/ui**: Minimal, customizable components
- **localStorage**: Simple persistence without backend

### What's NOT Here (Intentional)
- No database (keep it simple for now)
- No authentication (session-based, not user-based)
- No backend API (all logic client-side)
- These can be added later without refactoring game logic

## Important Code Locations

### Game Logic
- **Economy**: `lib/game.ts` (upgrade costs, damage, HP calculations)
- **Questions**: `lib/questions.ts` (question bank, shuffle algorithm)
- **Main Loop**: `components/sat-sprint.tsx` (state machine: start → playing → finished)

### UI Components
- **Quiz**: `components/quiz-card.tsx` (question + answers)
- **Battle**: `components/battle-arena.tsx` (visual HP bars, strike animations)
- **Settings**: `components/start-screen.tsx` (topic/time selection)
- **Results**: `components/results-screen.tsx` (score, streak, restart)
- **Upgrades**: `components/game-modal.tsx` (buy upgrades, view stats)

## Development Workflow

### Local Development
```bash
pnpm dev     # Start dev server on localhost:3000
pnpm build   # Test production build
pnpm start   # Run production build
```

### Testing Checklist
- [ ] All 3 categories have questions
- [ ] Coins persist across refresh
- [ ] Upgrades persist across refresh
- [ ] Stats accumulate across games
- [ ] Mobile layout works (test on 375px width)
- [ ] Dark mode displays correctly

## Deployment

### Current Setup
- Hosted on Vercel (automatic CI/CD)
- Domain: purgeprep.xyz
- Auto-deploys on git push to main

### Before Major Changes
1. Test locally: `pnpm build && pnpm start`
2. Check TypeScript: No errors in build
3. Test in browser: All features work
4. Push to GitHub → Auto-deploys to Vercel

## Future Roadmap

### High Priority
- [ ] Increase question bank (50+ per category)
- [ ] Add difficulty levels
- [ ] Backend persistence (optional: database for scores)

### Medium Priority
- [ ] Leaderboards (requires backend)
- [ ] User authentication (optional)
- [ ] More upgrade tiers
- [ ] Timed sprint modes (5min, 10min)

### Low Priority
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] Dark/light theme toggle
- [ ] Animations improvements

## Performance Notes

- Vercel Analytics already integrated
- Images not optimized (can add next/image)
- Bundle size is small (shadcn components are minimal)
- localStorage has 5-10MB limit (not a concern for this data)

## Known Limitations

- **No persistence across browsers**: localStorage is device/browser specific
- **No user accounts**: Can't track progress across devices
- **Limited questions**: 24 total, would be repetitive after a few sessions
- **No offline mode**: Requires internet connection

These aren't bugs—they're intentional scope decisions. Add them if needed.

## Code Style

- **No comments**: Self-documenting code preferred
- **Single responsibility**: Each component does one thing
- **Tailwind classes**: Keep them in className strings (not extracted)
- **No premature abstractions**: Don't make helpers until needed twice
- **TypeScript strict**: All code must pass `tsc` check

## Troubleshooting

### Build Errors
- Remove `node_modules`: `rm -rf node_modules`
- Reinstall: `pnpm install`
- Clear Next.js cache: `rm -rf .next`
- Run build: `pnpm build`

### localStorage Issues
- Check DevTools → Application → Storage → localStorage
- Keys: `sat_coins`, `sat_upgrades`, `sat_stats`
- Clear if corrupted: `localStorage.clear()` in console

### Slow on Mobile
- Check Vercel Analytics for Core Web Vitals
- Ensure images are compressed
- Test on actual device (not just Chrome DevTools)

## Questions?
See README.md for user documentation.
See DEPLOYMENT.md for deployment instructions.
