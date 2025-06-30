import { Group } from "src/features/statistics/types/statistics.types";
import { Score } from "../entities/score.entity";

export type ScoreByGroup = Partial<Score> & {
    registrationNumber: number;
    total: number;
};

export type GroupScore = {
    [key in Group['name']]: number | null;
};