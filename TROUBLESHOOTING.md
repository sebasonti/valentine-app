# Troubleshooting Guide

## Common Issues and Solutions

### Development Server

#### Issue: `bun run dev` fails to start
**Symptoms**: Error messages on startup, port conflicts

**Solutions**:
```bash
# Check if port 3000 is already in use
lsof -ti:3000

# Kill process on port 3000
kill -9 $(lsof -ti:3000)

# Or use a different port
vite --port 3001
```

#### Issue: Hot reload not working
**Symptoms**: Changes don't reflect in browser

**Solutions**:
1. Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
2. Restart dev server
3. Check console for errors
4. Verify file is saved

---

### Images

#### Issue: Images not displaying
**Symptoms**: Broken image icons, 404 errors in console

**Solutions**:
```bash
# Verify images exist
ls -la public/images/slideshow/

# Check image paths (must start with /)
# Correct: /images/slideshow/001.png
# Incorrect: images/slideshow/001.png

# Ensure images are in public directory
cp -r images/* public/images/
```

#### Issue: Images loading slowly
**Symptoms**: Long wait times, blank screens

**Solutions**:
1. Check image file sizes (compress if > 1MB)
2. Convert to WebP format for better compression
3. Verify network speed
4. Check browser console for errors

---

### Build Issues

#### Issue: Build fails with TypeScript errors
**Symptoms**: Red error messages during `bun run build`

**Solutions**:
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Common fixes:
# 1. Add missing type definitions
bun add -d @types/[package-name]

# 2. Ignore specific errors (last resort)
// @ts-ignore

# 3. Update tsconfig.json strictness
```

#### Issue: Build succeeds but app broken in production
**Symptoms**: Works in dev, fails in production build

**Solutions**:
1. Test production build locally:
```bash
bun run build
bun run preview
```

2. Check for environment-specific code
3. Verify all imports use correct case
4. Check browser console for errors

---

### Animations

#### Issue: Animations stuttering or laggy
**Symptoms**: Choppy motion, low frame rate

**Solutions**:
1. Check CPU usage (close other apps)
2. Reduce animation complexity
3. Use `will-change` CSS property:
```css
.animated-element {
  will-change: transform, opacity;
}
```

4. Enable hardware acceleration:
```css
transform: translateZ(0);
```

#### Issue: Animations not running
**Symptoms**: Elements appear instantly without animation

**Solutions**:
1. Check if `prefers-reduced-motion` is enabled:
```bash
# macOS: System Preferences > Accessibility > Display > Reduce motion
```

2. Verify Framer Motion version:
```bash
bun list framer-motion
```

3. Check browser console for errors

---

### Memory Game

#### Issue: Cards don't flip
**Symptoms**: Clicking cards has no effect

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify game state isn't locked (wait for previous flip to complete)
3. Clear browser cache
4. Check if `isMatched` state is preventing flips

#### Issue: Confetti not appearing
**Symptoms**: No confetti on match or victory

**Solutions**:
```bash
# Verify canvas-confetti is installed
bun list canvas-confetti

# Reinstall if missing
bun add canvas-confetti
```

Check browser console for:
- `confetti is not defined`
- CSP (Content Security Policy) errors

---

### Routing

#### Issue: 404 error on page refresh
**Symptoms**: Direct navigation to `/gallery` fails

**Solutions**:

**For Vercel**:
Create/verify `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**For Netlify**:
Create `_redirects` in `public/`:
```
/*    /index.html   200
```

**For local development**:
- Use dev server (handles this automatically)
- Don't open HTML files directly in browser

#### Issue: Navigation not working
**Symptoms**: Clicking links doesn't navigate

**Solutions**:
1. Verify `<BrowserRouter>` wraps entire app
2. Check React Router version compatibility
3. Use `<Link>` from react-router-dom, not `<a>`
4. Check browser console for errors

---

### Performance

#### Issue: Slow page load
**Symptoms**: Long loading times, blank screen

**Solutions**:
1. **Optimize images**:
```bash
# Install image optimization tool
bun add -d @squoosh/cli

# Optimize images
squoosh-cli --webp auto images/**/*.png
```

2. **Analyze bundle size**:
```bash
# Install bundle analyzer
bun add -d vite-plugin-bundle-analyzer

# Add to vite.config.ts
import { analyzer } from 'vite-plugin-bundle-analyzer'

export default defineConfig({
  plugins: [react(), analyzer()]
})
```

