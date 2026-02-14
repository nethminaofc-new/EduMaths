import { Student } from './types';

export const STUDENTS: Student[] = [
  {
    studentId: "S1001",
    password: "1234",
    name: "Bhashitha Nethmina",
    grade: "12",
    result: 65,
    previousResults: [55, 60, 58, 62, 65],
    lastExamDate: "2026-02-10"
  },
  {
    studentId: "S1000",
    password: "1234",
    name: "N.T.Diduni Nimsara",
    grade: "11",
    result: 96,
    previousResults: [88, 92, 90, 95, 96],
    lastExamDate: "2026-02-10"
  },
  {
    studentId: "S1002",
    password: "1234",
    name: "Nadun Yoshitha",
    grade: "10",
    result: 37,
    previousResults: [40, 35, 30, 42, 37],
    lastExamDate: "2026-02-10"
  }
];

export const MATH_SYMBOLS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '−', '×', '÷', '=', '√', 'π', '∑', '∞', '∫', '≠', '≈'];