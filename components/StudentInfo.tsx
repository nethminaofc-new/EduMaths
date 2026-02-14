import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, ArrowRight, LogOut } from 'lucide-react';
import { Student } from '../types';

interface StudentInfoProps {
  student: Student;
  onConfirm: () => void;
  onBack: () => void;
}

export const StudentInfo: React.FC<StudentInfoProps> = ({ student, onConfirm, onBack }) => {
  // Initialize greeting based on localStorage to avoid flash of incorrect text
  const [greeting, setGreeting] = useState(() => {
    const storageKey = `hasLoggedIn_${student.studentId}`;
    return localStorage.getItem(storageKey) ? 'Welcome Back' : 'WELCOME';
  });

  useEffect(() => {
    // Mark as logged in after initial render so next time it shows "Welcome back"
    const storageKey = `hasLoggedIn_${student.studentId}`;
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, 'true');
    }
  }, [student.studentId]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl text-center"
    >
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-white/10 rounded-full ring-4 ring-white/5">
          <UserCircle className="h-16 w-16 text-indigo-300" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-1">{greeting}</h2>
      <h3 className="text-xl text-indigo-200 mb-6 font-medium">{student.name}</h3>

      <div className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-indigo-200">Student ID</span>
          <span className="text-white font-mono">{student.studentId}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-indigo-200">Grade</span>
          <span className="text-white font-mono">{student.grade}</span>
        </div>
      </div>

      <p className="text-indigo-200 text-sm mb-6">
        Are you ready to view your mathematics examination results?
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={onConfirm}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
        >
          <span>View Results</span>
          <ArrowRight className="h-4 w-4" />
        </button>
        
        <button
          onClick={onBack}
          className="w-full bg-white/5 hover:bg-white/10 text-indigo-200 hover:text-white font-medium py-3.5 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all duration-300"
        >
          <LogOut className="h-4 w-4" />
          <span>Not you? Logout</span>
        </button>
      </div>
    </motion.div>
  );
};