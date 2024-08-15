/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GEONAMES_USERNAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}