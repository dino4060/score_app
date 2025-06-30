import { cookies } from "next/headers";
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


    // get server cookies
    const cookieStore = await cookies();
    const REFRESH_TOKEN = cookieStore.get("REFRESH_TOKEN")?.value;
    const ACCESS_TOKEN = cookieStore.get("ACCESS_TOKEN")?.value;

    // include ACCESS_TOKEN
    if (withAuth && ACCESS_TOKEN) {
        headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
    }

    // include REFRESH_TOKEN
    // NOTE: 'Cookie'
    // Next tự inject cookie từ next/headers() khi bạn fetch từ RRC
    // Đính cookie thủ công nếu dùng Api route h hay Server action
    if (REFRESH_TOKEN) {
        headers['Cookie'] = `REFRESH_TOKEN=${REFRESH_TOKEN}`;

        // TEST
        // console.log('>>> serverFetch: cookies toString: ', cookieStore.toString());
        // console.log('>>> serverFetch: cookies getValue: ', REFRESH_TOKEN);
    }

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