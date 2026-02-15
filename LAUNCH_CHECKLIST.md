# Launch Checklist

Use this checklist before deploying to production.

## Pre-Launch Verification

### ✅ Development Environment

- [x] **Bun installed** and working
- [x] **Dependencies installed** (`bun install` successful)
- [x] **Dev server runs** (`bun run dev` works)
- [x] **No console errors** in browser DevTools
- [x] **TypeScript compiles** (`npx tsc --noEmit` passes)

### ✅ Build & Production

- [x] **Production build succeeds** (`bun run build`)
- [x] **Build output exists** (`dist/` directory created)
- [x] **Preview works** (`bun run preview`)
- [x] **Bundle size acceptable** (< 400KB)
- [x] **No build warnings**

### ✅ Functionality Testing

#### Phase 1: Start Page
- [ ] **Page loads** without errors
- [ ] **"Yes" button** navigates to slideshow
- [ ] **"In your dreams!" button** transforms to "Absolutely"
- [ ] **"Absolutely" button** navigates to slideshow
- [ ] **Floating hearts** animate smoothly
- [ ] **Sparkles appear** on mouse movement

#### Phase 2: Slideshow
- [ ] **Images load** (all 10 visible)
- [ ] **Auto-advance** works (3 seconds per image)
- [ ] **Fade transitions** smooth (no jank)
- [ ] **Progress bar** updates correctly
- [ ] **Grid transition** happens after last image
- [ ] **Navigates to memory game** automatically

#### Phase 3: Memory Game
- [ ] **20 cards display** in grid
- [ ] **Cards flip** on click (3D animation)
- [ ] **Matching works** (cards stay revealed)
- [ ] **Non-matching works** (cards flip back)
- [ ] **Move counter** increments
- [ ] **Confetti appears** on match
- [ ] **Victory screen** appears when complete
- [ ] **Final image** displays with message

#### Gallery Page
- [ ] **All images display** in grid
- [ ] **Grid layout** responsive
- [ ] **Click opens modal** with full-size image
- [ ] **Modal closes** on outside click
- [ ] **Close button** works
- [ ] **Back button** returns to previous page

#### FAB Menu
- [ ] **Pig icon displays** correctly
- [ ] **Menu opens** on click
- [ ] **Gallery icon** navigates correctly
- [ ] **Restart icon** (on memory game) resets game
- [ ] **Menu closes** after selection

### ✅ Responsive Design

#### Desktop (> 1024px)
- [ ] **Layout looks good** (no overflow)
- [ ] **Memory game** shows 5×4 grid
- [ ] **Gallery** shows 3 columns
- [ ] **Text readable** and properly sized
- [ ] **Hover effects** work

#### Tablet (641-1024px)
- [ ] **Layout adapts** properly
- [ ] **Memory game** shows 4×5 grid
- [ ] **Gallery** shows 2 columns
- [ ] **No horizontal scroll**
- [ ] **Touch targets** adequate size

#### Mobile (≤ 640px)
- [ ] **Layout stacks** vertically
- [ ] **Memory game** shows 3-4 columns
- [ ] **Gallery** shows 1 column
- [ ] **Text readable** (not too small)
- [ ] **Buttons large enough** (≥ 48px)
- [ ] **No zoom required**

### ✅ Performance

- [ ] **Load time** < 2 seconds (on 3G)
- [ ] **First paint** < 1 second
- [ ] **Animations smooth** (60fps)
- [ ] **No layout shift** during load
- [ ] **Images preload** properly
- [ ] **No memory leaks** (check DevTools)

### ✅ Cross-Browser Testing

- [ ] **Chrome** (latest) - works
- [ ] **Firefox** (latest) - works
- [ ] **Safari** (latest) - works
- [ ] **Edge** (latest) - works
- [ ] **iOS Safari** - works
- [ ] **Chrome Mobile** - works

### ✅ Accessibility

- [ ] **Keyboard navigation** works
- [ ] **Tab order** logical
- [ ] **Focus indicators** visible
- [ ] **Alt text** on images
- [ ] **ARIA labels** on icon buttons
- [ ] **Color contrast** sufficient
- [ ] **Screen reader** friendly (test with VoiceOver/NVDA)

### ✅ Assets

