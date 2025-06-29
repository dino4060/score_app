export type Subject =
    | 'math' | 'literature' | 'language2'
    | 'physics' | 'chemistry' | 'biology'
    | 'history' | 'geography' | 'civics';

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