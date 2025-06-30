import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Info, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { darkTheme } from '../utils/colors';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = darkTheme;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="backdrop-blur-md border-b sticky top-0 z-50"
      style={{ 
        backgroundColor: theme.glass.background,
        borderColor: theme.border.accent,
        backdropFilter: theme.glass.backdrop
      }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/home" className="flex items-center space-x-3">
          {/* Enhanced Logo with Hover Rotation */}
          <motion.div
            whileHover={{ 
              scale: 1.1,
              rotate: 360
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeInOut"
            }}
            className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0"
          >
            {/* Outer Oval Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full opacity-90"
              style={{ 
                borderRadius: '50% 50% 45% 55%',
                border: `3px solid ${theme.special.lime}`,
                background: `conic-gradient(from 0deg, ${theme.special.lime}, ${theme.special.magenta}, ${theme.special.yellow}, ${theme.special.lime})`,
                filter: 'blur(1px)',
                boxShadow: `0 0 20px ${theme.special.lime}60`
              }}
            />
            
            {/* Middle Oval Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full opacity-80"
              style={{ 
                borderRadius: '45% 55% 50% 50%',
                border: `2px solid ${theme.special.magenta}`,
                background: `conic-gradient(from 180deg, ${theme.special.magenta}, ${theme.accent.primary}, ${theme.special.yellow}, ${theme.special.magenta})`,
                filter: 'blur(0.5px)',
                boxShadow: `0 0 15px ${theme.special.magenta}50`
              }}
            />
            
            {/* Inner Oval Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full opacity-70"
              style={{ 
                borderRadius: '55% 45% 50% 50%',
                border: `2px solid ${theme.special.yellow}`,
                boxShadow: `0 0 10px ${theme.special.yellow}40`
              }}
            />
            
            {/* Central White Core */}
            <div 
              className="absolute inset-5 rounded-full flex items-center justify-center shadow-inner"
              style={{ 
                background: 'radial-gradient(circle, #FFFFFF 0%, #F0F0F0 100%)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
              }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                style={{ backgroundColor: theme.special.lime }}
              />
            </div>
            
            {/* Orbiting Neon Dots */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full opacity-90 shadow-lg"
              style={{ 
                background: `radial-gradient(circle, ${theme.special.yellow}, ${theme.special.lime})`,
                filter: `drop-shadow(0 0 4px ${theme.special.yellow})`,
                boxShadow: `0 0 8px ${theme.special.yellow}60`
              }}
            />
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 1.4, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full opacity-80 shadow-lg"
              style={{ 
                background: `radial-gradient(circle, ${theme.special.magenta}, ${theme.accent.secondary})`,
                filter: `drop-shadow(0 0 3px ${theme.special.magenta})`,
                boxShadow: `0 0 6px ${theme.special.magenta}50`
              }}
            />
            <motion.div
              animate={{ 
                rotate: 180,
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 -right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full opacity-70"
              style={{ 
                background: `radial-gradient(circle, ${theme.accent.primary}, ${theme.special.mint})`,
                filter: `drop-shadow(0 0 2px ${theme.accent.primary})`,
                boxShadow: `0 0 4px ${theme.accent.primary}40`
              }}
            />
            <motion.div
              animate={{ 
                rotate: -180,
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/2 -left-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full opacity-60"
              style={{ 
                background: `radial-gradient(circle, ${theme.special.peach}, ${theme.special.coral})`,
                filter: `drop-shadow(0 0 2px ${theme.special.peach})`,
                boxShadow: `0 0 4px ${theme.special.peach}40`
              }}
            />
            
            {/* Enhanced Neon Glow Effect */}
            <div 
              className="absolute inset-0 rounded-full opacity-40"
              style={{
                background: `radial-gradient(circle, ${theme.special.lime}40 0%, ${theme.special.magenta}30 50%, ${theme.special.yellow}20 100%)`,
                filter: 'blur(12px)',
                animation: 'glow 3s ease-in-out infinite alternate'
              }}
            />
          </motion.div>
          
          <div className="min-w-0">
            <h1 
              className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg whitespace-nowrap"
              style={{ 
                textShadow: '0 0 10px rgba(128, 182, 38, 0.5)'
              }}
            >
              Fiction Fusion
            </h1>
            <p 
              className="text-xs sm:text-sm -mt-1 font-medium whitespace-nowrap"
              style={{ 
                background: `linear-gradient(to r, ${theme.special.lime}, ${theme.special.magenta})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Where RPG Adventures Come Alive
            </p>
          </div>
        </Link>

        <nav className="flex items-center space-x-2 sm:space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/home"
              className="flex items-center space-x-1 sm:space-x-2 transition-all duration-300 hover:opacity-80 text-white px-2 py-1 rounded-lg"
              style={{ backgroundColor: `${theme.special.lime}20` }}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.special.lime }} />
              <span className="hidden sm:inline text-sm">Home</span>
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/profile"
              className="flex items-center space-x-1 sm:space-x-2 transition-all duration-300 hover:opacity-80 text-white px-2 py-1 rounded-lg"
              style={{ backgroundColor: `${theme.special.magenta}20` }}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.special.magenta }} />
              <span className="hidden sm:inline text-sm">Profile</span>
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/about"
              className="flex items-center space-x-1 sm:space-x-2 transition-all duration-300 hover:opacity-80 text-white px-2 py-1 rounded-lg"
              style={{ backgroundColor: `${theme.special.yellow}20` }}
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.special.yellow }} />
              <span className="hidden sm:inline text-sm">About</span>
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/help"
              className="flex items-center space-x-1 sm:space-x-2 transition-all duration-300 hover:opacity-80 text-white px-2 py-1 rounded-lg"
              style={{ backgroundColor: `${theme.accent.primary}20` }}
            >
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.accent.primary }} />
              <span className="hidden sm:inline text-sm">Help</span>
            </Link>
          </motion.div>

          {user && (
            <>
              {/* User Info - Show on larger screens */}
              <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-lg" style={{ backgroundColor: `${theme.special.lime}10` }}>
                <span className="text-lg">{user.avatar}</span>
                <span className="text-sm text-white font-medium">{user.username}</span>
              </div>
              
              {/* Sign Out Button - Always visible when user is logged in */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="flex items-center space-x-1 sm:space-x-2 p-2 rounded-lg transition-all duration-300 hover:opacity-80 text-white"
                style={{ 
                  backgroundColor: `${theme.accent.error}20`,
                  border: `1px solid ${theme.accent.error}40`
                }}
                title="Sign Out"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.accent.error }} />
                <span className="hidden md:inline text-sm font-medium" style={{ color: theme.accent.error }}>
                  Sign Out
                </span>
              </motion.button>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;