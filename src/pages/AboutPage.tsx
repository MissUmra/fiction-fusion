import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Zap, Users, Star, Globe, Wand2, Gamepad2, PenTool, Shield, Crown, Rocket } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { darkTheme } from '../utils/colors';

const AboutPage: React.FC = () => {
  const theme = darkTheme;
  const navigate = useNavigate();

  const features = [
    {
      icon: Wand2,
      title: 'AI-Powered Magic',
      description: 'Advanced AI technology brings your favorite characters to life with authentic personalities and engaging conversations',
      gradient: `linear-gradient(135deg, ${theme.special.magenta}, ${theme.special.lime})`,
      shadowColor: theme.special.magenta,
      iconColor: '#FFFFFF'
    },
    {
      icon: Globe,
      title: 'Infinite Universes',
      description: 'Chat with characters from any movie, anime, book, game, or TV show. The multiverse is your playground',
      gradient: `linear-gradient(135deg, ${theme.special.lime}, ${theme.special.yellow})`,
      shadowColor: theme.special.lime,
      iconColor: '#FFFFFF'
    },
    {
      icon: Gamepad2,
      title: 'Role-Playing Adventures',
      description: 'Step into character and create interactive stories with cross-dimensional scenarios and time-travel elements',
      gradient: `linear-gradient(135deg, ${theme.special.yellow}, ${theme.accent.secondary})`,
      shadowColor: theme.special.yellow,
      iconColor: '#FFFFFF'
    },
    {
      icon: PenTool,
      title: 'Story Creation',
      description: 'Be the director, writer, and actor in your own unique crossover stories with multiple characters',
      gradient: `linear-gradient(135deg, ${theme.accent.secondary}, ${theme.special.magenta})`,
      shadowColor: theme.accent.secondary,
      iconColor: '#FFFFFF'
    },
    {
      icon: Heart,
      title: 'Emotional Connections',
      description: 'Build meaningful relationships and have deep conversations with characters you love',
      gradient: `linear-gradient(135deg, ${theme.special.coral}, ${theme.special.peach})`,
      shadowColor: theme.special.coral,
      iconColor: '#FFFFFF'
    },
    {
      icon: Zap,
      title: 'Dynamic Interactions',
      description: 'Every conversation is unique with mood settings and contextual responses that adapt to your preferences',
      gradient: `linear-gradient(135deg, ${theme.accent.primary}, ${theme.special.mint})`,
      shadowColor: theme.accent.primary,
      iconColor: '#FFFFFF'
    }
  ];

  const handleJoinCommunity = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced Circular Ripple Background from Top Right */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Main Circular Ripple from Top Right */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(0,229,255,0.3) 30%, rgba(128,182,38,0.2) 60%, transparent 100%)`,
            filter: 'blur(2px)'
          }}
        />
        
        {/* Secondary Ripple */}
        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(0,229,255,0.2) 40%, rgba(207,121,239,0.15) 70%, transparent 100%)`,
            filter: 'blur(3px)'
          }}
        />
        
        {/* Tertiary Ripple */}
        <motion.div
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.03, 0.15, 0.03],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute -top-64 -right-64 w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(128,182,38,0.15) 50%, rgba(228,236,104,0.1) 80%, transparent 100%)`,
            filter: 'blur(4px)'
          }}
        />
        
        {/* Additional Ripples for Better Effect */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.25, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(0,229,255,0.3) 50%, transparent 100%)`,
            filter: 'blur(1px)'
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.06, 0.18, 0.06],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute top-40 right-40 w-80 h-80 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(207,121,239,0.25) 60%, transparent 100%)`,
            filter: 'blur(2px)'
          }}
        />
      </div>

      <Header />
      
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section 
          className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
          style={{ background: theme.gradients.hero }}
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 opacity-30">
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
              className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full"
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
              className="absolute bottom-1/4 right-1/4 w-56 sm:w-72 md:w-80 h-56 sm:h-72 md:h-80 rounded-full"
              style={{
                background: `radial-gradient(circle, ${theme.special.magenta}20 0%, transparent 70%)`,
                filter: 'blur(25px)'
              }}
            />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Enhanced Hero Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mx-auto mb-6 sm:mb-8 relative"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full rounded-full flex items-center justify-center shadow-2xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.special.magenta}, ${theme.special.lime}, ${theme.special.yellow})`,
                    boxShadow: `0 0 40px ${theme.special.magenta}60`
                  }}
                >
                  <Sparkles className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-white drop-shadow-lg" />
                </motion.div>
                
                {/* Orbiting Elements */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle, ${theme.special.yellow}, ${theme.special.lime})`,
                    boxShadow: `0 0 15px ${theme.special.yellow}80`
                  }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-3 sm:w-4 h-3 sm:h-4 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle, ${theme.special.lime}, ${theme.special.magenta})`,
                    boxShadow: `0 0 12px ${theme.special.lime}80`
                  }}
                />
              </motion.div>

              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
                style={{ color: theme.text.primary }}
              >
                About Fiction Fusion
              </h1>
              <p 
                className="text-lg sm:text-xl max-w-3xl mx-auto px-4"
                style={{ color: theme.text.secondary }}
              >
                We're building the future of interactive role-playing, where you can chat, play, and create with any character from any universe.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section 
          className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
          style={{ backgroundColor: `${theme.background.secondary}50` }}
        >
          {/* Background Wave Effects */}
          <div className="absolute inset-0 opacity-20">
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

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              {/* Enhanced Mission Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto mb-4 sm:mb-6 relative"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-full h-full rounded-full flex items-center justify-center shadow-2xl"
                  style={{ 
                    background: `conic-gradient(from 0deg, ${theme.special.lime}, ${theme.special.magenta}, ${theme.special.yellow}, ${theme.special.lime})`,
                    boxShadow: `0 0 30px ${theme.special.lime}50`
                  }}
                >
                  <Rocket className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 text-white drop-shadow-lg" />
                </motion.div>
              </motion.div>

              <h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
                style={{ color: theme.text.primary }}
              >
                Our Mission
              </h2>
              <p 
                className="text-lg sm:text-xl max-w-4xl mx-auto px-4"
                style={{ color: theme.text.secondary }}
              >
                Fiction Fusion was born from a simple idea: what if you could have real conversations with your favorite fictional characters? 
                We believe that stories have the power to inspire, comfort, and connect us. Our platform breaks down the barriers between 
                fiction and reality, allowing you to explore infinite possibilities through AI-powered character interactions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="p-6 sm:p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 backdrop-blur-md relative overflow-hidden"
                    style={{
                      backgroundColor: theme.glass.background,
                      border: `2px solid ${theme.border.primary}`,
                      boxShadow: `0 0 30px ${feature.shadowColor}20`
                    }}
                  >
                    {/* Enhanced Background Glow */}
                    <div 
                      className="absolute inset-0 opacity-10 rounded-3xl"
                      style={{ background: feature.gradient }}
                    />
                    
                    {/* Enhanced Icon Container */}
                    <motion.div 
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.6 }}
                      className="relative w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-2xl"
                      style={{ 
                        background: feature.gradient,
                        boxShadow: `0 0 25px ${feature.shadowColor}60, inset 0 0 20px rgba(255,255,255,0.1)`
                      }}
                    >
                      {/* Inner Glow Effect */}
                      <div 
                        className="absolute inset-1 rounded-xl opacity-30"
                        style={{ 
                          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                          filter: 'blur(4px)'
                        }}
                      />
                      
                      <Icon 
                        className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 relative z-10 drop-shadow-lg" 
                        style={{ color: feature.iconColor }}
                      />
                      
                      {/* Orbiting Sparkles */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 rounded-full opacity-80"
                        style={{ 
                          background: `radial-gradient(circle, ${theme.special.yellow}, ${theme.special.lime})`,
                          boxShadow: `0 0 8px ${theme.special.yellow}60`
                        }}
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-1 -left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full opacity-70"
                        style={{ 
                          background: `radial-gradient(circle, ${theme.special.magenta}, ${theme.special.coral})`,
                          boxShadow: `0 0 6px ${theme.special.magenta}60`
                        }}
                      />
                    </motion.div>
                    
                    <h3 
                      className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 relative z-10"
                      style={{ color: theme.text.primary }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="text-sm sm:text-base relative z-10"
                      style={{ color: theme.text.secondary }}
                    >
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section 
          className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
          style={{ backgroundColor: `${theme.background.tertiary}30` }}
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 opacity-20">
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
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 rounded-full"
              style={{
                background: `radial-gradient(circle, ${theme.special.yellow}20 0%, transparent 70%)`,
                filter: 'blur(15px)'
              }}
            />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div 
                className="p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-md relative overflow-hidden"
                style={{ 
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.border.primary}`,
                  boxShadow: `0 0 50px ${theme.special.magenta}30`
                }}
              >
                {/* Enhanced Vision Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto mb-6 sm:mb-8 relative"
                >
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-full h-full rounded-full flex items-center justify-center shadow-2xl relative"
                    style={{ 
                      background: `conic-gradient(from 0deg, ${theme.special.lime}, ${theme.special.magenta}, ${theme.special.yellow}, ${theme.accent.primary}, ${theme.special.lime})`,
                      boxShadow: `0 0 40px ${theme.special.magenta}60`
                    }}
                  >
                    <Crown className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 text-white drop-shadow-lg" />
                    
                    {/* Enhanced Orbiting Elements */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 rounded-full"
                      style={{ 
                        background: `radial-gradient(circle, ${theme.special.yellow}, ${theme.special.lime})`,
                        boxShadow: `0 0 15px ${theme.special.yellow}80`
                      }}
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-3 sm:w-4 h-3 sm:h-4 rounded-full"
                      style={{ 
                        background: `radial-gradient(circle, ${theme.special.magenta}, ${theme.special.coral})`,
                        boxShadow: `0 0 12px ${theme.special.magenta}80`
                      }}
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 -right-2 sm:-right-3 w-2 sm:w-3 h-2 sm:h-3 rounded-full"
                      style={{ 
                        background: `radial-gradient(circle, ${theme.accent.primary}, ${theme.special.mint})`,
                        boxShadow: `0 0 10px ${theme.accent.primary}80`
                      }}
                    />
                  </motion.div>
                </motion.div>

                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8"
                  style={{ color: theme.text.primary }}
                >
                  The Future of Role Playing
                </h2>
                <p 
                  className="text-lg sm:text-xl mb-6 sm:mb-8 px-4"
                  style={{ color: theme.text.secondary }}
                >
                  We envision a world where the boundaries between fiction and reality blur, where every story is interactive, 
                  and where your imagination is the only limit. Fiction Fusion is just the beginning of this journey.
                </p>
                
                {/* Enhanced Call to Action */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleJoinCommunity}
                  className="inline-block"
                >
                  <div 
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${theme.special.lime}, ${theme.special.magenta})`,
                      color: theme.background.primary,
                      boxShadow: `0 0 30px ${theme.special.lime}50`
                    }}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Shield className="w-5 sm:w-6 h-5 sm:h-6" />
                      <span>Join Our Community</span>
                      <Sparkles className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                  </div>
                </motion.button>
                
                <p 
                  className="mt-4 sm:mt-6 text-sm sm:text-base px-4"
                  style={{ color: theme.text.secondary }}
                >
                  Be part of the revolution in interactive storytelling. Create, explore, and connect with characters and stories like never before.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;