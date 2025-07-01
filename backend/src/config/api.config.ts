import { VersioningType, VersioningOptions } from "@nestjs/common";

type ApiConfig = {
    prefix: string;
    versioning: VersioningOptions;
}

export const apiConfig: ApiConfig = {
    prefix: 'api',
    versioning: {
        type: VersioningType.URI,
        defaultVersion: ['1'],
    }
}