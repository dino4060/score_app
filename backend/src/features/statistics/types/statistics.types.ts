import { Score } from "src/features/scores/entities/score.entity";

export type Subject =
    'math' | 'literature' | 'language2' |
    'physics' | 'chemistry' | 'biology' |
    'history' | 'geography' | 'civics';

export type Group = {
    name: 'A00' | 'A01' | 'A02' | 'B00' | 'C00' | 'D00',
    subjects: Subject[];
    language2_type?: String;
};

export type Level = {
    name: 'good' | 'fair' | 'standard' | 'bad';
    min: number;
    max: number;
}

export type LevelCount = {
    level: string;
    count: number;
};

export type SubjectReport = {
    subject: Subject;
    counts: LevelCount[];
};

export type TotalReport = {
    reports: SubjectReport[]
}

export type ScoreByGroup = Partial<Score> & {
    registrationNumber: number;
    total: number;
};