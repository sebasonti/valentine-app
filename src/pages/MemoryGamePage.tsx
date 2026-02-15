import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SLIDESHOW_IMAGES, FINAL_IMAGE } from '../utils/images';
import { shuffleArray } from '../utils/images';
import { useImagePreloader } from '../hooks/useImagePreloader';
import FABMenu from '../components/FABMenu';
import styled from './MemoryGamePage.module.css';

interface Card {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGamePage: React.FC = () => {
  const { isLoaded } = useImagePreloader([...SLIDESHOW_IMAGES, FINAL_IMAGE]);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showFinalImage, setShowFinalImage] = useState(false);

  const initializeGame = useCallback(() => {
    const cardPairs = SLIDESHOW_IMAGES.slice(0, 6).flatMap((image, index) => [
      { id: index * 2, imageUrl: image, isFlipped: false, isMatched: false },
      {
        id: index * 2 + 1,
        imageUrl: image,
        isFlipped: false,
        isMatched: false,
      },
    ]);
    setCards(shuffleArray(cardPairs));
    setFlippedCards([]);
    setMoves(0);
    setIsComplete(false);
    setShowFinalImage(false);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      initializeGame();
    }
  }, [isLoaded, initializeGame]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard && secondCard && firstCard.imageUrl === secondCard.imageUrl) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second ? { ...card, isMatched: true } : card
            )
          );
          setFlippedCards([]);

          // Sparkle effect
          const card = document.querySelector(`[data-card-id="${first}"]`);
          if (card) {
            const rect = card.getBoundingClientRect();
            confetti({
              particleCount: 20,
              spread: 40,
              origin: {
                x: (rect.left + rect.width / 2) / window.innerWidth,
                y: (rect.top + rect.height / 2) / window.innerHeight,
              },
              colors: ['#E8DAEF', '#FFC5C5', '#FDA4AF'],
              shapes: ['circle'],
              scalar: 0.8,
            });
          }
        }, 800);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1200);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsComplete(true);

      // Victory confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#E8DAEF', '#FFC5C5', '#FDA4AF', '#FB7185'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#E8DAEF', '#FFC5C5', '#FDA4AF', '#FB7185'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      setTimeout(() => {
        setShowFinalImage(true);
      }, 2000);
    }
  }, [cards]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isMatched) return;

    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );
    setFlippedCards((prev) => [...prev, cardId]);
  };

  const handleShowFinalMessage = () => {
    setShowFinalImage(true);
  };

  if (!isLoaded) {
    return (
      <div className={styled.container}>
        <motion.div
          className={styled.loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={styled.loadingText}>Preparing game...</div>
          <div className={styled.loadingHeart}>♥</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styled.container}>
      <FABMenu
        showRestart
        onRestart={initializeGame}
        showFinalMessage={showFinalImage}
        onShowFinalMessage={handleShowFinalMessage}
      />

      <AnimatePresence>
        {showFinalImage && (
          <motion.div
            className={styled.finalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className={styled.finalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={FINAL_IMAGE}
                alt="Final message"
                className={styled.finalImage}
              />
              <motion.h2
                className={styled.finalMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                I love you so, chanchilove
              </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showFinalImage && (
        <>
          <motion.div
            className={styled.header}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styled.title}>Find the Matching Pairs</h2>
            <div className={styled.moves}>Moves: {moves}</div>
          </motion.div>

          <motion.div
            className={styled.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className={styled.cardWrapper}
                data-card-id={card.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
              >
                <motion.div
                  className={`${styled.card} ${
                    card.isFlipped || card.isMatched ? styled.flipped : ""
                  }`}
                  onClick={() => handleCardClick(card.id)}
                  whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                  whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
                  animate={{
                    rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                    opacity: 1,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={styled.cardFront}>
                    <div className={styled.heartPattern}>♥</div>
                  </div>
                  <div className={styled.cardBack}>
                    <img
                      src={card.imageUrl}
                      alt="Card"
                      className={styled.cardImage}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default MemoryGamePage;
