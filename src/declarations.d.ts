declare module 'webpack-bundle-analyzer' {
  import { TypeModule } from './types';

  export const start: (
    stats: {
      assets: Array<{ name: string; chunks: Array<string> }>;
      modules: Array<TypeModule>;
    },
    options: {
      analyzerUrl: (params: { listenHost: string; boundAddress: { port: number } }) => string;
      port: number;
      host: string;
      openBrowser: boolean;
    }
  ) => Promise<{ updateChartData: (params: any) => void }>;
}
