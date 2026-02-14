import { GradeInfo } from './types';

export const calculateGrade = (marks: number): GradeInfo => {
  if (marks >= 75) {
    return { letter: 'A', text: 'Excellent', color: 'text-yellow-300' };
  } else if (marks >= 65) {
    return { letter: 'B', text: 'Very Good', color: 'text-blue-300' };
  } else if (marks >= 55) {
    return { letter: 'C', text: 'Good', color: 'text-green-300' };
  } else if (marks >= 35) {
    return { letter: 'S', text: 'Be more interested!', color: 'text-orange-300' };
  } else {
    return { letter: 'W', text: 'Bad Result', color: 'text-red-400' };
  }
};
