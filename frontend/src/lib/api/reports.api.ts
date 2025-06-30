// src/lib/api/checkout.api.ts
import { HttpMethod, RESOURCES } from "@/lib/constants";
import { TApiDefinition } from "@/types/base.types";
import { TGroup, TGroupQuery, TSubject, TSubjectQuery, TotalReport } from "@/types/report.types";
import { TScoreByGroup } from "@/types/score.types";

export const reportsApi = {
    // PUBLIC //

    // QUERY //

    reportSubjects: (subjects: TSubjectQuery[]): TApiDefinition<TotalReport> => ({
        route: `${RESOURCES.REPORTS.PUBLIC}/subjects`,
        method: HttpMethod.GET,
        query: subjects
    }),

    topGroup: (group: TGroupQuery): TApiDefinition<TScoreByGroup[]> => ({
        route: `${RESOURCES.REPORTS.PUBLIC}/tops/group`,
        method: HttpMethod.GET,
        query: group
    })
};
