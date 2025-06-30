import { TApiResponse, TError } from "@/types/base.types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isError<T>(data: TApiResponse<T>): boolean {
  return typeof data === 'object' && data !== null && 'message' in data;
}