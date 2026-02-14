You are an implementation agent in a tournament. Your job is to implement the
task below using the strategy described.

$ARGUMENTS

**Ultrathink and plan carefully before writing any code using the `react-frontend-architect` agent.** Build a single-page Valentine's Day react app with three sequential phases. The design should feel romantic and polished, with a $ARGUMENT style — think soft lavender purples, reds, warm tones, subtle animations, and maybe particle effects throughout.

---

## Starting page (Phase 1)

- Display a full-screen centered message: **"Would you be my valentine?"** in an elegant, romantic font.
- Show two buttons below the text:
  - **"Yes"** — always clickable, proceeds to the slideshow.
  - **"In your dreams!"** — when clicked, it smoothly transforms its label to **"Absolutely"** (with a cute animation like a shake or a bounce). Once it says "Absolutely," clicking it also proceeds to Phase 2.
- Add ambient romantic touches (floating hearts, sparkles, or a soft gradient background).

## Slideshow (Phase 2)

- Transition smoothly from Phase 1.
- Display ~10 images one at a time, each fading in, holding for ~3 seconds, then fading out before the next appears. Use placeholder images (use the images in @images/slideshow).
- After the **last image** fades in, instead of fading out, transition into a reveal: all 10 images reappear together arranged in a grid — this grid **is** the memory game board (Phase 3). Make this transition feel magical (e.g., images fly/scale into their grid positions).
- All images should have an aspect ratio of 16:9 if they were in landscape originally, or 9:16 if they were in portrait.

## Memory Game (Phase 3)

- Classic memory/matching game: the grid contains **pairs** of the 10 images (so 20 cards total, 4×5 or 5×4 grid).
- Cards start face-down with a romantic card-back design (heart pattern, etc.).
- On click, a card flips to reveal its image. Two cards can be flipped per turn:
  - If they match → they stay revealed (maybe with a sparkle/glow effect).
  - If they don't match → both flip back face-down after a short delay.
- Track and display the number of moves/attempts.
- **When all pairs are matched:** celebrate with a confetti or hearts animation, then fade in one final special image (@images/final_image.png) in the center of the screen with the closing romantic message "You will always be my chanchilove".

## Image Gallery

- Another page that shows all the images in a grid with 3 columns.

## Menu

- Use the @images/pig_animation.gif animation to add a menu at the top right corner.
- It should only be visible during the slideshow and the memory game.
- When clicked, a FAB menu should be expanded, that includes options to:
  - Restart the game (if user is currently on the memory game)
  - Navigate to the image gallery (available both on the slideshow and the memory game)
- Options should be icons, without labels

---

## Technical Notes

- Use `bun` for testing and everything `bun` can be used for
- Make it **mobile-responsive** (should look great on a phone screen since I'll likely share it via link).
- Use smooth CSS transitions/animations throughout. No jarring jumps between phases.
- Use elegant animations, no funny or clumsy ones.
- Use icons instead of emoticons where needed.