3. **Check network tab** in browser DevTools

#### Issue: High memory usage
**Symptoms**: Browser becomes sluggish, crashes

**Solutions**:
1. Close other browser tabs
2. Check for memory leaks in useEffect:
```typescript
useEffect(() => {
  const timer = setTimeout(...);
  return () => clearTimeout(timer); // Always cleanup!
}, []);
```

3. Limit number of floating hearts
4. Restart browser

---

### Mobile Issues

#### Issue: Touch events not working
**Symptoms**: Buttons don't respond to taps on mobile

**Solutions**:
1. Ensure tap targets are ≥ 48×48px
2. Check for hover-only states
3. Add touch event handlers if needed:
```typescript
onTouchStart={(e) => {
  e.preventDefault();
  handleClick();
}}
```

#### Issue: Layout broken on mobile
**Symptoms**: Elements overflow, incorrect sizing

**Solutions**:
1. Test in responsive mode (F12 → Toggle device toolbar)
2. Check viewport meta tag in `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

3. Verify media queries in CSS:
```css
@media (max-width: 640px) {
  /* Mobile styles */
}
```

---

### Browser Compatibility

#### Issue: App doesn't work in older browsers
**Symptoms**: Blank page, console errors

**Solutions**:
1. Check browser version:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

2. Add polyfills if needed:
```bash
bun add core-js
```

3. Update Vite target in `vite.config.ts`:
```typescript
export default defineConfig({
  build: {
    target: 'es2015' // For wider compatibility
  }
})
```

---

### Deployment Issues

#### Issue: Deploy fails on Vercel/Netlify
**Symptoms**: Build errors in deployment logs

**Solutions**:
1. **Set build command**: `bun run build`
2. **Set publish directory**: `dist`
3. **Check Node version**: Use 18+ or Bun runtime
4. **Environment variables**: None required for this app

#### Issue: Images 404 after deployment
**Symptoms**: Images work locally but not in production

**Solutions**:
1. Verify images are in `public/` directory
2. Check deployed site's network tab for actual paths
3. Ensure paths start with `/` (absolute paths)
4. Clear CDN cache (Vercel dashboard → Deployments → Clear cache)

---

## Debug Checklist

When something isn't working:

1. ✅ Check browser console for errors
2. ✅ Check network tab for failed requests
3. ✅ Verify environment (dev vs production)
4. ✅ Clear browser cache
5. ✅ Restart dev server
6. ✅ Check TypeScript errors: `npx tsc --noEmit`
7. ✅ Verify dependencies installed: `bun install`
8. ✅ Check file paths (case-sensitive)
9. ✅ Test in different browser
10. ✅ Check browser version compatibility

---

## Getting Help

Still stuck? Gather this information:

1. **Error message** (full text from console)
2. **Browser & version** (Chrome 120, Safari 17, etc.)
3. **Operating system** (macOS 14, Windows 11, etc.)
4. **Steps to reproduce** (what did you do?)
5. **Expected vs actual behavior**
6. **Screenshots** (if applicable)

### Useful Debug Commands

```bash
# Show all installed packages
bun list

# Check for outdated packages
bun outdated

# Clear all caches
rm -rf node_modules .cache dist
bun install

# Test production build locally
bun run build && bun run preview

# Check bundle size
bun run build --report

# Verify TypeScript
npx tsc --noEmit

# Lint files (if ESLint configured)
npx eslint src/
```

---

## Prevention Tips

Avoid issues before they happen:

1. **Always test locally before deploying**
2. **Use TypeScript strictly** (catches errors early)
3. **Test in multiple browsers** (Chrome, Safari, Firefox)
4. **Test on mobile device** (not just responsive mode)
5. **Monitor bundle size** (keep under 500KB)
6. **Keep dependencies updated** (but test after updating)
7. **Use Git** (easy to revert changes)
8. **Read error messages carefully** (they usually tell you the issue)

---

## Known Limitations

This app intentionally:
- Requires JavaScript (no SSR)
- Requires modern browser (ES2020+)
- Does not support IE11
- Requires network connection (no offline mode)
- Images must be provided (no placeholders)
- Works best on devices with mouse/touch
- Requires sufficient memory for images
