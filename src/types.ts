import { Server } from 'node:http';

export type TypeOptions = {
  host?: string;
  port?: number;
  open?: boolean;
  getAnalyzerServer?: (params: {
    updateChartData: (params: TypeStats) => void;
    http: Server;
    ws: any;
  }) => void;
};

export type TypeModule = {
  id: string;
  name: string;
  size: number;
  chunks: Array<string>;
};

export type TypeStats = {
  assets: Array<{ name: string; chunks: Array<string> }>;
  modules: Array<TypeModule>;
};
