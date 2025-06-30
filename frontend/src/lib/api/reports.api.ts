// src/lib/api/checkout.api.ts
import { HttpMethod, RESOURCES } from "@/lib/constants";
import { TApiDefinition } from "@/types/base.types";
import { Group, Subject, TotalReport } from "@/types/report.types";
import { ScoreByGroup } from "@/types/score.types";

export const reportsApi = {
    // PUBLIC //

    // QUERY //

    reportSubjects: (subjects: Subject[]): TApiDefinition<TotalReport> => ({
        route: `${RESOURCES.REPORTS.PUBLIC}/subjects`,
        method: HttpMethod.GET,
        query: subjects
    }),

    topGroup: (group: Group): TApiDefinition<ScoreByGroup[]> => ({
        route: `${RESOURCES.REPORTS.PUBLIC}/tops/group`,
        method: HttpMethod.GET,
        query: group
    })
};
