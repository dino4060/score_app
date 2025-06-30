export type TScore = {
    id: number;
    registrationNumber: number | null;
    math: number | null;
    literature: number | null;
    language2: number | null;
    physics: number | null;
    chemistry: number | null;
    biology: number | null;
    history: number | null;
    geography: number | null;
    civics: number | null;
    language2_type: string | null;
}

export type Subject = {
    subject:
    'math' | 'literature' | 'language2' |
    'physics' | 'chemistry' | 'biology' |
    'history' | 'geography' | 'civics';
}

export type Group = {
    group: 'A00' | 'A01' | 'A02' | 'B00' | 'C00' | 'D00'
};

export type Level = 'good' | 'fair' | 'standard' | 'bad';

export type LevelCount = {
    level: Level;
    count: number;
};

export type SubjectReport = {
    subject: Subject;
    counts: LevelCount[];
};

export type TotalReport = {
    reports: SubjectReport[]
}