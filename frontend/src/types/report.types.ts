export type TSubject =
    'math' | 'literature' | 'language2' |
    'physics' | 'chemistry' | 'biology' |
    'history' | 'geography' | 'civics';

export type TGroup = 'A00' | 'A01' | 'A02' | 'B00' | 'C00' | 'D00';

export type Level = 'good' | 'fair' | 'standard' | 'bad';

export type TLevelCount = {
    level: Level;
    count: number;
};

export type TSubjectReport = {
    subject: TSubject;
    counts: TLevelCount[];
};

export type TotalReport = {
    reports: TSubjectReport[]
}

export type TSubjectQuery = {
    subject: TSubject
}

export type TGroupQuery = {
    group: TGroup
};