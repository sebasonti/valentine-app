# Valentine's Day React App

A beautiful, minimalist Valentine's Day single-page application built with React, TypeScript, and Framer Motion.

## Features

### Phase 1 - Starting Page
- Elegant full-screen romantic message
- Interactive button animations
- Floating hearts background
- Mouse-tracking sparkle effects

### Phase 2 - Slideshow
- Sequential display of 10 images with smooth fade transitions
- Maintains aspect ratio for both landscape and portrait images
- Magical transition from last image to memory game grid
- Progress indicator

### Phase 3 - Memory Game
- Classic matching game with 20 cards (10 pairs)
- Flip animations with 3D transforms
- Match detection with sparkle effects
- Victory confetti celebration
- Final reveal with romantic message

### Additional Features
- **Image Gallery**: View all images in a 3-column grid with modal view
- **FAB Menu**: Floating action button with pig animation GIF
  - Navigate to gallery
  - Restart game (on memory game page)
- **Mobile Responsive**: Optimized for all screen sizes
- **Smooth Animations**: Elegant transitions throughout

## Design Aesthetic

**Refined Romantic Minimalism**
- Soft lavender purples and warm blush tones
- Cormorant Garamond display font paired with Outfit sans-serif
- Generous white space with subtle gradients
- Delicate particle effects and gentle motion
- Accessibility-first approach with reduced motion support

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Effects**: Canvas Confetti
- **Styling**: CSS Modules

## Getting Started

### Prerequisites
- Bun installed on your system

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

The app will be available at `http://localhost:3000`

## Project Structure

```
agent-2/
├── src/
│   ├── components/
│   │   ├── FloatingHearts.tsx          # Ambient heart animations
│   │   ├── FloatingHearts.module.css
│   │   ├── FABMenu.tsx                 # Floating action button menu
│   │   └── FABMenu.module.css
│   ├── pages/
│   │   ├── StartPage.tsx               # Phase 1: Initial question
│   │   ├── StartPage.module.css
│   │   ├── SlideshowPage.tsx           # Phase 2: Image slideshow
│   │   ├── SlideshowPage.module.css
│   │   ├── MemoryGamePage.tsx          # Phase 3: Memory matching game
│   │   ├── MemoryGamePage.module.css
│   │   ├── GalleryPage.tsx             # Image gallery
│   │   └── GalleryPage.module.css
│   ├── hooks/
│   │   └── useImagePreloader.ts        # Image preloading hook
│   ├── utils/
│   │   └── images.ts                   # Image utilities & paths
│   ├── App.tsx                         # Main app with routing
│   ├── main.tsx                        # Entry point
│   └── index.css                       # Global styles & CSS variables
├── public/
│   └── images/
│       ├── slideshow/                  # 001.png - 010.png
│       ├── final_image.png
│       └── pig_animation.gif
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Key Implementation Details

### Component Architecture
- **Functional components** with React hooks
- **CSS Modules** for scoped styling
- **Custom hooks** for reusable logic (image preloading)
- **Type-safe** with TypeScript interfaces

### State Management
- Local component state with `useState`
- Proper dependency management in `useEffect`
- Ref usage for transient values

### Performance Optimizations
- Image preloading before rendering
- Lazy loading with React Router
- CSS-only animations where possible
- Framer Motion for complex orchestrated animations
- Proper cleanup of timers and effects

### Accessibility
- Semantic HTML elements
- Keyboard navigation support
- Focus indicators on interactive elements
- Reduced motion support via media query
- ARIA attributes where needed

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Clamp() for fluid typography
- Touch-friendly interactive elements
- Optimized spacing for different screen sizes

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## License

Private project for personal use.
