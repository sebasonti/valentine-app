import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SLIDESHOW_IMAGES } from '../utils/images';
import { useImagePreloader } from '../hooks/useImagePreloader';
import styled from './GalleryPage.module.css';

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoaded } = useImagePreloader(SLIDESHOW_IMAGES);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (!isLoaded) {
    return (
      <div className={styled.container}>
        <motion.div
          className={styled.loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={styled.loadingText}>Loading gallery...</div>
          <div className={styled.loadingHeart}>♥</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styled.container}>
      <motion.header
        className={styled.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button onClick={handleBack} className={styled.backButton}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className={styled.title}>Our Memories</h1>
      </motion.header>

      <motion.div
        className={styled.grid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {SLIDESHOW_IMAGES.map((image, index) => (
          <motion.div
            key={index}
            className={styled.gridItem}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -4 }}
            onClick={() => handleImageClick(image)}
          >
            <img src={image} alt={`Memory ${index + 1}`} className={styled.gridImage} />
            <div className={styled.overlay}>
              <span className={styled.viewText}>View</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styled.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className={styled.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Full view" className={styled.modalImage} />
              <button onClick={handleCloseModal} className={styled.closeButton}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