- [ ] **All images present** in `public/images/`
- [ ] **Slideshow images** (001.png - 010.png)
- [ ] **Final image** (final_image.png)
- [ ] **Pig animation** (pig_animation.gif)
- [ ] **Image paths** correct (start with `/`)

### ✅ Code Quality

- [ ] **No TypeScript errors** (`npx tsc --noEmit`)
- [ ] **No console warnings** in production build
- [ ] **Proper error handling** implemented
- [ ] **Event listeners** cleaned up (useEffect cleanup)
- [ ] **No hardcoded values** (use constants)
- [ ] **Comments** on complex logic

### ✅ Security

- [ ] **No sensitive data** in code
- [ ] **No API keys** exposed
- [ ] **HTTPS** enabled (Vercel handles this)
- [ ] **Content Security Policy** headers (optional)

### ✅ SEO & Sharing

- [ ] **Title tag** descriptive
- [ ] **Meta description** present (optional)
- [ ] **Open Graph tags** for sharing (optional)
- [ ] **Favicon** present (optional)

### ✅ Documentation

- [x] **README.md** complete
- [x] **FEATURES.md** detailed
- [x] **DEPLOYMENT.md** clear
- [x] **TROUBLESHOOTING.md** helpful
- [x] **Comments** in complex code

### ✅ Deployment Configuration

- [x] **vercel.json** configured
- [x] **Build command** set: `bun run build`
- [x] **Output directory** set: `dist`
- [x] **Routing** configured (SPA rewrites)

## Launch Process

### 1. Final Local Test
```bash
# Clean build
rm -rf dist
bun run build

# Preview production build
bun run preview

# Open in browser: http://localhost:4173
# Test all functionality
```

### 2. Deploy to Vercel
```bash
# Install Vercel CLI (if not already)
bun add -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? N (first time)
# - Project name: valentine-app
# - Directory: ./ (current directory)
# - Override settings? N

# Wait for deployment...
# You'll get a URL: https://valentine-app-xxxx.vercel.app
```

### 3. Post-Deploy Verification
- [ ] Visit deployed URL
- [ ] Test all routes:
  - [ ] `/` (start page)
  - [ ] `/slideshow`
  - [ ] `/memory-game`
  - [ ] `/gallery`
- [ ] Refresh each page (verify routing works)
- [ ] Test on mobile device (real phone, not just DevTools)
- [ ] Check browser console for errors
- [ ] Verify images load
- [ ] Test full user flow (start to finish)

### 4. Performance Check
```bash
# Run Lighthouse audit
# Chrome DevTools > Lighthouse > Generate report

Target scores:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 80 (if SEO matters)
```

### 5. Share & Monitor
- [ ] Share URL with intended recipient
- [ ] Monitor Vercel analytics (optional)
- [ ] Check for any errors in Vercel logs
- [ ] Get feedback and iterate if needed

## Troubleshooting Launch Issues

### Images not loading on Vercel
```bash
# Verify images are in public/ directory
ls -la public/images/

# Check deployed site's network tab
# Ensure paths start with /images/ (not ./images/)
```

### Routing 404 errors
```bash
# Verify vercel.json exists with rewrites
cat vercel.json

# Should have:
# "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
```

### Build fails on Vercel
- Check Vercel build logs for error message
- Verify package.json scripts are correct
- Ensure TypeScript compiles locally first
- Check Node version (use 18+)

## Production Monitoring

After launch, monitor:

### Week 1
- [ ] Check for any error reports
- [ ] Monitor load times
- [ ] Verify all features working
- [ ] Get user feedback

### Ongoing
- [ ] Update dependencies monthly
- [ ] Check Vercel analytics
- [ ] Fix any reported issues
- [ ] Consider enhancements

## Rollback Plan

If something goes wrong:

```bash
# Vercel: Use previous deployment
# Go to Vercel dashboard > Deployments > Click previous deployment > Promote to Production

# Local: Revert git commits
git log
git revert <commit-hash>
git push
```

## Success Criteria

✅ **Launch is successful when**:
1. All routes accessible and functional
2. No console errors on any page
3. Mobile experience smooth
4. Load time < 2 seconds
5. User can complete full flow without issues
6. Images display correctly
7. Animations smooth and delightful

---

## Quick Launch Command

```bash
# One-line deploy
bun run build && vercel --prod
```

---

**Ready to launch? Let's make someone's Valentine's Day special! 💖**

Last updated: 2026-02-14
