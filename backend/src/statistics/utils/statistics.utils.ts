import { Level, Subject } from "../response/statistics.response";

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
]
