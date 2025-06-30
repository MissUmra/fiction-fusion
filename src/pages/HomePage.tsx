import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Gamepad2, PenTool, Sparkles, Zap, Heart, Star, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingElements from '../components/FloatingElements';
import CharacterCollage from '../components/CharacterCollage';
import EasterEggMiniGame from '../components/EasterEggMiniGame';
import { useEasterEgg } from '../contexts/EasterEggContext';
import { darkTheme } from '../utils/colors';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = darkTheme;
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const { foundEggs } = useEasterEgg();

   const features = [
    {
      id: 'chat',
      name: 'Chat',
      icon: MessageSquare,
      avatar: '💬',
      gradient: theme.gradients.chat,
      description: 'Have deep conversations with any character from your favorite universes. Experience authentic personalities and engaging dialogue.',
      route: '/chat-setup',
      enhancedGradient: `conic-gradient(from 0deg, ${theme.special.lime}, ${theme.special.yellow}, ${theme.accent.primary}, ${theme.special.lime})`,
      shadowColor: theme.special.lime,
      descriptionPosition: 'above',
      position: { top: '20%', left: '20%' }
    },
    {
      id: 'play',
      name: 'Play',
      icon: Gamepad2,
      avatar: '🎮',
      gradient: theme.gradients.play,
      description: 'Role-play in interactive scenarios with cross-dimensional adventures. Step into character and create epic stories.',
      route: '/play-setup',
      enhancedGradient: `conic-gradient(from 120deg, ${theme.special.magenta}, ${theme.special.coral}, ${theme.accent.secondary}, ${theme.special.magenta})`,
      shadowColor: theme.special.magenta,
      descriptionPosition: 'below',
      position: { top: '50%', left: '50%' }
    },
    {
      id: 'create',
      name: 'Create',
      icon: PenTool,
      avatar: '✍️',
      gradient: theme.gradients.create,
      description: 'Direct your own stories with characters from different worlds. Be the writer, director, and actor in unique crossover tales.',
      route: '/create-setup',
      enhancedGradient: `conic-gradient(from 240deg, ${theme.special.yellow}, ${theme.special.peach}, ${theme.special.lime}, ${theme.special.yellow})`,
      shadowColor: theme.special.yellow,
      descriptionPosition: 'above',
      position: { top: '20%', right: '20%' }
    }
  ];

  const highlights = [
    {
      icon: Sparkles,
      title: 'AI-Powered Characters',
      description: 'Advanced AI brings characters to life with authentic personalities and responses',
      color: theme.special.magenta
    },
    {
      icon: Zap,
      title: 'Cross-Dimensional RPG',
      description: 'Mix characters from different universes in unique time-travel adventures',
      color: theme.special.yellow
    },
    {
      icon: Heart,
      title: 'Emotional Connections',
      description: 'Build meaningful relationships with your favorite fictional characters',
      color: theme.accent.secondary
    },
    {
      icon: Star,
      title: 'Infinite Possibilities',
      description: 'Every conversation is unique with endless story combinations',
      color: theme.special.lime
    },
    {
      icon: Users,
      title: 'Multi-Character Scenes',
      description: 'Create complex scenarios with multiple characters interacting',
      color: theme.accent.primary
    }
  ];

  const handleEasterEggClick = () => {
    setEasterEggClicks(prev => prev + 1);
    if (easterEggClicks >= 4) {
      setShowEasterEgg(true);
      setEasterEggClicks(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced Animated Background with Wave Effects */}
      <div className="absolute inset-0 opacity-80">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
          style={{ background: theme.gradients.acrylic }}
        />
        
        {/* Ripple Wave Effects */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.special.lime}20 0%, transparent 70%)`,
            filter: 'blur(20px)'
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.special.magenta}20 0%, transparent 70%)`,
            filter: 'blur(25px)'
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.special.yellow}20 0%, transparent 70%)`,
            filter: 'blur(15px)'
          }}
        />
      </div>

      {/* Character Collage Background */}
      <CharacterCollage />

      <Header />
      <FloatingElements />
      
      <main className="flex-1 relative z-10">
        {/* Hero Section with Character Showcase */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white drop-shadow-lg"
                  style={{ 
                    textShadow: '0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(255, 105, 180, 0.3)'
                  }}
                >
                  Choose Your RPG Adventure
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-xl lg:text-2xl mb-8 text-white drop-shadow-md"
                  style={{ color: theme.text.secondary }}
                >
                  Step into infinite worlds and role-play with any character you can imagine. 
                  Create stories, play roles, and explore universes beyond your wildest dreams.
                </motion.p>
              </motion.div>

              {/* Right Side - Character Showcase - Bare Image with Smooth Hover Effect */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex justify-center lg:justify-end"
              >
                {/* Smooth Butter-like Hover Effect with Shadow Animation */}
                <motion.div
                  className="relative cursor-pointer"
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 0.8,
                  }}
                >
                  {/* Animated Shadow Layer */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                      filter: "blur(15px)",
                    }}
                    whileHover={{
                      boxShadow: [
                        "0 10px 30px rgba(0, 0, 0, 0.2)",
                        "0 25px 60px rgba(128, 182, 38, 0.3), 0 15px 40px rgba(207, 121, 239, 0.2)",
                        "0 30px 80px rgba(128, 182, 38, 0.4), 0 20px 50px rgba(207, 121, 239, 0.3)"
                      ],
                      filter: [
                        "blur(15px)",
                        "blur(20px)",
                        "blur(25px)"
                      ],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for butter-smooth effect
                    }}
                    style={{
                      transform: "translateZ(0)", // Force hardware acceleration
                    }}
                  />
                  
                  {/* Glow Effect Layer */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0"
                    whileHover={{
                      opacity: [0, 0.6, 0.8],
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    style={{
                      background: `radial-gradient(circle at center, ${theme.special.lime}20 0%, ${theme.special.magenta}15 50%, transparent 100%)`,
                      filter: "blur(30px)",
                    }}
                  />
                  
                  {/* Main Image with Precise Hit Detection */}
                  <motion.img
                    src="/role-play-collage.png"
                    alt="Anime Characters Showcase"
                    className="relative z-10 max-w-none"
                    style={{
                      width: '115%',
                      height: 'auto',
                      borderRadius: '16px',
                      transform: 'translateZ(0)', // Force hardware acceleration
                      backfaceVisibility: 'hidden', // Prevent flickering
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    // Precise hit detection - only trigger on non-transparent pixels
                    onMouseEnter={(e) => {
                      // Only trigger if we're over the actual image content
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      
                      // Create a canvas to check pixel transparency
                      const canvas = document.createElement('canvas');
                      const ctx = canvas.getContext('2d');
                      canvas.width = e.currentTarget.naturalWidth;
                      canvas.height = e.currentTarget.naturalHeight;
                      
                      if (ctx) {
                        ctx.drawImage(e.currentTarget, 0, 0);
                        const scaleX = canvas.width / rect.width;
                        const scaleY = canvas.height / rect.height;
                        const pixelData = ctx.getImageData(x * scaleX, y * scaleY, 1, 1).data;
                        
                        // Only proceed if pixel is not transparent (alpha > 50)
                        if (pixelData[3] > 50) {
                          // Trigger hover effect
                          e.currentTarget.style.pointerEvents = 'auto';
                        }
                      }
                    }}
                    loading="lazy"
                    draggable={false}
                  />
                  
                  {/* Subtle Rim Light Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
                    whileHover={{
                      opacity: [0, 0.4, 0.6],
                    }}
                    transition={{
                      duration: 0.7,
                      ease: "easeOut",
                    }}
                    style={{
                      background: `linear-gradient(45deg, transparent 30%, ${theme.special.lime}40 50%, transparent 70%)`,
                      mixBlendMode: 'overlay',
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>

           <div className="mt-16 sm:mt-20 mb-16 sm:mb-20">
              {/* Mobile Layout (Stack Vertically) */}
              <div className="block lg:hidden space-y-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 1, duration: 0.6 }}
                    className="text-center"
                  >
                    {/* Description Above (Mobile) */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 1.3, duration: 0.6 }}
                      className="mb-8 mx-auto max-w-sm p-4 rounded-2xl shadow-2xl backdrop-blur-md"
                      style={{ 
                        backgroundColor: theme.glass.background,
                        border: `2px solid ${feature.shadowColor}`,
                        boxShadow: `0 0 30px ${feature.shadowColor}40`
                      }}
                    >
                      <div className="flex items-center justify-center space-x-3 mb-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-lg"
                          style={{ background: `linear-gradient(135deg, ${feature.shadowColor}, ${theme.accent.primary})` }}
                        >
                          {feature.avatar}
                        </div>
                        <h4 
                          className="text-lg font-bold"
                          style={{ color: feature.shadowColor }}
                        >
                          {feature.name} Mode
                        </h4>
                      </div>
                      <p className="text-sm font-medium text-white text-center leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(feature.route)}
                        className="w-full px-4 py-2 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${feature.shadowColor}, ${theme.accent.primary})`,
                          color: theme.background.primary
                        }}
                      >
                        Start {feature.name} →
                      </motion.button>
                    </motion.div>

                    {/* Circle (Mobile) */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(feature.route)}
                      className="w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl relative overflow-hidden mx-auto"
                      style={{ 
                        background: feature.enhancedGradient,
                        boxShadow: `0 0 40px ${feature.shadowColor}60, 0 0 80px ${feature.shadowColor}40`
                      }}
                    >
                      <div 
                        className="absolute inset-2 rounded-full opacity-30"
                        style={{ 
                          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                          filter: 'blur(8px)'
                        }}
                      />
                      <motion.div
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10 text-5xl"
                      >
                        {feature.avatar}
                      </motion.div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-80"
                        style={{ 
                          background: `radial-gradient(circle, ${theme.special.yellow}, ${theme.special.lime})`,
                          boxShadow: `0 0 12px ${theme.special.yellow}80`
                        }}
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full opacity-70"
                        style={{ 
                          background: `radial-gradient(circle, ${theme.special.magenta}, ${theme.special.coral})`,
                          boxShadow: `0 0 10px ${theme.special.magenta}80`
                        }}
                      />
                    </motion.div>

                    {/* Feature Name Under Circle (Mobile) */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 1.5, duration: 0.6 }}
                      className="mt-6"
                    >
                      <span 
                        className="text-xl font-bold text-white drop-shadow-lg"
                        style={{ 
                          textShadow: '0 0 10px rgba(0, 0, 0, 0.8)'
                        }}
                      >
                        {feature.name}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop Layout (Horizontal with Proper Positioning) */}
              <div className="hidden lg:block relative" style={{ height: '600px' }}>
                {/* Left Feature (Chat) - Description Above */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute"
                  style={{ left: '0%', top: '65%', transform: 'translate(-50%, -50%)' }}
                >
                  {/* Description Above */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.6 }}
                    className="absolute bottom-full mb-12 right-1/8 transform -translate-x-1/2 w-80 p-6 rounded-2xl shadow-2xl backdrop-blur-md"
                    style={{ 
                      backgroundColor: theme.glass.background,
                      border: `2px solid ${features[0].shadowColor}`,
                      boxShadow: `0 0 30px ${features[0].shadowColor}40`
                    }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-lg"
                        style={{ background: `linear-gradient(135deg, ${features[0].shadowColor}, ${theme.accent.primary})` }}
                      >
                        {features[0].avatar}
                      </div>
                      <h4 
                        className="text-lg font-bold"
                        style={{ color: features[0].shadowColor }}
                      >
                        {features[0].name} Mode
                      </h4>
                    </div>
                    <p className="text-sm font-medium text-white text-center leading-relaxed mb-4">
                      {features[0].description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(features[0].route)}
                      className="w-full px-4 py-2 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${features[0].shadowColor}, ${theme.accent.primary})`,
                        color: theme.background.primary
                      }}
                    >
                      Start {features[0].name} →
                    </motion.button>
                  </motion.div>

                  {/* Circle */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(features[0].route)}
                    className="w-36 h-36 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl relative overflow-hidden"
                    style={{ 
                      background: features[0].enhancedGradient,
                      boxShadow: `0 0 40px ${features[0].shadowColor}60, 0 0 80px ${features[0].shadowColor}40`
                    }}
                  >
                    <div 
                      className="absolute inset-2 rounded-full opacity-30"
                      style={{ 
                        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                        filter: 'blur(8px)'
                      }}
                    />
                    <motion.div
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10 text-6xl"
                    >
                      {features[0].avatar}
                    </motion.div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full opacity-80"
                      style={{ 
                        background: `radial-gradient(circle, ${theme.special.yellow}, ${theme.special.lime})`,
                        boxShadow: `0 0 12px ${theme.special.yellow}80`
                      }}
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full opacity-70"
                      style={{ 
                        background: `radial-gradient(circle, ${theme.special.magenta}, ${theme.special.coral})`,
                        boxShadow: `0 0 10px ${theme.special.magenta}80`
                      }}
                    />
                  </motion.div>

                  {/* Feature Name Under Circle */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="absolute top-full mt-6 left-1/3 transform -translate-x-1/2"
                  >
                    <span 
                      className="text-xl font-bold text-white drop-shadow-lg"
                      style={{ 
                        textShadow: '0 0 10px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      {features[0].name}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Center Feature (Play) - Description Below */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute"
                  style={{ left: '45%', top: '20%', transform: 'translate(-50%, -50%)' }}
                >
                  {/* Circle */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(features[1].route)}
                    className="w-36 h-36 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl relative overflow-hidden"
                    style={{ 
                      background: features[1].enhancedGradient,
                      boxShadow: `0 0 40px ${features[1].shadowColor}60, 0 0 80px ${features[1].shadowColor}40`
                    }}
                  >
                    <div 
                      className="absolute inset-2 rounded-full opacity-30"
                      style={{ 
                        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                        filter: 'blur(8px)'
                      }}
                    />
                    <motion.div
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10 text-6xl"
                    >
                      {features[1].avatar}
                    </motion.div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full opacity-80"
                      style={{ 
                        background: `radial-gradient(circle, ${theme.special.yellow}, ${theme.special.lime})`,
                        boxShadow: `0 0 12px ${theme.special.yellow}80`
                      }}
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full opacity-70"
                      style={{ 
                        background: `radial-gradient(circle, ${theme.special.magenta}, ${theme.special.coral})`,
                        boxShadow: `0 0 10px ${theme.special.magenta}80`
                      }}
                    />
                  </motion.div>

                  {/* Feature Name Under Circle */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.6 }}
                    className="absolute top-full mt-6 left-1/3 transform -translate-x-1/2"
                  >
                    <span 
                      className="text-xl font-bold text-white drop-shadow-lg"
                      style={{ 
                        textShadow: '0 0 10px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      {features[1].name}
                    </span>
                  </motion.div>

                  {/* Description Below */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="absolute top-full mt-16 right-1/8 transform -translate-x-1/2 w-80 p-6 rounded-2xl shadow-2xl backdrop-blur-md"
                    style={{ 
                      backgroundColor: theme.glass.background,
                      border: `2px solid ${features[1].shadowColor}`,
                      boxShadow: `0 0 30px ${features[1].shadowColor}40`
                    }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-lg"
                        style={{ background: `linear-gradient(135deg, ${features[1].shadowColor}, ${theme.accent.primary})` }}
                      >
                        {features[1].avatar}
                      </div>
                      <h4 
                        className="text-lg font-bold"
                        style={{ color: features[1].shadowColor }}
                      >
                        {features[1].name} Mode
                      </h4>
                    </div>
                    <p className="text-sm font-medium text-white text-center leading-relaxed mb-4">
                      {features[1].description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(features[1].route)}
                      className="w-full px-4 py-2 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${features[1].shadowColor}, ${theme.accent.primary})`,
                        color: theme.background.primary
                      }}
                    >
                      Start {features[1].name} →
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Right Feature (Create) - Description Above */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="absolute"
                  style={{ right: '5%', top: '65%', transform: 'translate(50%, -50%)' }}
                >
                  {/* Description Above */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.6 }}
                    className="absolute bottom-full mb-12 left-1/8 transform -translate-x-1/2 w-80 p-6 rounded-2xl shadow-2xl backdrop-blur-md"
                    style={{ 
                      backgroundColor: theme.glass.background,
                      border: `2px solid ${features[2].shadowColor}`,
                      boxShadow: `0 0 30px ${features[2].shadowColor}40`
                    }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-lg"
                        style={{ background: `linear-gradient(135deg, ${features[2].shadowColor}, ${theme.accent.primary})` }}
                      >
                        {features[2].avatar}
                      </div>
                      <h4 
                        className="text-lg font-bold"
                        style={{ color: features[2].shadowColor }}
                      >
                        {features[2].name} Mode
                      </h4>
                    </div>
                    <p className="text-sm font-medium text-white text-center leading-relaxed mb-4">
                      {features[2].description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(features[2].route)}
                      className="w-full px-4 py-2 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${features[2].shadowColor}, ${theme.accent.primary})`,
                        color: theme.background.primary
                      }}
                    >
                      Start {features[2].name} →
                    </motion.button>
                  </motion.div>

                  {/* Circle */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(features[2].route)}
                    className="w-36 h-36 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl relative overflow-hidden"
                    style={{ 
                      background: features[2].enhancedGradient,
                      boxShadow: `0 0 40px ${features[2].shadowColor}60, 0 0 80px ${features[2].shadowColor}40`
                    }}
                  >
                    <div 
                      className="absolute inset-2 rounded-full opacity-30"
                      style={{ 
                        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                        filter: 'blur(8px)'
                      }}
                    />
                    <motion.div
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10 text-6xl"
                    >
                      {features[2].avatar}
                    </motion.div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full opacity-80"
                      style={{ 
                        background: `radial-gradient(circle, ${theme.special.yellow}, ${theme.special.lime})`,
                        boxShadow: `0 0 12px ${theme.special.yellow}80`
                      }}
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full opacity-70"
                      style={{ 
                        background: `radial-gradient(circle, ${theme.special.magenta}, ${theme.special.coral})`,
                        boxShadow: `0 0 10px ${theme.special.magenta}80`
                      }}
                    />
                  </motion.div>

                  {/* Feature Name Under Circle */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.9, duration: 0.6 }}
                    className="absolute top-full mt-6 left-1/3 transform -translate-x-1/2"
                  >
                    <span 
                      className="text-xl font-bold text-white drop-shadow-lg"
                      style={{ 
                        textShadow: '0 0 10px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      {features[2].name}
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Highlight Section */}
        <section 
          className="py-20 relative"
          style={{ backgroundColor: `${theme.background.secondary}50` }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 
                className="text-4xl font-bold mb-4 text-white drop-shadow-lg"
                style={{ 
                  textShadow: '0 0 15px rgba(0, 229, 255, 0.4)'
                }}
              >
                Why Choose Fiction Fusion?
              </h2>
              <p 
                className="text-xl max-w-2xl mx-auto text-white drop-shadow-md"
                style={{ color: theme.text.secondary }}
              >
                Experience the most advanced character interaction RPG platform with features designed for ultimate immersion
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 backdrop-blur-md"
                    style={{ 
                      backgroundColor: theme.glass.background,
                      border: `2px solid ${theme.border.accent}`,
                      boxShadow: `0 0 30px ${highlight.color}20`
                    }}
                  >
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${highlight.color}, ${theme.accent.primary})`,
                        boxShadow: `0 0 20px ${highlight.color}40`
                      }}
                    >
                      <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                    </motion.div>
                    <h3 
                      className="text-xl font-bold mb-3 text-white"
                    >
                      {highlight.title}
                    </h3>
                    <p 
                      className="text-white opacity-90"
                    >
                      {highlight.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced Hidden Easter Egg Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <div 
                className="p-10 rounded-3xl shadow-2xl backdrop-blur-md"
                style={{ 
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.border.accent}`,
                  boxShadow: `0 0 50px ${theme.special.magenta}30`
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 cursor-pointer shadow-2xl"
                  onClick={handleEasterEggClick}
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.special.magenta}, ${theme.special.yellow}, ${theme.special.lime})`,
                    boxShadow: `0 0 40px ${theme.special.magenta}60`
                  }}
                >
                  <Sparkles className="w-10 h-10 text-white drop-shadow-lg" />
                </motion.div>
                <h3 
                  className="text-3xl font-bold mb-6 text-white drop-shadow-lg"
                  style={{ 
                    textShadow: '0 0 15px rgba(207, 121, 239, 0.5)'
                  }}
                >
                  Hidden Treasures Await
                </h3>
                <p 
                  className="mb-8 text-lg text-white opacity-90"
                >
                  Discover secret mini-games and interactive animations hidden throughout Fiction Fusion. 
                  Keep exploring to unlock special character encounters and bonus features!
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Hidden Easter Egg Mini Game */}
      <EasterEggMiniGame 
        isOpen={showEasterEgg} 
        onClose={() => setShowEasterEgg(false)} 
      />
    </div>
  );
};

export default HomePage;