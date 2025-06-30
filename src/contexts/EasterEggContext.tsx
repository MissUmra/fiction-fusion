import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Gift, Zap, Heart, Trophy, Sparkles, Crown, Diamond, Gem, Rocket, Wand2, Shield } from 'lucide-react';
import { darkTheme } from '../utils/colors';

interface EasterEgg {
  id: string;
  x: number;
  y: number;
  icon: React.ComponentType<any>;
  color: string;
  reward: string;
  page: string;
}

interface EasterEggContextType {
  foundEggs: string[];
  totalEggs: number;
  isVictoryShown: boolean;
  findEgg: (eggId: string) => void;
  closeVictory: () => void;
  currentPageEggs: EasterEgg[];
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

export const useEasterEgg = () => {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error('useEasterEgg must be used within an EasterEggProvider');
  }
  return context;
};

// 50 unique Easter eggs with different icons and rewards across all pages
const EASTER_EGGS: EasterEgg[] = [
  // Home page eggs (8 eggs)
  { id: 'egg-1', x: 15, y: 25, icon: Star, color: '#FFD700', reward: 'Golden Star Badge', page: 'home' },
  { id: 'egg-2', x: 85, y: 70, icon: Gift, color: '#FF69B4', reward: 'Mystery Box Avatar', page: 'home' },
  { id: 'egg-3', x: 45, y: 15, icon: Sparkles, color: '#9C27B0', reward: 'Magic Sparkles', page: 'home' },
  { id: 'egg-4', x: 75, y: 85, icon: Crown, color: '#FFD93D', reward: 'Royal Crown', page: 'home' },
  { id: 'egg-5', x: 25, y: 60, icon: Diamond, color: '#4ECDC4', reward: 'Diamond Collector', page: 'home' },
  { id: 'egg-6', x: 90, y: 30, icon: Gem, color: '#E91E63', reward: 'Gem Master', page: 'home' },
  { id: 'egg-7', x: 10, y: 80, icon: Rocket, color: '#FF5722', reward: 'Space Explorer', page: 'home' },
  { id: 'egg-8', x: 60, y: 45, icon: Wand2, color: '#673AB7', reward: 'Magic Wand', page: 'home' },

  // Chat setup page eggs (7 eggs)
  { id: 'egg-9', x: 25, y: 80, icon: Zap, color: '#00E5FF', reward: 'Lightning Chat Theme', page: 'chat-setup' },
  { id: 'egg-10', x: 75, y: 30, icon: Heart, color: '#FF6B9D', reward: 'Love Potion Effect', page: 'chat-setup' },
  { id: 'egg-11', x: 50, y: 20, icon: Shield, color: '#795548', reward: 'Chat Protector', page: 'chat-setup' },
  { id: 'egg-12', x: 20, y: 50, icon: Trophy, color: '#FFA500', reward: 'Chat Champion', page: 'chat-setup' },
  { id: 'egg-13', x: 80, y: 75, icon: Star, color: '#FFD700', reward: 'Conversation Star', page: 'chat-setup' },
  { id: 'egg-14', x: 40, y: 65, icon: Gift, color: '#FF69B4', reward: 'Chat Gift Box', page: 'chat-setup' },
  { id: 'egg-15', x: 65, y: 40, icon: Sparkles, color: '#9C27B0', reward: 'Chat Sparkles', page: 'chat-setup' },

  // Play setup page eggs (7 eggs)
  { id: 'egg-16', x: 40, y: 15, icon: Trophy, color: '#FFA500', reward: 'Champion Title', page: 'play-setup' },
  { id: 'egg-17', x: 90, y: 45, icon: Sparkles, color: '#9C27B0', reward: 'Play Magic', page: 'play-setup' },
  { id: 'egg-18', x: 15, y: 70, icon: Crown, color: '#FFD93D', reward: 'Play Royalty', page: 'play-setup' },
  { id: 'egg-19', x: 70, y: 25, icon: Diamond, color: '#4ECDC4', reward: 'Play Diamond', page: 'play-setup' },
  { id: 'egg-20', x: 30, y: 85, icon: Rocket, color: '#FF5722', reward: 'Play Explorer', page: 'play-setup' },
  { id: 'egg-21', x: 85, y: 80, icon: Wand2, color: '#673AB7', reward: 'Play Wizard', page: 'play-setup' },
  { id: 'egg-22', x: 55, y: 55, icon: Shield, color: '#795548', reward: 'Play Guardian', page: 'play-setup' },

  // Create setup page eggs (7 eggs)
  { id: 'egg-23', x: 20, y: 60, icon: Crown, color: '#FFD93D', reward: 'Creator Crown', page: 'create-setup' },
  { id: 'egg-24', x: 70, y: 85, icon: Diamond, color: '#4ECDC4', reward: 'Story Diamond', page: 'create-setup' },
  { id: 'egg-25', x: 45, y: 20, icon: Gem, color: '#E91E63', reward: 'Creation Gem', page: 'create-setup' },
  { id: 'egg-26', x: 80, y: 40, icon: Rocket, color: '#FF5722', reward: 'Story Rocket', page: 'create-setup' },
  { id: 'egg-27', x: 25, y: 35, icon: Wand2, color: '#673AB7', reward: 'Creator Wand', page: 'create-setup' },
  { id: 'egg-28', x: 65, y: 70, icon: Star, color: '#FFD700', reward: 'Story Star', page: 'create-setup' },
  { id: 'egg-29', x: 35, y: 80, icon: Trophy, color: '#FFA500', reward: 'Creator Trophy', page: 'create-setup' },

  // Profile page eggs (6 eggs)
  { id: 'egg-30', x: 35, y: 40, icon: Gem, color: '#E91E63', reward: 'Profile Gem', page: 'profile' },
  { id: 'egg-31', x: 75, y: 65, icon: Crown, color: '#FFD93D', reward: 'Profile Crown', page: 'profile' },
  { id: 'egg-32', x: 20, y: 25, icon: Shield, color: '#795548', reward: 'Profile Shield', page: 'profile' },
  { id: 'egg-33', x: 85, y: 35, icon: Diamond, color: '#4ECDC4', reward: 'Profile Diamond', page: 'profile' },
  { id: 'egg-34', x: 50, y: 75, icon: Rocket, color: '#FF5722', reward: 'Profile Rocket', page: 'profile' },
  { id: 'egg-35', x: 65, y: 20, icon: Wand2, color: '#673AB7', reward: 'Profile Wand', page: 'profile' },

  // About page eggs (6 eggs)
  { id: 'egg-36', x: 80, y: 20, icon: Rocket, color: '#FF5722', reward: 'About Explorer', page: 'about' },
  { id: 'egg-37', x: 25, y: 70, icon: Star, color: '#FFD700', reward: 'About Star', page: 'about' },
  { id: 'egg-38', x: 70, y: 50, icon: Crown, color: '#FFD93D', reward: 'About Crown', page: 'about' },
  { id: 'egg-39', x: 40, y: 80, icon: Diamond, color: '#4ECDC4', reward: 'About Diamond', page: 'about' },
  { id: 'egg-40', x: 85, y: 65, icon: Gem, color: '#E91E63', reward: 'About Gem', page: 'about' },
  { id: 'egg-41', x: 15, y: 35, icon: Shield, color: '#795548', reward: 'About Shield', page: 'about' },

  // Help page eggs (6 eggs)
  { id: 'egg-42', x: 45, y: 75, icon: Wand2, color: '#673AB7', reward: 'Help Wand', page: 'help' },
  { id: 'egg-43', x: 20, y: 45, icon: Trophy, color: '#FFA500', reward: 'Help Trophy', page: 'help' },
  { id: 'egg-44', x: 75, y: 25, icon: Sparkles, color: '#9C27B0', reward: 'Help Sparkles', page: 'help' },
  { id: 'egg-45', x: 60, y: 85, icon: Heart, color: '#FF6B9D', reward: 'Help Heart', page: 'help' },
  { id: 'egg-46', x: 30, y: 20, icon: Gift, color: '#FF69B4', reward: 'Help Gift', page: 'help' },
  { id: 'egg-47', x: 85, y: 55, icon: Zap, color: '#00E5FF', reward: 'Help Lightning', page: 'help' },

  // Chat page eggs (3 eggs)
  { id: 'egg-48', x: 60, y: 35, icon: Shield, color: '#795548', reward: 'Chat Protector', page: 'chat' },
  { id: 'egg-49', x: 25, y: 65, icon: Star, color: '#FFD700', reward: 'Chat Star', page: 'chat' },
  { id: 'egg-50', x: 80, y: 75, icon: Crown, color: '#FFD93D', reward: 'Ultimate Master', page: 'chat' },
];

