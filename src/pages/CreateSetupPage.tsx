import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PenTool, Smile, Frown, Angry, Heart, Zap, User, Plus, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RandomFillButton from '../components/RandomFillButton';
import { useTheme } from '../contexts/ThemeContext';
import { darkTheme, lightTheme } from '../utils/colors';

interface Character {
  name: string;
  source: string;
}

const CreateSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const [formData, setFormData] = useState({
    mood: 'funny',
    userCharacterName: '',
    userCharacterSource: '',
    storyScript: ''
  });
  const [aiCharacters, setAiCharacters] = useState<Character[]>([{ name: '', source: '' }]);

  const moods = [
    { value: 'funny', label: 'Funny', icon: Smile, color: '#FFD93D' },
    { value: 'serious', label: 'Serious', icon: Zap, color: '#4ECDC4' },
    { value: 'sad', label: 'Sad', icon: Frown, color: '#95A5A6' },
    { value: 'angry', label: 'Angry', icon: Angry, color: '#FF6B6B' },
    { value: 'romantic', label: 'Romantic', icon: Heart, color: '#FF69B4' }
  ];

  const randomExamples = [
    {
      userCharacterName: 'Spider-Man',
      userCharacterSource: 'Marvel Avengers',
      aiCharacters: [
        { name: 'Kevin 11', source: 'Ben 10' },
        { name: 'Geronimo Stilton', source: 'Geronimo Stilton novels' }
      ],
      storyScript: 'Spider-Man from the Avengers, Kevin 11 from Ben 10, and Geronimo Stilton meet at an interdimensional restaurant to discuss their different approaches to heroism and adventure. The setting is a floating café between dimensions where time moves differently.'
    },
    {
      userCharacterName: 'Hermione Granger',
      userCharacterSource: 'Harry Potter',
      aiCharacters: [
        { name: 'Senku Ishigami', source: 'Dr. Stone' },
        { name: 'Twilight Sparkle', source: 'My Little Pony' }
      ],
      storyScript: 'Three brilliant minds from different worlds - Hermione with her magical knowledge, Senku with his scientific genius, and Twilight with her friendship magic - collaborate to solve a mystery that threatens all their dimensions.'
    },
    {
      userCharacterName: 'Naruto Uzumaki',
      userCharacterSource: 'Naruto',
      aiCharacters: [
        { name: 'Monkey D. Luffy', source: 'One Piece' },
        { name: 'Natsu Dragneel', source: 'Fairy Tail' }
      ],
      storyScript: 'Three energetic protagonists from different anime worlds find themselves in a tournament arena where they must work together to face challenges that test not just their strength, but their bonds of friendship.'
    }
  ];

  const handleRandomFill = () => {
    const randomExample = randomExamples[Math.floor(Math.random() * randomExamples.length)];
    setFormData({
      ...formData,
      userCharacterName: randomExample.userCharacterName,
      userCharacterSource: randomExample.userCharacterSource,
      storyScript: randomExample.storyScript
    });
    setAiCharacters(randomExample.aiCharacters);
  };

  const addCharacter = () => {
    setAiCharacters([...aiCharacters, { name: '', source: '' }]);
  };

  const removeCharacter = (index: number) => {
    if (aiCharacters.length > 1) {
      setAiCharacters(aiCharacters.filter((_, i) => i !== index));
    }
  };

  const updateCharacter = (index: number, field: 'name' | 'source', value: string) => {
    const updated = aiCharacters.map((char, i) => 
      i === index ? { ...char, [field]: value } : char
    );
    setAiCharacters(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validCharacters = aiCharacters.filter(char => char.name && char.source);
    if (formData.userCharacterName && formData.storyScript && validCharacters.length > 0) {
      navigate('/chat', { 
        state: { 
          type: 'create', 
          ...formData, 
          aiCharacters: validCharacters 
        } 
      });
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
              style={{ background: theme.gradients.create }}
            >
              <PenTool className="w-10 h-10" style={{ color: theme.background.primary }} />
            </div>
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: theme.text.primary }}
            >
              Story Creation Setup
            </h1>
            <p 
              className="text-xl"
              style={{ color: theme.text.secondary }}
            >
              Direct your own unique story with characters from different worlds
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
                Create Your Story
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
                  Story Mood
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

              {/* AI Characters */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 
                    className="text-lg font-semibold flex items-center"
                    style={{ color: theme.text.primary }}
                  >
                    <div 
                      className="w-6 h-6 rounded-full mr-2"
                      style={{ backgroundColor: theme.accent.secondary }}
                    />
                    AI Characters
                  </h3>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addCharacter}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:opacity-80 transition-colors"
                    style={{ 
                      backgroundColor: theme.accent.secondary,
                      color: theme.background.primary
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Character</span>
                  </motion.button>
                </div>
                
                {aiCharacters.map((character, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Character name"
                        value={character.name}
                        onChange={(e) => updateCharacter(index, 'name', e.target.value)}
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
                        value={character.source}
                        onChange={(e) => updateCharacter(index, 'source', e.target.value)}
                        className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: theme.background.secondary,
                          border: `1px solid ${theme.border.secondary}`,
                          color: theme.text.primary
                        }}
                        required
                      />
                    </div>
                    {aiCharacters.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCharacter(index)}
                        className="p-2 rounded-lg transition-colors hover:opacity-80"
                        style={{ color: '#FF6B6B' }}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Story Script */}
              <div>
                <label 
                  className="block text-lg font-semibold mb-4"
                  style={{ color: theme.text.primary }}
                >
                  Story Script & Setting *
                </label>
                <textarea
                  placeholder="Describe your story setting, scene, time, place, and initial scenario. E.g., 'Spider-man from Avengers, Kevin 11 from Ben 10, and Geronimo Stilton meet at a dinner table in a interdimensional restaurant to discuss...'"
                  value={formData.storyScript}
                  onChange={(e) => setFormData({ ...formData, storyScript: e.target.value })}
                  rows={6}
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
                    background: theme.gradients.create,
                    color: theme.background.primary
                  }}
                >
                  <PenTool className="w-5 h-5" />
                  <span>Create Story</span>
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

export default CreateSetupPage;