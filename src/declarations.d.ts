declare module 'webpack-bundle-analyzer' {
  import { Server } from 'node:http';

  import { TypeStats } from './types';

  export const start: (
    stats: TypeStats,
    options: {
      analyzerUrl: (params: { listenHost: string; boundAddress: { port: number } }) => string;
      port: number;
      host: string;
      openBrowser: boolean;
    }
  ) => Promise<{ updateChartData: (params: TypeStats) => void; http: Server; ws: any }>;
}