export const EasterEggProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const [isVictoryShown, setIsVictoryShown] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [gameCompleted, setGameCompleted] = useState(false);
  const theme = darkTheme;

  // Get current page from URL
  useEffect(() => {
    const updateCurrentPage = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '/home') setCurrentPage('home');
      else if (path === '/chat-setup') setCurrentPage('chat-setup');
      else if (path === '/play-setup') setCurrentPage('play-setup');
      else if (path === '/create-setup') setCurrentPage('create-setup');
      else if (path === '/profile') setCurrentPage('profile');
      else if (path === '/about') setCurrentPage('about');
      else if (path === '/help') setCurrentPage('help');
      else if (path === '/chat') setCurrentPage('chat');
      else setCurrentPage('home');
    };

    updateCurrentPage();
    
    // Listen for route changes
    const handlePopState = () => updateCurrentPage();
    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check for victory condition (50 eggs)
  useEffect(() => {
    if (foundEggs.length === 50 && !isVictoryShown && !gameCompleted) {
      setIsVictoryShown(true);
      setShowFireworks(true);
      setGameCompleted(true);
    }
  }, [foundEggs, isVictoryShown, gameCompleted]);

  const findEgg = (eggId: string) => {
    // Only add if not already found (prevent duplicates)
    if (!foundEggs.includes(eggId) && !gameCompleted) {
      setFoundEggs(prev => [...prev, eggId]);
    }
  };

  const closeVictory = () => {
    setIsVictoryShown(false);
    setShowFireworks(false);
  };

  // Get available eggs for current page (only show unfound eggs, max 2-3 total across all pages)
  const getVisibleEggs = () => {
    if (gameCompleted) return []; // No more eggs after completion
    
    const unfoundEggs = EASTER_EGGS.filter(egg => !foundEggs.includes(egg.id));
    const currentPageUnfoundEggs = unfoundEggs.filter(egg => egg.page === currentPage);
    
    // Show maximum 2-3 eggs total across all pages, but only show current page eggs
    const totalVisibleEggs = Math.min(3, unfoundEggs.length);
    const currentPageVisibleCount = Math.min(2, currentPageUnfoundEggs.length);
    
    // Return current page eggs up to the limit
    return currentPageUnfoundEggs.slice(0, currentPageVisibleCount);
  };

  const currentPageEggs = getVisibleEggs();

  return (
    <EasterEggContext.Provider value={{
      foundEggs,
      totalEggs: 50,
      isVictoryShown,
      findEgg,
      closeVictory,
      currentPageEggs
    }}>
      {children}
      
      {/* Global Easter Eggs Renderer */}
      <AnimatePresence>
        {currentPageEggs.map((egg) => {
          const Icon = egg.icon;
          return (
            <motion.div
              key={egg.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.6, 1, 0.6], 
                scale: [1, 1.1, 1]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="fixed z-50 cursor-pointer"
              style={{ 
                left: `${egg.x}%`, 
                top: `${egg.y}%`,
                filter: `drop-shadow(0 0 8px ${egg.color})`
              }}
              onClick={() => findEgg(egg.id)}
            >
              <motion.div
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                className="w-8 h-8 rounded-full flex items-center justify-center relative"
                style={{ 
                  background: `radial-gradient(circle, ${egg.color}70, ${egg.color}90)`,
                  border: `2px solid ${egg.color}`,
                  boxShadow: `0 0 15px ${egg.color}60`
                }}
              >
                <Icon className="w-5 h-5" style={{ color: '#FFFFFF' }} />
                
                {/* Subtle Pulsing Ring Effect */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: egg.color }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Victory Celebration Modal */}
      <AnimatePresence>
        {isVictoryShown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={(e) => {
              // Allow clicking outside to close
              if (e.target === e.currentTarget) {
                closeVictory();
              }
            }}
          >
            {/* Fireworks Background */}
            {showFireworks && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 1, 
                      scale: 0, 
                      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400, 
                      y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300 
                    }}
                    animate={{ 
                      opacity: 0, 
                      scale: 3, 
                      x: (typeof window !== 'undefined' ? window.innerWidth / 2 : 400) + (Math.random() - 0.5) * 600,
                      y: (typeof window !== 'undefined' ? window.innerHeight / 2 : 300) + (Math.random() - 0.5) * 600
                    }}
                    transition={{ 
                      duration: 2, 
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                    className="absolute w-6 h-6 rounded-full"
                    style={{ 
                      background: `radial-gradient(circle, ${EASTER_EGGS[i % EASTER_EGGS.length].color}, transparent)`,
                      boxShadow: `0 0 30px ${EASTER_EGGS[i % EASTER_EGGS.length].color}`
                    }}
                  />
                ))}
              </div>
            )}

            {/* Victory Modal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              className="relative max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${theme.special.lime}, ${theme.special.magenta}, ${theme.special.yellow})`,
                boxShadow: `0 0 60px ${theme.special.lime}60`
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background: `conic-gradient(from 0deg, ${theme.special.lime}, ${theme.special.magenta}, ${theme.special.yellow}, ${theme.special.lime})`
                  }}
                />
              </div>

              <div className="relative z-10 p-8 text-center">
                {/* Victory Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="w-24 h-24 mx-auto mb-6 relative"
                >
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-full h-full rounded-full flex items-center justify-center shadow-2xl"
                    style={{ 
                      background: 'radial-gradient(circle, #FFD700, #FFA500)',
                      boxShadow: '0 0 40px #FFD70080'
                    }}
                  >
                    <Crown className="w-12 h-12 text-white drop-shadow-lg" />
                  </motion.div>
                  
                  {/* Orbiting Celebration Icons */}
                  {[Trophy, Star, Sparkles, Heart].map((Icon, index) => (
                    <motion.div
                      key={index}
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 3 + index, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: index * 0.5
                      }}
                      className="absolute w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        top: index % 2 === 0 ? '-10px' : 'auto',
                        bottom: index % 2 === 1 ? '-10px' : 'auto',
                        left: index < 2 ? '-10px' : 'auto',
                        right: index >= 2 ? '-10px' : 'auto',
                        background: `radial-gradient(circle, ${EASTER_EGGS[index].color}, ${EASTER_EGGS[index + 4].color})`,
                        boxShadow: `0 0 15px ${EASTER_EGGS[index].color}60`
                      }}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Victory Text */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-3xl font-bold text-white mb-4 drop-shadow-lg"
                >
                  🎉 CONGRATULATIONS! 🎉
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mb-6"
                >
                  <p className="text-xl font-semibold text-white mb-2 drop-shadow-md">
                    🥇 EGG MASTER COLLECTOR 🥇
                  </p>
                  <p className="text-lg text-white/90 drop-shadow-md">
                    You found all 50 hidden Easter eggs throughout Fiction Fusion!
                  </p>
                </motion.div>

                {/* Achievement Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                  className="inline-block mb-6 p-4 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-8 h-8 text-yellow-300" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-white/80">Achievement Unlocked</p>
                      <p className="text-lg font-bold text-white">Easter Egg Master</p>
                    </div>
                    <Shield className="w-8 h-8 text-blue-300" />
                  </div>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeVictory}
                  className="px-8 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300 border-2 border-white/30"
                >
                  Awesome! ✨
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </EasterEggContext.Provider>
  );
};