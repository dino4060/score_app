const RESOURCE_NAMES = ['scores', 'reports'] as const;

type TResourceUnion = typeof RESOURCE_NAMES[number];
type TResourceUppers = Uppercase<TResourceUnion>;
type TResourceVariants = {
    BASE: string;
    PUBLIC: string;
    PRIVATE: string;
};

export type TResources = Record<TResourceUppers, TResourceVariants>;

export const RESOURCES = RESOURCE_NAMES.reduce((acc, key) => {
    const upper = key.toUpperCase() as TResourceUppers;
    acc[upper] = {
        BASE: `/${key}`,
        PUBLIC: `/public/${key}`,
        PRIVATE: `/${key}`,
    };
    return acc;
}, {} as TResources);
