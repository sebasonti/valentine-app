# Application Flow

## User Journey

```
┌─────────────────────────────────────────────────────────────┐
│                      START PAGE (/)                          │
│  "Would you be my valentine?"                               │
│                                                             │
│  [Yes]  [In your dreams! → Absolutely]                     │
│                                                             │
│  • Floating hearts background                              │
│  • Sparkle trail on mouse movement                         │
│  • Both buttons lead to slideshow                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓ (Click either button)
┌─────────────────────────────────────────────────────────────┐
│                   SLIDESHOW PAGE                            │
│                  /slideshow                                 │
│                                                             │
│  [Image 1] → [Image 2] → ... → [Image 10]                 │
│                                                             │
│  • Each image shows for 3 seconds                          │
│  • Fade in/out transitions (800ms)                         │
│  • Progress bar at bottom (1/10 → 10/10)                   │
│  • FAB menu (top right): 🐷                               │
│    ├─ Gallery icon                                         │
│                                                             │
│  After Image 10:                                           │
│  [All 10 images animate into grid layout]                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓ (Automatic transition)
┌─────────────────────────────────────────────────────────────┐
│                   MEMORY GAME PAGE                          │
│                  /memory-game                               │
│                                                             │
│  "Find the Matching Pairs"    Moves: 0                     │
│                                                             │
│  ┌───┬───┬───┬───┬───┐                                    │
│  │ ♥ │ ♥ │ ♥ │ ♥ │ ♥ │  20 Cards (10 pairs)            │
│  ├───┼───┼───┼───┼───┤                                    │
│  │ ♥ │ ♥ │ ♥ │ ♥ │ ♥ │  Grid: 5×4 (desktop)             │
│  ├───┼───┼───┼───┼───┤        4×5 (tablet)                │
│  │ ♥ │ ♥ │ ♥ │ ♥ │ ♥ │        3×n (mobile)               │
│  ├───┼───┼───┼───┼───┤                                    │
│  │ ♥ │ ♥ │ ♥ │ ♥ │ ♥ │                                    │
│  └───┴───┴───┴───┴───┘                                    │
│                                                             │
│  • Click to flip cards (3D rotation)                       │
│  • Match: Cards stay revealed + sparkle confetti           │
│  • No match: Cards flip back after 1.2s                    │
│  • Move counter increments                                 │
│  • FAB menu: 🐷                                           │
│    ├─ Gallery icon                                         │
│    └─ Restart icon                                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓ (All pairs matched)
┌─────────────────────────────────────────────────────────────┐
│                    VICTORY SCREEN                           │
│               (Overlay on Memory Game)                      │
│                                                             │
│  🎊 Confetti explosion from both sides 🎊                  │
│                                                             │
│  ╔═══════════════════════════════════╗                     │
│  ║   [Final Image Displayed]        ║                     │
│  ║                                   ║                     │
│  ║   "You will always be my          ║                     │
│  ║        chanchilove"               ║                     │
│  ╚═══════════════════════════════════╝                     │
│                                                             │
│  • Fades in after 2 seconds                                │
│  • Continues confetti for 3 seconds                        │
└─────────────────────────────────────────────────────────────┘

                    AVAILABLE ANYTIME ↓

┌─────────────────────────────────────────────────────────────┐
│                    GALLERY PAGE                             │
│                    /gallery                                 │
│                                                             │
│  ← Back     "Our Memories"                                 │
│                                                             │
│  ┌─────────┬─────────┬─────────┐                          │
│  │ Image 1 │ Image 2 │ Image 3 │                          │
│  ├─────────┼─────────┼─────────┤  3-column grid           │
│  │ Image 4 │ Image 5 │ Image 6 │  2-column (tablet)       │
│  ├─────────┼─────────┼─────────┤  1-column (mobile)       │
│  │ Image 7 │ Image 8 │ Image 9 │                          │
│  ├─────────┴─────────┼─────────┤                          │
│  │    Image 10       │         │                          │
│  └───────────────────┴─────────┘                          │
│                                                             │
│  • Click any image for full-screen modal view              │
│  • Hover shows overlay with "View" text                    │
│  • Modal: Click outside or close button to dismiss         │
└─────────────────────────────────────────────────────────────┘
```

