function getEnvSafely(value: string | undefined, name: string): string {
    if (value) return value;
    throw new Error(`>>> getEnv: Missing ${name}`);
}

export const env = {
    BACKEND_DOMAIN: getEnvSafely(process.env.NEXT_PUBLIC_BACKEND_DOMAIN, 'NEXT_PUBLIC_BACKEND_DOMAIN'),
    PREFIX_API: getEnvSafely(process.env.NEXT_PUBLIC_PREFIX_API, 'NEXT_PUBLIC_PREFIX_API'),
    VERSIONING_API: getEnvSafely(process.env.NEXT_PUBLIC_VERSIONING_API, 'NEXT_PUBLIC_VERSIONING_API'),
};