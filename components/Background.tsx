import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MATH_SYMBOLS } from '../constants';

interface FloatingSymbol {
  id: number;
  char: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export const Background: React.FC = () => {
  const [symbols, setSymbols] = useState<FloatingSymbol[]>([]);

  useEffect(() => {
    // Generate random symbols on mount
    const count = 30; // Number of floating items
    const newSymbols: FloatingSymbol[] = [];

    for (let i = 0; i < count; i++) {
      newSymbols.push({
        id: i,
        char: MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)],
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        size: Math.random() * 20 + 14, // 14px to 34px
        duration: Math.random() * 10 + 10, // 10s to 20s
        delay: Math.random() * 5,
        rotation: Math.random() * 360,
      });
    }
    setSymbols(newSymbols);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
      {/* Soft gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.3),transparent_70%)] opacity-100" />

      {symbols.map((s) => (
        <motion.div
          key={s.id}
          className="absolute font-bold select-none pointer-events-none text-white/10"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: `${s.size}px`,
          }}
          initial={{ opacity: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.8, 0], // Fade in and out
            y: [-20, -100], // Move up
            rotate: [0, s.rotation], // Rotate
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "linear",
          }}
        >
          {s.char}
        </motion.div>
      ))}
    </div>
  );
};