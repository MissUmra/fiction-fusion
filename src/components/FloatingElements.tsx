import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements: React.FC = () => {
  const elements = [
    { emoji: '⚡', delay: 0, x: '10%', y: '20%' }, // Pokemon
    { emoji: '⌚', delay: 1, x: '80%', y: '10%' }, // Ben 10
    { emoji: '❄️', delay: 2, x: '20%', y: '80%' }, // Frozen
    { emoji: '🤖', delay: 3, x: '90%', y: '70%' }, // Marvel
    { emoji: '🔍', delay: 4, x: '60%', y: '30%' }, // Sherlock
    { emoji: '🧜‍♀️', delay: 5, x: '30%', y: '60%' }, // Mermaid
    { emoji: '🎭', delay: 6, x: '70%', y: '15%' }, // Theater
    { emoji: '🦸‍♂️', delay: 7, x: '15%', y: '50%' }, // Superhero
    { emoji: '🏰', delay: 8, x: '85%', y: '40%' }, // Disney
    { emoji: '🐉', delay: 9, x: '40%', y: '85%' }, // Dragon
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-30"
          style={{ left: element.x, top: element.y }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;