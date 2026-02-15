import { motion } from 'framer-motion';
import { useMemo } from 'react';
import styled from './FloatingHearts.module.css';

interface FloatingHeartsProps {
  count?: number;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 12 }) => {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 20 + 10,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
        opacity: Math.random() * 0.3 + 0.1,
      })),
    [count]
  );

  return (
    <div className={styled.container}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className={styled.heart}
          initial={{ y: '100vh', x: `${heart.left}vw`, opacity: 0 }}
          animate={{
            y: '-10vh',
            x: `${heart.left + Math.sin(heart.id) * 10}vw`,
            opacity: [0, heart.opacity, heart.opacity, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            fontSize: `${heart.size}px`,
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
