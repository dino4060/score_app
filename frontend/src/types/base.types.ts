import { HttpMethod } from "@/lib/constants";

export type TApiDefinition<T> = {
    route: string;
    method: HttpMethod;
    withAuth?: boolean;
    query?: object;
    body?: object;
};

export type TApiResponse<T> = T;

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