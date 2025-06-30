import { Score } from "../entities/score.entity";

export type ScoreByGroup = Partial<Score> & {
    registrationNumber: number;
    total: number;
};