## Navigation Map

```
           Start Page (/)
                │
                ├─ Yes button ────────┐
                │                      │
                └─ Absolutely button ──┤
                                       ↓
                              Slideshow (/slideshow)
                                       │
                                       ├─ Auto-advance through images
                                       ↓
                              Memory Game (/memory-game)
                                       │
                                       ├─ Complete all matches
                                       ↓
                              Victory Screen (overlay)

           FAB Menu (available on Slideshow & Memory Game):
                ├─ Gallery Icon → Gallery Page (/gallery)
                └─ Restart Icon → Reset Memory Game
```

## State Transitions

### Start Page
```
Initial State:
  - Button: "In your dreams!"

Click "In your dreams!":
  - Transform to: "Absolutely"
  - Animation: 800ms rotation + scale

Click "Absolutely" or "Yes":
  - Navigate to: /slideshow
```

### Slideshow
```
State Flow:
  1. Loading → Preload images
  2. Show Image 1 (3s)
  3. Fade out → Fade in Image 2 (3s)
  4. ... repeat until Image 10
  5. After Image 10 holds (3s)
  6. Trigger grid animation
  7. Navigate to: /memory-game
```

### Memory Game
```
Initial State:
  - 20 cards face-down
  - Moves: 0
  - Matched: 0/10

Game Loop:
  1. Click Card A → Flip to reveal
  2. Click Card B → Flip to reveal
  3. Check match:
     - Match: Keep revealed + confetti + increment matched
     - No match: Flip back after 1.2s
  4. Increment moves
  5. Repeat until matched === 10

Victory State:
  - Trigger confetti (3s continuous)
  - Show final image + message (after 2s)
```

## Component Hierarchy

```
App (Router)
├── StartPage
│   ├── FloatingHearts
│   └── Sparkles (dynamic)
│
├── SlideshowPage
│   ├── FABMenu
│   └── ProgressBar
│
├── MemoryGamePage
│   ├── FABMenu
│   ├── Card Grid
│   └── Victory Overlay (conditional)
│       └── Final Image + Message
│
└── GalleryPage
    ├── Back Button
    ├── Image Grid
    └── Modal (conditional)
```

## Animation Timeline

### Page Load (Start Page)
```
0ms     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
300ms   FloatingHearts fade in
500ms   Title fade in from below
800ms   Buttons fade + scale in
1200ms  Subtitle fade in
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Slideshow Transition
```
0ms     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        Image N visible (opacity: 1)

        Wait 3000ms

3000ms  Image N fade out (800ms)
3400ms  Image N+1 fade in (800ms, overlap)
3800ms  Image N+1 fully visible
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Card Flip
```
0ms     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        Card face-down (rotateY: 0deg)

Click →

0ms     Flip animation (rotateY: 0 → 180deg)
600ms   Card face-up (rotateY: 180deg)

If no match:
1800ms  Flip back (rotateY: 180 → 0deg)
2400ms  Card face-down
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Responsive Behavior

### Breakpoints
```
Mobile (≤ 640px):
  - Start Page: Stack buttons vertically
  - Slideshow: Full width images
  - Memory Game: 3-column grid
  - Gallery: 1-column grid
  - FAB: 64px size

Tablet (641-1024px):
  - Memory Game: 4×5 grid
  - Gallery: 2-column grid
  - FAB: 72px size

Desktop (> 1024px):
  - Memory Game: 5×4 grid
  - Gallery: 3-column grid
  - FAB: 80px size
```

## Performance Metrics

```
Target Performance:
├─ Time to Interactive: < 2s
├─ First Contentful Paint: < 1s
├─ Largest Contentful Paint: < 2.5s
├─ Cumulative Layout Shift: < 0.1
└─ Total Bundle Size: ~380KB (120KB gzipped)

Optimization Strategies:
├─ Image preloading (prevents jank)
├─ CSS Modules (automatic code splitting)
├─ Framer Motion (tree-shakeable)
└─ Lazy route loading (React Router)
```
