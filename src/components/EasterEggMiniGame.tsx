import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';

interface EasterEggMiniGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const EasterEggMiniGame: React.FC<EasterEggMiniGameProps> = ({ isOpen, onClose }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameActive, setGameActive] = useState(false);
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);

  const characterEmojis = ['🎭', '👑', '⚡', '🌟', '🎪', '🎨', '🎬', '🦸', '🧙', '👸', '🤖', '👻', '🦄', '🐉'];

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [gameActive, timeLeft]);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        const newTarget = {
          id: Date.now(),
          x: Math.random() * 75 + 10,
          y: Math.random() * 60 + 15,
          emoji: characterEmojis[Math.floor(Math.random() * characterEmojis.length)]
        };
        setTargets(prev => [...prev, newTarget]);
        
        setTimeout(() => {
          setTargets(prev => prev.filter(t => t.id !== newTarget.id));
        }, 3000);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameActive]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setGameActive(true);
    setTargets([]);
  };

  const hitTarget = (targetId: number) => {
    setScore(prev => prev + 10);
    setTargets(prev => prev.filter(t => t.id !== targetId));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-dark-500 rounded-3xl max-w-lg w-full relative shadow-2xl border border-primary-500/20 overflow-hidden"
            style={{ height: '600px', maxHeight: '90vh' }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-primary-500/20 rounded-full transition-colors z-20"
            >
              <X className="w-5 h-5 text-secondary-500" />
            </button>

            <div className="p-8 h-full flex flex-col">
              <div className="text-center mb-6 flex-shrink-0">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <Star className="w-8 h-8 text-dark-900" />
                </motion.div>
                <h2 className="text-2xl font-bold text-secondary-500 mb-2">
                  🎯 Character Catcher!
                </h2>
                <p className="text-sm text-secondary-500/80">
                  Catch the floating characters before they disappear!
                </p>
              </div>

              <div className="flex-1 flex flex-col min-h-0">
                {!gameActive && timeLeft === 15 ? (
                  <div className="text-center flex-1 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-dark-900 rounded-xl hover:shadow-lg transition-all duration-300 text-lg font-semibold"
                    >
                      🎮 Start Game
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex justify-between items-center mb-4 flex-shrink-0">
                      <div className="text-lg font-bold text-secondary-500">
                        Score: {score}
                      </div>
                      <div className="text-lg font-bold text-secondary-500">
                        Time: {timeLeft}s
                      </div>
                    </div>

                    <div className="relative flex-1 bg-gradient-to-br from-dark-900 via-dark-500 to-dark-900 rounded-2xl overflow-hidden border-2 border-primary-500/30 shadow-inner min-h-0">
                      {targets.map((target) => (
                        <motion.button
                          key={target.id}
                          initial={{ scale: 0, rotate: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          exit={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1.2 }}
                          onClick={() => hitTarget(target.id)}
                          className="absolute w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-xl hover:shadow-lg transition-all duration-200 border-2 border-secondary-500 shadow-md"
                          style={{ left: `${target.x}%`, top: `${target.y}%` }}
                        >
                          {target.emoji}
                        </motion.button>
                      ))}
                      
                      {gameActive && (
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                          <div className="text-center text-secondary-500/60 text-base font-medium">
                            Click the characters! 🎭
                          </div>
                        </div>
                      )}
                    </div>

                    {!gameActive && timeLeft === 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mt-4 flex-shrink-0"
                      >
                        <p className="text-xl font-bold text-secondary-500 mb-3">
                          🎉 Game Over! Final Score: {score}
                        </p>
                        <div className="mb-3">
                          <p className="text-base text-secondary-500/80">
                            {score >= 100 ? "🏆 Amazing! You're a Character Master!" :
                             score >= 50 ? "⭐ Great job! You caught many characters!" :
                             "🎯 Good try! Practice makes perfect!"}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={startGame}
                          className="px-5 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-dark-900 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                        >
                          🔄 Play Again
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEggMiniGame;