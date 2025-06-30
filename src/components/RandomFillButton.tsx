import React from 'react';
import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';

interface RandomFillButtonProps {
  onRandomFill: () => void;
  className?: string;
}

const RandomFillButton: React.FC<RandomFillButtonProps> = ({ onRandomFill, className = "" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onRandomFill}
      className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 ${className}`}
      title="Fill with random example data"
    >
      <Shuffle className="w-4 h-4" />
      <span className="text-sm font-medium">Random Fill</span>
    </motion.button>
  );
};

export default RandomFillButton;