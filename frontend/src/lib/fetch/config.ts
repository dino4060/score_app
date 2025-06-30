import { TApiDefinition, TApiResponse, TError } from "@/types/base.types";
import { env } from "../env";
import { HttpMethod } from "../constants";

export function buildEndpoint(route: string, query?: any): RequestInfo {
    const domain = `${env.BACKEND_DOMAIN}/${env.PREFIX_API}/${env.VERSIONING_API}`;

    const endpoint = `${domain}${route}`;

    if (!query || (Array.isArray(query) && query.length === 0)) {
        console.log(`>>> buildEndpoint: ${endpoint}`);
        return endpoint;
    }

    const searchParams = new URLSearchParams();

    if (Array.isArray(query)) {
        const key = Object.keys(query[0])[0];
        const values = query.map(item => item[key]).join(',');
        searchParams.append(`${key}s`, values);
    } else {
        Object.entries(query).forEach(([key, value]) =>
            searchParams.append(key, String(value)));
    }

    console.log(`>>> buildEndpoint: ${endpoint}?${searchParams.toString()}`);
    return `${endpoint}?${searchParams.toString()}`;

    // const queryRecord: Record<string, string> = query;
    // const queryString = new URLSearchParams(queryRecord).toString();
    // return `${endpoint}?${queryString}`;
}

export function buildOptions(method: HttpMethod, body?: any): RequestInit {
    if (!body) return { method };
    return {
        method,
        body: JSON.stringify(body),
    }
}

export function shouldAuth(route: string, withAuth: boolean = false): boolean {
    if (withAuth) return true;

    if (!route || typeof route !== 'string') throw new Error('>>> shouldAuth: invalid endpoint');
    const normalized = route.toLowerCase().trim();
    if (normalized.startsWith('/public')) return false;

    return true;
}

export const normalizeResponse = async <T>(response: Response) => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const json = await response.json() as TApiResponse<T>;

    return json;
}

export const normalizeError = <T>(error: any) => {
    console.error(`>>> normalizeError: fetch error: ${error.message || 'An error occurred. Please try again.'}`);

    return { message: 'An error occurred. Please try again.' } as TError;
}

export const fetchSafely = async <T = any>(
    api: TApiDefinition<T>,
    fetchCore: (endpoint: RequestInfo, options?: RequestInit, withAuth?: boolean) => Promise<Response>
): Promise<TApiResponse<T>> => {

    const { route, method, withAuth, query, body } = api

    try {
        const response = await fetchCore(
            buildEndpoint(route, query),
            buildOptions(method, body),
            shouldAuth(route, withAuth),
        );
        return normalizeResponse<T>(response)

    } catch (error: any) {
        return normalizeError<T>(error)
    }
}