import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { darkTheme } from '../utils/colors';
import FloatingElements from '../components/FloatingElements';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { login, signup, loginAsGuest, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const theme = darkTheme;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMessage('');

    try {
      if (isLogin) {
        await login(email, password);
        setSuccessMessage('Login successful! Redirecting...');
      } else {
        await signup(email, password, username);
        setSuccessMessage('Account created successfully! Welcome to Fiction Fusion!');
      }
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/home');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setLocalError('');
    setSuccessMessage('');
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const displayError = error || localError;

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: theme.gradients.acrylic }}
    >
      {/* Wave Background Effect */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, ${theme.special.lime}30 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${theme.special.magenta}25 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, ${theme.special.yellow}20 0%, transparent 50%)
            `,
            backgroundSize: '400% 400%'
          }}
        />
      </div>

      <FloatingElements />

      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto">
          
          {/* Left Side - Features Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              {/* Consistent Enhanced Logo for Auth Page */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center lg:justify-start mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mr-3 sm:mr-4 flex-shrink-0"
                >
                  {/* Outer Oval Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full opacity-90"
                    style={{ 
                      borderRadius: '50% 50% 45% 55%',
                      border: `4px solid ${theme.special.lime}`,
                      background: `conic-gradient(from 0deg, ${theme.special.lime}, ${theme.special.magenta}, ${theme.special.yellow}, ${theme.special.lime})`,
                      filter: 'blur(1px)',
                      boxShadow: `0 0 25px ${theme.special.lime}60`
                    }}
                  />
                  
                  {/* Middle Oval Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full opacity-80"
                    style={{ 
                      borderRadius: '45% 55% 50% 50%',
                      border: `3px solid ${theme.special.magenta}`,
                      background: `conic-gradient(from 180deg, ${theme.special.magenta}, ${theme.accent.primary}, ${theme.special.yellow}, ${theme.special.magenta})`,
                      filter: 'blur(0.5px)',
                      boxShadow: `0 0 20px ${theme.special.magenta}50`
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
                      boxShadow: `0 0 15px ${theme.special.yellow}40`
                    }}
                  />
                  
                  {/* Central White Core */}
                  <div 
                    className="absolute inset-6 rounded-full flex items-center justify-center shadow-inner"
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
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                      style={{ backgroundColor: theme.special.lime }}
                    />
                  </div>
                  
                  {/* Enhanced Orbiting Neon Dots */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full opacity-90 shadow-lg"
                    style={{ 
                      background: `radial-gradient(circle, ${theme.special.yellow}, ${theme.special.lime})`,
                      filter: `drop-shadow(0 0 6px ${theme.special.yellow})`,
                      boxShadow: `0 0 12px ${theme.special.yellow}60`
                    }}
                  />
                  <motion.div
                    animate={{ 
                      rotate: -360,
                      scale: [1, 1.4, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-2 -left-2 w-2 h-2 sm:w-3 sm:h-3 rounded-full opacity-80 shadow-lg"
                    style={{ 
                      background: `radial-gradient(circle, ${theme.special.magenta}, ${theme.accent.secondary})`,
                      filter: `drop-shadow(0 0 5px ${theme.special.magenta})`,
                      boxShadow: `0 0 10px ${theme.special.magenta}50`
                    }}
                  />
                  <motion.div
                    animate={{ 
                      rotate: 180,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full opacity-70"
                    style={{ 
                      background: `radial-gradient(circle, ${theme.accent.primary}, ${theme.special.mint})`,
                      filter: `drop-shadow(0 0 4px ${theme.accent.primary})`,
                      boxShadow: `0 0 8px ${theme.accent.primary}40`
                    }}
                  />
                  <motion.div
                    animate={{ 
                      rotate: -180,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/2 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full opacity-60"
                    style={{ 
                      background: `radial-gradient(circle, ${theme.special.peach}, ${theme.special.coral})`,
                      filter: `drop-shadow(0 0 3px ${theme.special.peach})`,
                      boxShadow: `0 0 6px ${theme.special.peach}40`
                    }}
                  />
                  
                  {/* Enhanced Neon Glow */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-40"
                    style={{
                      background: `radial-gradient(circle, ${theme.special.lime}40 0%, ${theme.special.magenta}30 50%, ${theme.special.yellow}20 100%)`,
                      filter: 'blur(15px)',
                      animation: 'glow 3s ease-in-out infinite alternate'
                    }}
                  />
                </motion.div>
                
                <div className="min-w-0 flex-1">
                  <h1 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 text-white drop-shadow-lg"
                    style={{ 
                      textShadow: '0 0 15px rgba(128, 182, 38, 0.5)',
                      lineHeight: '1.1'
                    }}
                  >
                    Fiction Fusion
                  </h1>
                  <p 
                    className="text-sm sm:text-base lg:text-lg font-medium"
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
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl mb-8 text-white drop-shadow-md"
              >
                Chat with your favorite characters from any universe
              </motion.p>
            </div>

            {/* Feature Cards with Enhanced Animations */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center space-x-4 p-6 rounded-2xl backdrop-blur-md"
                style={{
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.special.lime}40`,
                  boxShadow: `0 0 20px ${theme.special.lime}20`
                }}
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${theme.special.lime}, ${theme.special.yellow})` }}
                >
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Character Chat</h3>
                  <p className="text-sm text-white opacity-80">Have conversations with any character from movies, anime, books, and games</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center space-x-4 p-6 rounded-2xl backdrop-blur-md"
                style={{
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.special.magenta}40`,
                  boxShadow: `0 0 20px ${theme.special.magenta}20`
                }}
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${theme.special.magenta}, ${theme.accent.secondary})` }}
                >
                  <span className="text-2xl">🎮</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Role Play</h3>
                  <p className="text-sm text-white opacity-80">Step into character and create interactive stories with cross-dimensional adventures</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center space-x-4 p-6 rounded-2xl backdrop-blur-md"
                style={{
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.special.yellow}40`,
                  boxShadow: `0 0 20px ${theme.special.yellow}20`
                }}
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${theme.special.yellow}, ${theme.special.lime})` }}
                >
                  <span className="text-2xl">✍️</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Story Creation</h3>
                  <p className="text-sm text-white opacity-80">Be the director, writer, and actor in your own unique character crossover stories</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center lg:text-left"
            >
              <div 
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full backdrop-blur-md"
                style={{
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.special.lime}40`,
                  boxShadow: `0 0 20px ${theme.special.lime}30`
                }}
              >
                <span className="text-2xl">✨</span>
                <span className="font-medium text-white">Powered by AI Magic</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-8 rounded-3xl shadow-2xl backdrop-blur-md"
                style={{
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.border.accent}`,
                  boxShadow: `0 0 40px ${theme.special.magenta}30`
                }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">
                    {isLogin ? 'Welcome Back!' : 'Join the Adventure!'}
                  </h2>
                  <p className="text-white opacity-80">
                    {isLogin ? 'Sign in to continue your journey' : 'Create your account to get started'}
                  </p>
                </div>

                {/* Error Message */}
                {displayError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl flex items-center space-x-3"
                    style={{
                      backgroundColor: `${theme.accent.error}20`,
                      border: `1px solid ${theme.accent.error}`,
                      color: theme.accent.error
                    }}
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{displayError}</span>
                  </motion.div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl flex items-center space-x-3"
                    style={{
                      backgroundColor: `${theme.accent.success}20`,
                      border: `1px solid ${theme.accent.success}`,
                      color: theme.accent.success
                    }}
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{successMessage}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="relative"
                    >
                      <User 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white opacity-60"
                      />
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 transition-all text-white placeholder-white placeholder-opacity-60"
                        style={{
                          backgroundColor: theme.background.secondary,
                          border: `2px solid ${theme.border.primary}`,
                          focusRingColor: theme.special.lime
                        }}
                        required={!isLogin}
                        disabled={isLoading}
                      />
                    </motion.div>
                  )}
                  
                  <div className="relative">
                    <Mail 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white opacity-60"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 transition-all text-white placeholder-white placeholder-opacity-60"
                      style={{
                        backgroundColor: theme.background.secondary,
                        border: `2px solid ${theme.border.primary}`,
                        focusRingColor: theme.special.lime
                      }}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white opacity-60"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 transition-all text-white placeholder-white placeholder-opacity-60"
                      style={{
                        backgroundColor: theme.background.secondary,
                        border: `2px solid ${theme.border.primary}`,
                        focusRingColor: theme.special.lime
                      }}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 font-bold rounded-xl hover:shadow-2xl transition-all duration-300 text-white flex items-center justify-center space-x-2"
                    style={{
                      background: isLoading ? theme.text.muted : theme.gradients.primary,
                      boxShadow: `0 0 30px ${theme.special.lime}40`,
                      opacity: isLoading ? 0.7 : 1
                    }}
                  >
                    {isLoading && <Loader className="w-5 h-5 animate-spin" />}
                    <span>{isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
                  </motion.button>
                </form>

                <div className="mt-6 space-y-4">
                  <motion.button
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    onClick={handleGuestLogin}
                    disabled={isLoading}
                    className="w-full py-4 font-bold rounded-xl hover:opacity-80 transition-all duration-300 text-white"
                    style={{
                      backgroundColor: theme.background.secondary,
                      border: `2px solid ${theme.border.primary}`,
                      opacity: isLoading ? 0.5 : 1
                    }}
                  >
                    Continue as Guest
                  </motion.button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={toggleMode}
                      disabled={isLoading}
                      className="transition-colors hover:opacity-80 text-white"
                      style={{ opacity: isLoading ? 0.5 : 1 }}
                    >
                      {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;