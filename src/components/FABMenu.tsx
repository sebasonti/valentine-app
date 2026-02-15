import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PIG_ANIMATION } from '../utils/images';
import styled from './FABMenu.module.css';

interface FABMenuProps {
  showRestart?: boolean;
  onRestart?: () => void;
  showFinalMessage?: boolean;
  onShowFinalMessage?: () => void;
}

const FABMenu: React.FC<FABMenuProps> = ({
  showRestart = false,
  onRestart,
  showFinalMessage = false,
  onShowFinalMessage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleGallery = () => {
    navigate('/gallery');
    setIsOpen(false);
  };

  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    }
    setIsOpen(false);
  };

  const handleFinalMessage = () => {
    if (onShowFinalMessage) {
      onShowFinalMessage();
    }
    setIsOpen(false);
  };

  const handleStartPage = () => {
    navigate('/');
    setIsOpen(false);
  };

  return (
    <div className={styled.container}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styled.menuItems}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className={styled.menuItem}
              onClick={handleGallery}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="View Gallery"
            >
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
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </motion.button>

            {showRestart && (
              <motion.button
                className={styled.menuItem}
                onClick={handleRestart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Restart Game"
              >
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
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </motion.button>
            )}

            {onShowFinalMessage && (
              <motion.button
                className={styled.menuItem}
                onClick={handleFinalMessage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Show Final Message"
              >
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
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </motion.button>
            )}

            {showFinalMessage && (
              <motion.button
                className={styled.menuItem}
                onClick={handleStartPage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Back to Start"
              >
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
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={styled.fab}
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <img src={PIG_ANIMATION} alt="Menu" className={styled.pigImage} />
      </motion.button>
    </div>
  );
};

export default FABMenu;
