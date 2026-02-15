import { useState, useEffect } from 'react';
import { preloadImages } from '../utils/images';

/**
 * Hook to preload images before rendering
 */
export const useImagePreloader = (imagePaths: string[]) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    preloadImages(imagePaths)
      .then(() => setIsLoaded(true))
      .catch((err) => setError(err));
  }, [imagePaths]);

  return { isLoaded, error };
};
