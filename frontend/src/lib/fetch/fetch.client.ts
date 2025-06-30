import { TApiDefinition } from "@/types/base.types";
import clientCookies from "../storage/cookie.client";
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

    // get client cookies
    const ACCESS_TOKEN = clientCookies.get("ACCESS_TOKEN");

    // include ACCESS_TOKEN
    if (withAuth && ACCESS_TOKEN) {
        headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`
    }

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