import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageSquare, Gamepad2, PenTool, HelpCircle, Lightbulb, Target, Compass, Wand2, Crown, Rocket } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { darkTheme } from '../utils/colors';

const HelpPage: React.FC = () => {
  const theme = darkTheme;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I start chatting with a character?",
      answer: "Simply click on the 'Chat' feature from the home page, fill in the character name and source (like 'Spiderman from Marvel'), select your conversation mood, and optionally add any specific character details. Then click 'Start Chat' to begin your conversation!"
    },
    {
      question: "What's the difference between Chat, Play, and Create modes?",
      answer: "Chat mode is for simple conversations with characters. Play mode lets you role-play as a character yourself in interactive scenarios. Create mode allows you to director your own stories with multiple characters from different universes."
    },
    {
      question: "Can I chat with characters from any universe?",
      answer: "Yes! You can chat with characters from movies, TV shows, anime, books, novels, games, and any fictional universe you can think of. Just specify the character name and their source material."
    },
    {
      question: "How does the AI understand different characters?",
      answer: "Our AI is trained to understand character personalities, backgrounds, and traits from various fictional universes. When you specify a character and their source, the AI adapts to match their unique personality and speaking style."
    },
    {
      question: "What are mood settings and how do they work?",
      answer: "Mood settings (funny, serious, sad, angry, romantic) influence the tone and style of your conversation. They help the AI respond in a way that matches the emotional atmosphere you want to create."
    },
    {
      question: "Can I save my conversations?",
      answer: "Yes! All your conversations are automatically saved to your profile. You can access your chat history anytime from your profile page."
    },
    {
      question: "How do cross-dimensional scenarios work in Play mode?",
      answer: "In Play mode, you can create scenarios where characters from different universes, time periods, or dimensions interact. For example, you could have a character from Season 1 meet the same character from Season 5, or mix characters from completely different shows."
    },
    {
      question: "Is there a limit to how many characters I can add in Create mode?",
      answer: "You can add multiple AI characters in Create mode, though we recommend starting with 2-3 characters for the best experience. You can always create new stories with different character combinations."
    },
    {
      question: "What should I do if a character isn't responding as expected?",
      answer: "Try being more specific about the character's source material or add additional context in the character information field. You can also adjust the mood setting or restart the conversation with more detailed character descriptions."
    },
    {
      question: "Are there any Easter eggs in Fiction Fusion?",
      answer: "Yes! We've hidden various Easter eggs throughout the platform, including mini-games and interactive animations. Keep exploring different sections and try clicking on various elements to discover them!"
    }
  ];

  const guides = [
    {
      icon: MessageSquare,
      title: "Getting Started with Chat",
      description: "Learn how to have engaging conversations with any character",
      gradient: `linear-gradient(135deg, ${theme.special.lime}, ${theme.special.yellow})`,
      shadowColor: theme.special.lime,
      steps: [
        "Choose the Chat option from the home page",
        "Enter your character's name and source material",
        "Select a conversation mood",
        "Add any specific character details (optional)",
        "Start chatting and enjoy the conversation!"
      ]
    },
    {
      icon: Gamepad2,
      title: "Role-Playing Guide",
      description: "Master the art of interactive role-playing scenarios",
      gradient: `linear-gradient(135deg, ${theme.special.magenta}, ${theme.accent.secondary})`,
      shadowColor: theme.special.magenta,
      steps: [
        "Select the Play option from the home page",
        "Choose an AI character and your own character",
        "Describe the scene, time, and setting",
        "Define any cross-dimensional elements",
        "Begin your interactive role-play adventure!"
      ]
    },
    {
      icon: PenTool,
      title: "Story Creation Tips",
      description: "Create compelling stories with multiple characters",
      gradient: `linear-gradient(135deg, ${theme.special.yellow}, ${theme.accent.primary})`,
      shadowColor: theme.special.yellow,
      steps: [
        "Click on the Create option from the home page",
        "Select your character and add AI characters",
        "Write a detailed story script and setting",
        "Define the scene, time, and place",
        "Direct your unique crossover story!"
      ]
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
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
      
      <main className="flex-1 py-12 sm:py-16 md:py-20 relative overflow-hidden z-10">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            {/* Enhanced Hero Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mx-auto mb-6 sm:mb-8 relative"
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
                  boxShadow: `0 0 40px ${theme.special.lime}60`
                }}
              >
                <Lightbulb className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-white drop-shadow-lg" />
                
                {/* Enhanced Orbiting Elements */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle, ${theme.special.yellow}, ${theme.special.lime})`,
                    boxShadow: `0 0 15px ${theme.special.yellow}80`
                  }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle, ${theme.special.magenta}, ${theme.special.coral})`,
                    boxShadow: `0 0 12px ${theme.special.magenta}80`
                  }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 -right-3 sm:-right-4 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle, ${theme.accent.primary}, ${theme.special.mint})`,
                    boxShadow: `0 0 10px ${theme.accent.primary}80`
                  }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-1/2 -left-3 sm:-left-4 w-2 sm:w-3 h-2 sm:h-3 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle, ${theme.special.coral}, ${theme.special.peach})`,
                    boxShadow: `0 0 8px ${theme.special.coral}80`
                  }}
                />
              </motion.div>
            </motion.div>

            <h1 
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: theme.text.primary }}
            >
              Help & Support
            </h1>
            <p 
              className="text-lg sm:text-xl px-4"
              style={{ color: theme.text.secondary }}
            >
              Everything you need to know about Fiction Fusion
            </p>
          </motion.div>

          {/* Quick Start Guides */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-12 sm:mb-16"
          >
            <div className="text-center mb-8 sm:mb-12">
              {/* Enhanced Section Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 mx-auto mb-4 sm:mb-6 relative"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full rounded-full flex items-center justify-center shadow-2xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.special.lime}, ${theme.special.magenta})`,
                    boxShadow: `0 0 25px ${theme.special.lime}50`
                  }}
                >
                  <Compass className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white drop-shadow-lg" />
                </motion.div>
              </motion.div>

              <h2 
                className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center"
                style={{ color: theme.text.primary }}
              >
                Quick Start Guides
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {guides.map((guide, index) => {
                const Icon = guide.icon;
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
                      boxShadow: `0 0 30px ${guide.shadowColor}20`
                    }}
                  >
                    {/* Enhanced Background Glow */}
                    <div 
                      className="absolute inset-0 opacity-10 rounded-3xl"
                      style={{ background: guide.gradient }}
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
                        background: guide.gradient,
                        boxShadow: `0 0 25px ${guide.shadowColor}60, inset 0 0 20px rgba(255,255,255,0.1)`
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
                      
                      <Icon className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white relative z-10 drop-shadow-lg" />
                      
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
                      {guide.title}
                    </h3>
                    <p 
                      className="mb-4 sm:mb-6 relative z-10 text-sm sm:text-base"
                      style={{ color: theme.text.secondary }}
                    >
                      {guide.description}
                    </p>
                    <ol className="space-y-2 sm:space-y-3 relative z-10">
                      {guide.steps.map((step, stepIndex) => (
                        <motion.li 
                          key={stepIndex} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: stepIndex * 0.1 }}
                          className="text-xs sm:text-sm flex items-start"
                        >
                          <motion.span 
                            whileHover={{ scale: 1.1 }}
                            className="w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2 sm:mr-3 mt-0.5 flex-shrink-0 shadow-lg"
                            style={{
                              background: `linear-gradient(135deg, ${guide.shadowColor}, ${theme.accent.primary})`,
                              color: theme.background.primary,
                              boxShadow: `0 0 10px ${guide.shadowColor}40`
                            }}
                          >
                            {stepIndex + 1}
                          </motion.span>
                          <span style={{ color: theme.text.tertiary }}>{step}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="text-center mb-8 sm:mb-12">
              {/* Enhanced FAQ Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 mx-auto mb-4 sm:mb-6 relative"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-full h-full rounded-full flex items-center justify-center shadow-2xl"
                  style={{ 
                    background: `conic-gradient(from 0deg, ${theme.special.magenta}, ${theme.special.yellow}, ${theme.special.lime}, ${theme.special.magenta})`,
                    boxShadow: `0 0 25px ${theme.special.magenta}50`
                  }}
                >
                  <HelpCircle className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white drop-shadow-lg" />
                </motion.div>
              </motion.div>

              <h2 
                className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center"
                style={{ color: theme.text.primary }}
              >
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="rounded-2xl overflow-hidden backdrop-blur-md"
                  style={{
                    backgroundColor: theme.glass.background,
                    border: `2px solid ${theme.border.primary}`,
                    boxShadow: `0 0 20px ${theme.special.lime}15`
                  }}
                >
                  <motion.button
                    whileHover={{ backgroundColor: `${theme.special.lime}10` }}
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-6 text-left flex items-center justify-between transition-all duration-300"
                  >
                    <h3 
                      className="text-base sm:text-lg font-semibold pr-4"
                      style={{ color: theme.text.primary }}
                    >
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: theme.special.lime }} />
                      ) : (
                        <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: theme.text.tertiary }} />
                      )}
                    </motion.div>
                  </motion.button>
                  
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 sm:px-6 pb-4 sm:pb-6"
                      style={{ borderTop: `1px solid ${theme.border.primary}` }}
                    >
                      <p 
                        className="leading-relaxed text-sm sm:text-base"
                        style={{ color: theme.text.secondary }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpPage;