import { TGroup } from "./report.types";

export type TScore = {
    id: number;
    registrationNumber: number;
    math: number | null;
    literature: number | null;
    language2: number | null;
    physics: number | null;
    chemistry: number | null;
    biology: number | null;
    history: number | null;
    geography: number | null;
    civics: number | null;
    language2Type: string | null;
}

export type TScoreByGroup = Partial<TScore> & {
    registrationNumber: number;
    total: number;
};

export type TGroupScore = {
    [key in TGroup]: number | null;
};

export type TSearchScore = {
    studentScore: TScore;
    groupScore: TGroupScore;
};