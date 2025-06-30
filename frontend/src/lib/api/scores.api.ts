// src/lib/api/checkout.api.ts
import { HttpMethod, RESOURCES } from "@/lib/constants";
import { TApiDefinition } from "@/types/base.types";
import { TScore } from "@/types/score.types";

export const scoresApi = {
    // PUBLIC //

    // QUERY //

    searchScore: (registrationNumber: string): TApiDefinition<TScore> => ({
        route: `${RESOURCES.SCORES.PUBLIC}/search/${registrationNumber}`,
        method: HttpMethod.GET,
    })
};
