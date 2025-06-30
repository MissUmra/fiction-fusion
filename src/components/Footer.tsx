import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Github, Twitter, Mail, Gift } from 'lucide-react';
import EasterEggMiniGame from './EasterEggMiniGame';
import { darkTheme } from '../utils/colors';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const theme = darkTheme;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-dark-500/90 backdrop-blur-md border-t border-primary-500/20 mt-auto relative"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-secondary-500 mb-4">Fiction Fusion</h3>
              <p className="text-secondary-500/80 text-sm">
                Chat with your favorite characters from any universe. Create, play, and explore infinite stories.
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-secondary-500 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-secondary-500/80">
                <li>
                  <button 
                    onClick={() => handleNavigation('/home')} 
                    className="hover:text-primary-500 transition-colors text-left"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/about')} 
                    className="hover:text-primary-500 transition-colors text-left"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/help')} 
                    className="hover:text-primary-500 transition-colors text-left"
                  >
                    Help
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => window.open('/privacy', '_blank')} 
                    className="hover:text-primary-500 transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-secondary-500 mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-secondary-500/80">
                <li>
                  <button 
                    onClick={() => handleNavigation('/chat-setup')} 
                    className="hover:text-primary-500 transition-colors text-left"
                  >
                    Character Chat
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/play-setup')} 
                    className="hover:text-primary-500 transition-colors text-left"
                  >
                    Role Play
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/create-setup')} 
                    className="hover:text-primary-500 transition-colors text-left"
                  >
                    Story Creation
                  </button>
                </li>
                <li>
                  <motion.button 
                    onClick={() => setShowEasterEgg(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="hover:text-primary-500 transition-colors flex items-center space-x-1 p-1 rounded-lg"
                    title="Hidden Treasures"
                  >
                    <Gift className="w-5 h-5" />
                  </motion.button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-secondary-500 mb-4">Connect</h4>
              <div className="flex space-x-4">
                <button 
                  onClick={() => window.open('https://github.com', '_blank')} 
                  className="text-secondary-500/80 hover:text-primary-500 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => window.open('https://twitter.com', '_blank')} 
                  className="text-secondary-500/80 hover:text-primary-500 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => window.open('mailto:contact@fictionfusion.com', '_blank')} 
                  className="text-secondary-500/80 hover:text-primary-500 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-500/20 mt-8 pt-8 text-center relative">
            <p className="text-secondary-500/80 text-sm flex items-center justify-center">
              Made with <Heart className="w-4 h-4 text-primary-500 mx-1" /> for RPG lovers everywhere
            </p>
          </div>
        </div>

        {/* Enhanced Responsive Bolt Logo in Bottom Right - DOUBLED SIZE */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 lg:right-10 flex items-center space-x-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              hover: { duration: 0.6, ease: "easeInOut" },
              default: { duration: 0.8 }
            }}
            className="relative cursor-pointer"
          >
            {/* Responsive sizing with DOUBLED dimensions */}
            <img
              src="/bolt-logo.png"
              alt="Bolt Logo"
              className="rounded-lg shadow-lg object-contain transition-all duration-300"
              style={{ 
                width: 'clamp(48px, 8vw, 80px)', // DOUBLED: min 48px (was 24px), max 80px (was 40px), scales with 8vw (was 4vw)
                height: 'clamp(48px, 8vw, 80px)', // DOUBLED: min 48px (was 24px), max 80px (was 40px), scales with 8vw (was 4vw)
                filter: 'drop-shadow(0 0 15px rgba(128, 182, 38, 0.4))', // Enhanced glow for larger size
                maxWidth: '80px', // DOUBLED: was 40px
                maxHeight: '80px' // DOUBLED: was 40px
              }}
            />
            
            {/* Enhanced Glow Effect on Hover - Scaled for larger logo */}
            <motion.div
              className="absolute inset-0 rounded-lg opacity-0"
              whileHover={{ opacity: 0.6 }}
              transition={{ duration: 0.3 }}
              style={{
                background: `radial-gradient(circle, ${theme.special.lime}40 0%, transparent 70%)`,
                filter: 'blur(12px)' // Increased blur for larger size
              }}
            />
            
            {/* Subtle Pulsing Ring - Scaled for larger logo */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 rounded-lg border opacity-30"
              style={{ 
                borderColor: theme.special.lime,
                borderWidth: '2px' // Increased border width for larger size
              }}
            />
          </motion.div>
        </div>
      </motion.footer>
        
      <EasterEggMiniGame 
        isOpen={showEasterEgg} 
        onClose={() => setShowEasterEgg(false)} 
      />
    </>
  );
};

export default Footer;