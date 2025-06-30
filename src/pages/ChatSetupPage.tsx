import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Smile, Frown, Angry, Heart, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RandomFillButton from '../components/RandomFillButton';
import { useTheme } from '../contexts/ThemeContext';
import { darkTheme, lightTheme } from '../utils/colors';

const ChatSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const [formData, setFormData] = useState({
    mood: 'funny',
    characterName: '',
    characterSource: '',
    additionalInfo: ''
  });

  const moods = [
    { value: 'funny', label: 'Funny', icon: Smile, color: '#FFD93D' },
    { value: 'serious', label: 'Serious', icon: Zap, color: '#4ECDC4' },
    { value: 'sad', label: 'Sad', icon: Frown, color: '#95A5A6' },
    { value: 'angry', label: 'Angry', icon: Angry, color: '#FF6B6B' },
    { value: 'romantic', label: 'Romantic', icon: Heart, color: '#FF69B4' }
  ];

  const randomExamples = [
    {
      characterName: 'Sherlock Holmes',
      characterSource: 'Arthur Conan Doyle novels',
      additionalInfo: 'The brilliant detective from 221B Baker Street, known for his deductive reasoning and pipe smoking.'
    },
    {
      characterName: 'Hermione Granger',
      characterSource: 'Harry Potter series',
      additionalInfo: 'The brightest witch of her age, known for her vast knowledge and loyalty to her friends.'
    },
    {
      characterName: 'Tony Stark',
      characterSource: 'Marvel Cinematic Universe',
      additionalInfo: 'Genius billionaire philanthropist, also known as Iron Man. Sarcastic and witty.'
    },
    {
      characterName: 'Elsa',
      characterSource: 'Disney Frozen',
      additionalInfo: 'The Snow Queen with ice powers, learning to embrace her abilities and rule Arendelle.'
    },
    {
      characterName: 'Naruto Uzumaki',
      characterSource: 'Naruto anime series',
      additionalInfo: 'The energetic ninja from Hidden Leaf Village who dreams of becoming Hokage.'
    },
    {
      characterName: 'Elizabeth Bennet',
      characterSource: 'Pride and Prejudice',
      additionalInfo: 'The witty and independent protagonist known for her strong opinions and quick wit.'
    }
  ];

  const handleRandomFill = () => {
    const randomExample = randomExamples[Math.floor(Math.random() * randomExamples.length)];
    setFormData({
      ...formData,
      ...randomExample
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.characterName && formData.characterSource) {
      navigate('/chat', { state: { type: 'chat', ...formData } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: theme.gradients.chat }}
            >
              <MessageSquare className="w-10 h-10" style={{ color: theme.background.primary }} />
            </div>
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: theme.text.primary }}
            >
              Character Chat Setup
            </h1>
            <p 
              className="text-xl"
              style={{ color: theme.text.secondary }}
            >
              Configure your conversation with any character from any universe
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="p-8 rounded-3xl"
            style={{ 
              backgroundColor: theme.glass.background,
              border: `1px solid ${theme.border.primary}`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 
                className="text-xl font-semibold"
                style={{ color: theme.text.primary }}
              >
                Setup Your Chat
              </h2>
              <RandomFillButton onRandomFill={handleRandomFill} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Mood Selection */}
              <div>
                <label 
                  className="block text-lg font-semibold mb-4"
                  style={{ color: theme.text.primary }}
                >
                  Conversation Mood
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {moods.map((mood) => {
                    const Icon = mood.icon;
                    return (
                      <motion.button
                        key={mood.value}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData({ ...formData, mood: mood.value })}
                        className="p-4 rounded-xl border-2 transition-all duration-300"
                        style={{
                          borderColor: formData.mood === mood.value ? theme.accent.primary : theme.border.secondary,
                          backgroundColor: formData.mood === mood.value ? `${theme.accent.primary}20` : 'transparent'
                        }}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: mood.color }} />
                        <span 
                          className="text-sm font-medium"
                          style={{ color: theme.text.primary }}
                        >
                          {mood.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Character Name */}
              <div>
                <label 
                  className="block text-lg font-semibold mb-4"
                  style={{ color: theme.text.primary }}
                >
                  Character Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Rapunzel, Spiderman, Sherlock Holmes"
                  value={formData.characterName}
                  onChange={(e) => setFormData({ ...formData, characterName: e.target.value })}
                  className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: theme.background.secondary,
                    border: `1px solid ${theme.border.secondary}`,
                    color: theme.text.primary,
                    focusRingColor: theme.accent.primary
                  }}
                  required
                />
              </div>

              {/* Character Source */}
              <div>
                <label 
                  className="block text-lg font-semibold mb-4"
                  style={{ color: theme.text.primary }}
                >
                  From *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Tangled, Marvel Avengers, Sherlock Holmes novels"
                  value={formData.characterSource}
                  onChange={(e) => setFormData({ ...formData, characterSource: e.target.value })}
                  className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: theme.background.secondary,
                    border: `1px solid ${theme.border.secondary}`,
                    color: theme.text.primary
                  }}
                  required
                />
              </div>

              {/* Additional Info */}
              <div>
                <label 
                  className="block text-lg font-semibold mb-4"
                  style={{ color: theme.text.primary }}
                >
                  Additional Character Information (Optional)
                </label>
                <textarea
                  placeholder="Any specific details about the character's personality, background, or version you want to chat with..."
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  rows={4}
                  className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 resize-none transition-all"
                  style={{
                    backgroundColor: theme.background.secondary,
                    border: `1px solid ${theme.border.secondary}`,
                    color: theme.text.primary
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-4 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  style={{
                    background: theme.gradients.chat,
                    color: theme.background.primary
                  }}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Start Chat</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChatSetupPage;