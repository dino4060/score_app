import { Group, Level, Subject } from "../types/statistics.types";

export const levels: Level[] = [
    { name: 'good', min: 8, max: 10 },
    { name: 'fair', min: 6, max: 7.9999 },
    { name: 'standard', min: 4, max: 5.9999 },
    { name: 'bad', min: 0, max: 3.9999 },
];

export const subjects: Subject[] = [
    'math', 'literature', 'language2',
    'physics', 'chemistry', 'biology',
    'history', 'geography', 'civics'
];

export const groups: Group[] = [
    { name: 'A00', subjects: ['math', 'physics', 'chemistry'] },
    { name: 'A01', subjects: ['math', 'physics', 'language2'], language2_type: 'N1' },
    { name: 'A02', subjects: ['math', 'physics', 'biology'] },
    { name: 'B00', subjects: ['math', 'biology', 'chemistry'] },
    { name: 'C00', subjects: ['literature', 'history', 'geography'] },
    { name: 'D00', subjects: ['literature', 'math', 'language2'], language2_type: 'N1' },
];
