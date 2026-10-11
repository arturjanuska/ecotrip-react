/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Ecotrip CMS origin, e.g. http://localhost:3000 (no trailing slash).
  readonly VITE_CMS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
