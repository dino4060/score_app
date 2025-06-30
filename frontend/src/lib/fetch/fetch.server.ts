import { TApiDefinition } from "@/types/base.types";
import { fetchSafely } from "./config";

export const buildHeader = async (
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
    withAuth: boolean = false
) => {
    // config header: include a pair of token
    const headers = await buildHeader(options, withAuth);

    // fetch
    return await fetch(endpoint, {
        ...options,
        headers,
    });
}

export const serverFetch = async <T = any>(api: TApiDefinition<T>) => {
    return fetchSafely<T>(api, fetchCore);
}