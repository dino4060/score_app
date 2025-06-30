import { HttpMethod } from "@/lib/constants";

export type TApiDefinition<T> = {
    route: string;
    method: HttpMethod;
    withAuth?: boolean;
    query?: object;
    body?: object;
};

export type TError = {
    message: string
}

export type TApiResponse<T> = T | TError;

export type TPagination = {
    totalPages: number;
    totalElements: number;
    page: number;
    size: number;
}

export type TPageRes<T> = {
    pagination: TPagination,
    items: T[]
}

export type TDeletedRes = {
    isDeleted: boolean;
    count: number;
};