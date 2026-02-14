import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 ${
        isDark 
          ? 'bg-white/10 text-yellow-300 border border-white/20' 
          : 'bg-white/80 text-orange-500 border border-slate-200'
      }`}
      aria-label="Toggle Theme"
    >
      {isDark ? <Moon className="h-5 w-5 fill-current" /> : <Sun className="h-5 w-5 fill-current" />}
    </motion.button>
  );
};