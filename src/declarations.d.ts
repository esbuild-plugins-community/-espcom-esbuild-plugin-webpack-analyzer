declare module 'webpack-bundle-analyzer' {
  import { TypeStats, TypeStartResponse } from './types.js';

  export const start: (
    stats: TypeStats,
    options: {
      analyzerUrl: (params: { listenHost: string; boundAddress: { port: number } }) => string;
      port: number;
      host: string;
      openBrowser: boolean;
      reportTitle: string;
      entrypoints?: Array<string>;
    }
  ) => Promise<TypeStartResponse>;
}
