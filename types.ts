export interface Student {
  studentId: string;
  password: string; // In a real app, this should be hashed
  name: string;
  grade: string; // The class grade (e.g., "11")
  result: number; // The marks (0-100)
  previousResults: number[]; // Array of marks from previous exams
  lastExamDate: string; // ISO date string YYYY-MM-DD
}

export type GradeLetter = 'A' | 'B' | 'C' | 'S' | 'W';

export interface GradeInfo {
  letter: GradeLetter;
  text: string;
  color: string;
}