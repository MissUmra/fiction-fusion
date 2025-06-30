import React from 'react';
import { motion } from 'framer-motion';

const CharacterCollage: React.FC = () => {
  const characters = [
    { emoji: '⚡', name: 'Pikachu', category: 'Pokemon' },
    { emoji: '⌚', name: 'Ben 10', category: 'Ben 10' },
    { emoji: '🎯', name: 'Eli Shane', category: 'Slugterra' },
    { emoji: '❄️', name: 'Elsa', category: 'Frozen' },
    { emoji: '🤖', name: 'Iron Man', category: 'Marvel' },
    { emoji: '🔍', name: 'Sherlock', category: 'Detective' },
    { emoji: '🐭', name: 'Geronimo', category: 'Adventure' },
    { emoji: '💖', name: 'Barbie', category: 'Fashion' },
    { emoji: '🧜‍♀️', name: 'Ariel', category: 'Disney' },
    { emoji: '🚛', name: 'Optimus', category: 'Transformers' },
    { emoji: '⚡', name: 'Harry Potter', category: 'Magic' },
    { emoji: '🍜', name: 'Naruto', category: 'Anime' },
    { emoji: '🦁', name: 'Simba', category: 'Disney' },
    { emoji: '🕷️', name: 'Spider-Man', category: 'Marvel' },
    { emoji: '👸', name: 'Rapunzel', category: 'Disney' },
    { emoji: '🐉', name: 'Dragon', category: 'Fantasy' },
    { emoji: '🦸‍♂️', name: 'Superman', category: 'DC' },
    { emoji: '🧙‍♂️', name: 'Gandalf', category: 'LOTR' },
    { emoji: '🏴‍☠️', name: 'Luffy', category: 'One Piece' },
    { emoji: '🔥', name: 'Natsu', category: 'Fairy Tail' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {characters.map((character, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl md:text-6xl"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          title={`${character.name} from ${character.category}`}
        >
          {character.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default CharacterCollage;