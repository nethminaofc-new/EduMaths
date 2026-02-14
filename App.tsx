import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Background } from './components/Background';
import { LoginForm } from './components/LoginForm';
import { StudentInfo } from './components/StudentInfo';
import { ResultCard } from './components/ResultCard';
import { MusicPlayer } from './components/MusicPlayer';
import { Student } from './types';
import { STUDENTS } from './constants';

type ViewState = 'login' | 'info' | 'result';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('login');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  
  // Default to dark/glass theme
  const isDark = true;

  // Rank Calculation
  const getRank = (id: string) => {
    // Sort students by result descending
    const sorted = [...STUDENTS].sort((a, b) => b.result - a.result);
    const rank = sorted.findIndex(s => s.studentId === id) + 1;
    return { current: rank, total: STUDENTS.length };
  };

  const handleLogin = (student: Student) => {
    setCurrentStudent(student);
    setView('info');
  };

  const handleConfirm = () => {
    setView('result');
  };

  const handleBackToLogin = () => {
    setCurrentStudent(null);
    setView('login');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 text-white bg-slate-900">
      <Background />
      
      {/* Top Bar Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
        <MusicPlayer />
      </div>

      <main className="relative z-10 w-full flex justify-center">
        <AnimatePresence mode="wait">
          {view === 'login' && (
            <LoginForm key="login" onLogin={handleLogin} />
          )}

          {view === 'info' && currentStudent && (
            <StudentInfo 
              key="info" 
              student={currentStudent} 
              onConfirm={handleConfirm}
              onBack={handleBackToLogin}
            />
          )}

          {view === 'result' && currentStudent && (
            <ResultCard 
              key="result" 
              student={currentStudent} 
              rank={getRank(currentStudent.studentId)}
              onHome={handleBackToLogin}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <div className="fixed bottom-4 text-xs font-mono select-none z-0 text-white/20">
        EduMaths v2.0 • Pro Dashboard
      </div>
    </div>
  );
};

export default App;