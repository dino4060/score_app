import { TApiDefinition } from "@/types/base.types";
import { fetchSafely } from "./config";

const buildHeader = async (
    options: RequestInit = {},
    withAuth: boolean = true
): Promise<HeadersInit> => {
    // init header
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    return headers;
}

const fetchCore = async (
    endpoint: RequestInfo,
    options: RequestInit = {},
    withAuth: boolean = true
) => {
    // config header: include access token
    const headers = await buildHeader(options, withAuth);

    // fetch: include refresh token
    return await fetch(endpoint, {
        ...options,
        credentials: "include",
        headers,
    });
}

export const clientFetch = async <T = any>(api: TApiDefinition<T>) => {
    return fetchSafely<T>(api, fetchCore);
}