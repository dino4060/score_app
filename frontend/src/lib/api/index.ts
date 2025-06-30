// src/api/index.ts
import { reportsApi } from "./reports.api";
import { scoresApi } from "./scores.api";

export const api = {
    scores: scoresApi,
    reports: reportsApi
}