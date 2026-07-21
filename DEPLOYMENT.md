# Deployment Guide

## Prerequisites
- Vercel account (free tier available)
- GitHub account
- Domain (purgeprep.xyz)

## Step 1: Initialize Git & Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: SAT Sprint game"

# Create a new repository on GitHub
# Then add remote and push
git remote add origin https://github.com/YOUR_USERNAME/sat-prep-game.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your `sat-prep-game` repository
5. Vercel auto-detects Next.js configuration
6. Click "Deploy"
7. Wait for deployment to complete (~2-3 minutes)

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (from project directory)
vercel

# Follow the prompts
# It will ask about project settings and connect to GitHub
```

## Step 3: Connect Your Domain

### Via Vercel Dashboard

1. Open your project in Vercel Dashboard
2. Go to "Settings" → "Domains"
3. Click "Add"
4. Enter: `purgeprep.xyz`
5. Vercel shows DNS records to add

### Configure DNS Records

If your domain registrar is:

**GoDaddy / Namecheap / etc.**:
1. Go to your domain registrar
2. Find DNS settings
3. Add the Nameservers or A record that Vercel provides
4. Wait 24-48 hours for propagation

**Already using Vercel Domains**:
- Just follow the Vercel dashboard instructions
- Should be instant (~5 min)

### Verify Domain

```bash
# After DNS propagates
nslookup purgeprep.xyz
# Should show Vercel nameserver
```

## Step 4: Verify Deployment

Once domain is connected:

1. Visit https://purgeprep.xyz
2. Should load your SAT Sprint app
3. Check browser DevTools:
   - Network tab: All resources loading (green)
   - Console: No errors
   - Performance: Should be fast

## Step 5: Configure Environment

### Set Production Environment Variables

In Vercel Dashboard:

1. Go to "Settings" → "Environment Variables"
2. Add:
   ```
   Key: NEXT_PUBLIC_DOMAIN
   Value: purgeprep.xyz
   Environment: Production, Preview, Development
   ```

## Step 6: Enable Analytics

Analytics is already integrated via `@vercel/analytics/next`.

Monitor in Vercel Dashboard:
- Analytics tab shows real-time traffic
- Core Web Vitals
- Response times
- Top pages

## Automatic Deployments

Every push to `main` branch automatically redeploys:

1. Push to GitHub: `git push`
2. Vercel detects changes
3. Automatic build & deploy starts
4. App updates within 2-3 minutes

### Deploy Preview for Pull Requests

Every PR automatically gets a preview deployment URL for testing before merging.

## Monitoring & Maintenance

### Regular Checks

- Monitor analytics in Vercel Dashboard
- Check error logs in Deployment tab
- Review performance metrics
- Update dependencies monthly

### Updates & Hotfixes

```bash
# Make changes locally
git add .
git commit -m "Fix: description"
git push origin main

# Vercel automatically deploys
# Check https://vercel.com/dashboard for deployment status
```

## Troubleshooting

### Domain Not Loading

```bash
# Check DNS propagation
nslookup purgeprep.xyz
dig purgeprep.xyz

# Should show Vercel nameservers
```

### Build Fails

1. Check Vercel Dashboard → "Deployments"
2. Click failed deployment for error logs
3. Common fixes:
   - Clear build cache: Settings → Git → Redeploy
   - Check dependencies: `pnpm install`
   - Run locally: `pnpm build`

### Slow Performance

1. Check Vercel Analytics
2. Review:
   - Image sizes (should be compressed)
   - JavaScript bundle size
   - API response times

## Rollback

If something breaks after deployment:

```bash
# Via Vercel Dashboard:
# 1. Go to "Deployments"
# 2. Find previous working version
# 3. Click "..." → "Promote to Production"

# Or via Git:
git revert HEAD
git push origin main
# Vercel auto-deploys previous version
```

## Security

Vercel provides:
- ✅ HTTPS/SSL (automatic)
- ✅ DDoS protection
- ✅ WAF (Web Application Firewall)
- ✅ Environment variable encryption
- ✅ Build cache isolation

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy to Vercel
3. ✅ Connect domain
4. ✅ Monitor analytics
5. 📋 Gather user feedback
6. 🚀 Plan new features

---

For more help: [Vercel Docs](https://vercel.com/docs)
