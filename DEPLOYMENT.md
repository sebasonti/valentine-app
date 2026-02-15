# Deployment Guide

## Quick Deploy to Vercel

The easiest way to deploy this app is using Vercel:

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel
```

Follow the prompts to complete the deployment.

## Build for Production

```bash
# Create optimized production build
bun run build

# Preview production build locally
bun run preview
```

The build output will be in the `dist/` directory.

## Environment Requirements

- Node.js 18+ or Bun runtime
- Modern browser support (ES2020+)
- Static file hosting

## Hosting Options

### 1. Vercel (Recommended)
- Zero configuration
- Automatic HTTPS
- CDN distribution
- Perfect for React apps

### 2. Netlify
```bash
# Build command
bun run build

# Publish directory
dist
```

### 3. GitHub Pages
Add to `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
});
```

### 4. Any Static Host
Upload the `dist/` folder contents to:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Firebase Hosting

## Performance Optimizations

### Already Implemented
- Image preloading
- CSS Modules for code splitting
- Lazy route loading via React Router
- Framer Motion tree-shaking
- Optimized bundle size

### Optional Enhancements
1. **Image Optimization**: Convert images to WebP format
2. **Service Worker**: Add PWA capabilities for offline support
3. **Lighthouse Score**: Run audit and optimize further
4. **Analytics**: Add usage tracking if needed

## SEO & Meta Tags

Add to `index.html` for better sharing:

```html
<meta property="og:title" content="Will you be my valentine?" />
<meta property="og:description" content="A romantic Valentine's Day experience" />
<meta property="og:image" content="/images/final_image.png" />
<meta name="twitter:card" content="summary_large_image" />
```

## Security Considerations

- No sensitive data in client-side code
- All assets served over HTTPS in production
- No external API calls (fully client-side)
- Content Security Policy headers recommended

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Monitoring

After deployment, monitor:
- Page load times (target: < 2s)
- Largest Contentful Paint (target: < 2.5s)
- First Input Delay (target: < 100ms)
- Cumulative Layout Shift (target: < 0.1)

## Troubleshooting

### Images not loading
- Verify images are in `public/images/` directory
- Check browser console for 404 errors
- Ensure image paths start with `/images/`

### Routing issues (404 on refresh)
Add to `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Or for Netlify, create `_redirects`:
```
/*    /index.html   200
```

### Build errors
- Clear node_modules and reinstall: `rm -rf node_modules && bun install`
- Check TypeScript errors: `bun run tsc --noEmit`
- Verify all dependencies are installed
