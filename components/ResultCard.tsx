import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Home, Award, BookOpen, Calendar, TrendingUp, Trophy } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Student } from '../types';
import { calculateGrade } from '../utils';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ResultCardProps {
  student: Student;
  rank: { current: number; total: number };
  onHome: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ student, rank, onHome }) => {
  const gradeInfo = calculateGrade(student.result);
  const isExcellent = gradeInfo.letter === 'A';
  const isRankOne = rank.current === 1;

  // Confetti effect for A grade
  useEffect(() => {
    if (isExcellent) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isExcellent]);

  // Chart Configuration
  const chartData = {
    labels: ['Exam 1', 'Exam 2', 'Exam 3', 'Exam 4', 'Final'],
    datasets: [
      {
        label: 'Performance History',
        data: student.previousResults,
        borderColor: 'rgba(129, 140, 248, 1)',
        backgroundColor: 'rgba(129, 140, 248, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#fff',
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
        }
      },
    },
  };

  // Format Date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-5xl p-6 md:p-8 rounded-3xl backdrop-blur-xl border border-white/10 bg-slate-900/60 shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Result Summary */}
        <div className="col-span-1 bg-slate-900/60 border-white/5 rounded-2xl p-6 flex flex-col items-center backdrop-blur-md border shadow-inner">
          
          <div className="text-center w-full mb-6">
             <h2 className="text-xl font-bold text-white truncate">{student.name}</h2>
             <div className="flex items-center justify-center gap-2 mt-2 text-xs text-indigo-300">
               <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                  <BookOpen className="h-3 w-3" /> Grade {student.grade}
               </span>
               <span>•</span>
               <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                  <Calendar className="h-3 w-3" /> {formatDate(student.lastExamDate)}
               </span>
             </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center w-full gap-6">
            
            {/* Grade Letter Section */}
            <div className="relative flex flex-col items-center">
              {isExcellent && (
                <motion.div 
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 blur-2xl rounded-full"
                />
              )}
              
              <div className={`text-8xl font-extrabold ${gradeInfo.color} drop-shadow-2xl relative z-10 leading-none`}>
                {gradeInfo.letter}
              </div>
              
              <div className={`mt-2 px-4 py-1.5 rounded-full flex items-center gap-2 border bg-white/5 border-white/10`}>
                <span className={`text-sm font-semibold ${gradeInfo.color}`}>
                  {gradeInfo.text}
                </span>
              </div>
            </div>

            {/* Prominent Score Display */}
            <div className="flex flex-col items-center bg-white/5 px-8 py-4 rounded-2xl border border-white/5 w-full">
               <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-1">Total Mark</span>
               <div className="flex items-baseline">
                  <span className="text-6xl font-black text-white leading-none tracking-tight">{student.result}</span>
                  <span className="text-xl font-medium text-white/40 ml-1">%</span>
               </div>
            </div>

          </div>

          <div className="w-full space-y-4 mt-6">
            {/* Rank Display */}
            <div className={`w-full p-3 rounded-xl flex items-center justify-center gap-3 ${isRankOne ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30' : 'bg-white/5'}`}>
              {isRankOne && <Trophy className="h-6 w-6 text-yellow-400 animate-bounce" />}
              <div className="text-center">
                <div className="text-xs font-medium uppercase tracking-wider text-indigo-300">Class Rank</div>
                <div className={`text-xl font-bold ${isRankOne ? 'text-yellow-400' : 'text-white'}`}>
                  {rank.current} <span className="text-sm opacity-50">/ {rank.total}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${student.result}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`h-full rounded-full bg-gradient-to-r ${
                  student.result >= 75 ? 'from-emerald-400 to-teal-500' :
                  student.result >= 55 ? 'from-blue-400 to-indigo-500' :
                  'from-orange-400 to-red-500'
                }`}
              />
            </div>
          </div>

        </div>

        {/* Right Column: Analytics */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          
          {/* Chart Card */}
          <div className="bg-slate-900/60 border-white/5 rounded-2xl p-6 backdrop-blur-md border shadow-inner flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-indigo-300" />
              </div>
              <h3 className="font-semibold text-white">Performance Analytics</h3>
            </div>
            
            {/* Fixed Height Container for Chart Stability */}
            <div className="relative w-full h-80 md:h-96">
              <Line options={chartOptions} data={chartData} />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 bg-slate-900/60 border-white/5 rounded-2xl flex flex-col sm:flex-row justify-between items-center backdrop-blur-md border shadow-inner gap-4">
             <div className="flex items-center gap-3 text-center sm:text-left">
               <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 hidden sm:block">
                 <Award className="h-6 w-6" />
               </div>
               <div>
                 <div className="text-sm font-medium text-white">
                   {isExcellent ? "Outstanding Performance!" : "Good Effort!"}
                 </div>
                 <div className="text-xs text-indigo-300">
                   {isExcellent ? "You're at the top of your class." : "Keep practicing to improve further."}
                 </div>
               </div>
             </div>
             
             <button
                onClick={onHome}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-3 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] font-medium"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
};