/**
 * Image paths for the application
 */
const BASE_URL = import.meta.env.BASE_URL;

export const SLIDESHOW_IMAGES = Array.from(
  { length: 10 },
  (_, i) => `${BASE_URL}images/slideshow/${String(i + 1).padStart(3, '0')}.png`
);

export const FINAL_IMAGE = `${BASE_URL}images/final_image.png`;
export const PIG_ANIMATION = `${BASE_URL}images/pig_animation_3.gif`;

/**
 * Preload images for smooth transitions
 */
export const preloadImages = (imagePaths: string[]): Promise<void[]> => {
  return Promise.all(
    imagePaths.map(
      (src) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = src;
        })
    )
  );
};

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
