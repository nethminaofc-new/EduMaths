import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { STUDENTS } from '../constants';
import { Student } from '../types';

interface LoginFormProps {
  onLogin: (student: Student) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const student = STUDENTS.find(
      (s) => s.studentId === studentId && s.password === password
    );

    if (student) {
      onLogin(student);
    } else {
      setError('Invalid Student ID or Password');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">EduMaths</h1>
        <p className="text-indigo-200 text-sm">Student Result Portal</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-indigo-100 ml-1">Student ID</label>
          <div className="relative group">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Ex: S1000"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:bg-white/10 transition-all duration-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-indigo-100 ml-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-white transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:bg-white/10 transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-indigo-300 hover:text-white transition-colors focus:outline-none p-1 rounded-md hover:bg-white/5"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-red-300 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
          >
            {error}
          </motion.div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Login</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </motion.div>
  );
};