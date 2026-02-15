import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SLIDESHOW_IMAGES } from '../utils/images';
import { useImagePreloader } from '../hooks/useImagePreloader';
import FABMenu from '../components/FABMenu';
import styled from './SlideshowPage.module.css';

const SlideshowPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoaded } = useImagePreloader(SLIDESHOW_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    if (!isLoaded || isTransitioning) return;

    // Show each image for 3 seconds
    const timer = setTimeout(() => {
      if (currentIndex < SLIDESHOW_IMAGES.length - 1) {
        setIsTransitioning(true);
      } else {
        // Last image - transition to grid
        setTimeout(() => {
          setShowGrid(true);
        }, 3000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, isLoaded, isTransitioning]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (showGrid) {
      const timer = setTimeout(() => {
        navigate('/memory-game');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showGrid, navigate]);

  if (!isLoaded) {
    return (
      <div className={styled.container}>
        <motion.div
          className={styled.loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styled.loadingText}>Loading memories...</div>
          <div className={styled.loadingHeart}>♥</div>
        </motion.div>
      </div>
    );
  }

  if (showGrid) {
    return (
      <div className={styled.container}>
        <FABMenu />
        <motion.div
          className={styled.gridContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {SLIDESHOW_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              className={styled.gridItem}
              initial={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                opacity: index === currentIndex ? 1 : 0,
              }}
              animate={{
                position: 'relative',
                top: 'auto',
                left: 'auto',
                transform: 'translate(0, 0)',
                width: '100%',
                height: '100%',
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            >
              <img src={image} alt={`Memory ${index + 1}`} className={styled.gridImage} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styled.container}>
      <FABMenu />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={styled.imageContainer}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={SLIDESHOW_IMAGES[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className={styled.image}
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        className={styled.progress}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className={styled.progressBar}>
          <motion.div
            className={styled.progressFill}
            initial={{ width: '0%' }}
            animate={{ width: `${((currentIndex + 1) / SLIDESHOW_IMAGES.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className={styled.progressText}>
          {currentIndex + 1} / {SLIDESHOW_IMAGES.length}
        </div>
      </motion.div>
    </div>
  );
};

export default SlideshowPage;
