import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from '../components/FloatingHearts';
import styled from './StartPage.module.css';

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const [noButtonState, setNoButtonState] = useState<'initial' | 'transformed'>('initial');
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleYesClick = () => {
    navigate('/slideshow');
  };

  const handleNoClick = () => {
    if (noButtonState === 'initial') {
      setNoButtonState('transformed');
    } else {
      navigate('/slideshow');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (Math.random() > 0.95) {
      const newSparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setSparkles((prev) => [...prev.slice(-10), newSparkle]);
    }
  };

  return (
    <div className={styled.container} onMouseMove={handleMouseMove}>
      <FloatingHearts count={15} />

      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className={styled.sparkle}
            initial={{ opacity: 1, scale: 0, x: sparkle.x, y: sparkle.y }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        className={styled.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.h1
          className={styled.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Would you be my valentine?
        </motion.h1>

        <motion.div
          className={styled.buttonContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className={`${styled.button} ${styled.yesButton}`}
            onClick={handleYesClick}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Yes
          </motion.button>

          <AnimatePresence mode="wait">
            {noButtonState === 'initial' ? (
              <motion.button
                key="no"
                className={`${styled.button} ${styled.noButton}`}
                onClick={handleNoClick}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8, rotateZ: 180 }}
                transition={{ duration: 0.5 }}
              >
                In your dreams!
              </motion.button>
            ) : (
              <motion.button
                key="absolutely"
                className={`${styled.button} ${styled.absolutelyButton}`}
                onClick={handleNoClick}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8, rotateZ: -180 }}
                animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                transition={{
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
              >
                Absolutely
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          className={styled.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Choose wisely...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default StartPage;
