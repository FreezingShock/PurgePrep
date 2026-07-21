# Quick Start Guide

## ⚡ Get Running in 2 Minutes

### 1. Install Dependencies
```bash
cd sat-prep-game
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```
Then open [http://localhost:3000](http://localhost:3000)

### 3. Test the Game
- [ ] Click a topic (Math, Reading, Grammar, or Mixed)
- [ ] Choose a time limit (20s, 30s, or 45s)
- [ ] Click "Start Challenge"
- [ ] Answer a question (choose any option)
- [ ] Watch the battle animation
- [ ] Coins should update if correct
- [ ] Refresh the page → coins should still be there ✅

---

## 🏗️ Build for Production

```bash
# Test production build locally
pnpm build
pnpm start
# Open http://localhost:3000
```

### If Build Succeeds: ✅
- No errors in terminal
- App loads at localhost:3000
- Game plays normally
- Ready to push to GitHub

### If Build Fails: ❌
```bash
# Clean and rebuild
rm -rf node_modules .next
pnpm install
pnpm build
```

---

## 📤 Deploy to Vercel

### Option 1: GitHub Automatic Deploy (Recommended)
```bash
# 1. Commit your changes
git add .
git commit -m "Production improvements"

# 2. Push to GitHub
git push origin main

# 3. Vercel auto-deploys
# Check: https://vercel.com/dashboard → your project
# Should be live at https://purgeprep.xyz in 2-3 min
```

### Option 2: Vercel CLI Manual Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
vercel

# Follow the prompts
# Will ask about project settings
```

---

## 🧪 Testing Checklist

### Functionality
- [ ] Game starts when clicking "Start Challenge"
- [ ] Questions appear one at a time
- [ ] Timer counts down (30s, 20s, 45s depending on setting)
- [ ] Wrong answer: health decreases, streak resets
- [ ] Right answer: score increases, enemy defeated, coins earned
- [ ] Game ends when time runs out or health reaches 0
- [ ] Results screen shows score, streak, best streak

### Persistence
- [ ] Coins display in top bar
- [ ] Buy an upgrade in upgrades modal
- [ ] Refresh page (Ctrl+R)
- [ ] Coins and upgrades should still be there ✅

### Mobile
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Choose "iPhone SE" or similar
- [ ] Game should be responsive and playable

### Performance
- [ ] Page loads in < 2 seconds
- [ ] No console errors (F12 → Console tab)
- [ ] Interactions are smooth (no lag)

---

## 🚀 What's Ready to Go

✅ **Deployment**: Vercel config complete
✅ **Domain**: purgeprep.xyz ready
✅ **SEO**: Sitemap, robots.txt, metadata
✅ **Persistence**: localStorage saves coins/upgrades/stats
✅ **Error Handling**: Error boundary + 404 page
✅ **Docs**: README, DEPLOYMENT guide, dev reference
✅ **Security**: Headers, HTTPS, TypeScript strict

---

## 📝 Project Files to Know

| File | Purpose |
|------|---------|
| `components/sat-sprint.tsx` | Main game logic |
| `components/battle-arena.tsx` | Battle visuals |
| `components/quiz-card.tsx` | Question display |
| `lib/questions.ts` | Question bank |
| `lib/game.ts` | Economy mechanics |
| `vercel.json` | Deployment config |
| `public/manifest.json` | PWA config |
| `public/robots.txt` | SEO config |

---

## 🎯 First Time Deploying?

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Find your project
   - It should say "Deploying..." or "Ready"
   - Wait 2-3 minutes

3. **Visit Your Site**
   - Go to https://purgeprep.xyz
   - Should see your SAT Sprint game
   - Test it works

4. **That's It!** 🎉
   - Every time you push to GitHub, Vercel auto-deploys
   - No manual deploy needed

---

## 🐛 Troubleshooting

### "pnpm command not found"
```bash
npm install -g pnpm
# Then try again
```

### "Port 3000 already in use"
```bash
# Use different port
pnpm dev -p 3001
# Open http://localhost:3001
```

### "Build fails with TypeScript errors"
```bash
# Check which files have errors
pnpm build
# Fix errors shown in terminal
# Commit and push
```

### "Vercel deployment stuck"
```bash
# Force redeploy in Vercel Dashboard:
# Deployments tab → click failed build → "Redeploy"
```

### "localStorage not saving"
- Check: F12 → Application → Storage → localStorage
- Should see `sat_coins`, `sat_upgrades`, `sat_stats`
- If empty, data isn't saving (check console errors)

---

## 📚 Read More

- **User Features**: See `README.md`
- **Deployment Steps**: See `DEPLOYMENT.md`
- **Developer Guide**: See `CLAUDE.md`
- **All Changes**: See `IMPROVEMENTS_COMPLETED.md`

---

## ✨ You're Ready!

Your SAT Sprint project is production-ready. All improvements are implemented.

**Next step**: Push to GitHub and watch it deploy to purgeprep.xyz! 🚀
