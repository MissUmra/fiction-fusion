import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Smile, Frown, Angry, Heart, Zap, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RandomFillButton from '../components/RandomFillButton';
import { useTheme } from '../contexts/ThemeContext';
import { darkTheme, lightTheme } from '../utils/colors';

const PlaySetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const [formData, setFormData] = useState({
    mood: 'funny',
    aiCharacterName: '',
    aiCharacterSource: '',
    userCharacterName: '',
    userCharacterSource: '',
    sceneDescription: ''
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
      aiCharacterName: 'Marinette Dupain-Cheng',
      aiCharacterSource: 'Miraculous Ladybug Season 3',
      userCharacterName: 'Alya Césaire',
      userCharacterSource: 'Miraculous Ladybug Season 5',
      sceneDescription: 'Marinette from Season 3 Episode 6 meets Alya from Season 5 beginning in a parallel universe café where they discuss their different experiences with Ladybug and Cat Noir.'
    },
    {
      aiCharacterName: 'Goku',
      aiCharacterSource: 'Dragon Ball Z Saiyan Saga',
      userCharacterName: 'Vegeta',
      userCharacterSource: 'Dragon Ball Super',
      sceneDescription: 'Young Goku from the Saiyan Saga encounters future Vegeta from Dragon Ball Super in a time rift during a training session.'
    },
    {
      aiCharacterName: 'Harry Potter',
      aiCharacterSource: 'Harry Potter Year 1',
      userCharacterName: 'Hermione Granger',
      userCharacterSource: 'Harry Potter Year 7',
      sceneDescription: 'First-year Harry meets seventh-year Hermione in the Room of Requirement through a magical time loop.'
    },
    {
      aiCharacterName: 'Elsa',
      aiCharacterSource: 'Frozen 1',
      userCharacterName: 'Anna',
      userCharacterSource: 'Frozen 2',
      sceneDescription: 'Elsa from the first movie meets Anna from after the events of Frozen 2 in the Enchanted Forest.'
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
    if (formData.aiCharacterName && formData.aiCharacterSource && formData.userCharacterName && formData.sceneDescription) {
      navigate('/chat', { state: { type: 'play', ...formData } });
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
              style={{ background: theme.gradients.play }}
            >
              <Gamepad2 className="w-10 h-10" style={{ color: theme.background.primary }} />
            </div>
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: theme.text.primary }}
            >
              Role Play Setup
            </h1>
            <p 
              className="text-xl"
              style={{ color: theme.text.secondary }}
            >
              Create interactive scenarios with cross-dimensional adventures
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
                Setup Your Role Play
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
                  Scene Mood
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

              {/* AI Character */}
              <div className="space-y-4">
                <h3 
                  className="text-lg font-semibold flex items-center"
                  style={{ color: theme.text.primary }}
                >
                  <div 
                    className="w-6 h-6 rounded-full mr-2"
                    style={{ backgroundColor: theme.accent.secondary }}
                  />
                  AI Character
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Character name"
                    value={formData.aiCharacterName}
                    onChange={(e) => setFormData({ ...formData, aiCharacterName: e.target.value })}
                    className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: theme.background.secondary,
                      border: `1px solid ${theme.border.secondary}`,
                      color: theme.text.primary
                    }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="From (source)"
                    value={formData.aiCharacterSource}
                    onChange={(e) => setFormData({ ...formData, aiCharacterSource: e.target.value })}
                    className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: theme.background.secondary,
                      border: `1px solid ${theme.border.secondary}`,
                      color: theme.text.primary
                    }}
                    required
                  />
                </div>
              </div>

              {/* User Character */}
              <div className="space-y-4">
                <h3 
                  className="text-lg font-semibold flex items-center"
                  style={{ color: theme.text.primary }}
                >
                  <div 
                    className="w-6 h-6 rounded-full mr-2 flex items-center justify-center"
                    style={{ backgroundColor: theme.accent.primary }}
                  >
                    <User className="w-4 h-4" style={{ color: theme.background.primary }} />
                  </div>
                  Your Character
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Character you'll play"
                    value={formData.userCharacterName}
                    onChange={(e) => setFormData({ ...formData, userCharacterName: e.target.value })}
                    className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: theme.background.secondary,
                      border: `1px solid ${theme.border.secondary}`,
                      color: theme.text.primary
                    }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="From (source)"
                    value={formData.userCharacterSource}
                    onChange={(e) => setFormData({ ...formData, userCharacterSource: e.target.value })}
                    className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: theme.background.secondary,
                      border: `1px solid ${theme.border.secondary}`,
                      color: theme.text.primary
                    }}
                  />
                </div>
              </div>

              {/* Scene Description */}
              <div>
                <label 
                  className="block text-lg font-semibold mb-4"
                  style={{ color: theme.text.primary }}
                >
                  Scene & Timeline Description *
                </label>
                <textarea
                  placeholder="Describe the scene, time period, location, and any cross-dimensional elements. E.g., 'Marinette from Miraculous Season 3 Episode 6 meets Alya from Season 6 beginning in a parallel universe café...'"
                  value={formData.sceneDescription}
                  onChange={(e) => setFormData({ ...formData, sceneDescription: e.target.value })}
                  rows={5}
                  className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 resize-none transition-all"
                  style={{
                    backgroundColor: theme.background.secondary,
                    border: `1px solid ${theme.border.secondary}`,
                    color: theme.text.primary
                  }}
                  required
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
                    background: theme.gradients.play,
                    color: theme.background.primary
                  }}
                >
                  <Gamepad2 className="w-5 h-5" />
                  <span>Start Role Play</span>
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

export default PlaySetupPage;