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

export type ScoreByGroup = Partial<TScore> & {
    registrationNumber: number;
    total: number;
};