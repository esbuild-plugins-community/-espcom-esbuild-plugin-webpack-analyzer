import { Plugin } from 'esbuild';
import { start } from 'webpack-bundle-analyzer';

import { getModules } from './getModules.js';

type TypeOptions = {
  host?: string;
  port?: number;
  open?: boolean;
};

export const pluginWebpackAnalyzer = (options: TypeOptions): Plugin => ({
  name: '@espcom/esbuild-plugin-webpack-analyzer',
  setup(build) {
    const { port = 8888, host = '127.0.0.1', open = false } = options;

    let updateChartData: ((params: any) => void) | undefined;

    build.onEnd((result) => {
      const metaFile = result.metafile!;
      const stats = {
        assets: Object.keys(metaFile.outputs).map((chunkName) => ({
          name: chunkName,
          chunks: [chunkName.split('/').pop()?.split('.').shift()!],
        })),
        modules: getModules(metaFile),
      };

      if (updateChartData) {
        updateChartData(stats);
        return Promise.resolve();
      }

      // https://github.com/webpack-contrib/webpack-bundle-analyzer
      return start(stats, {
        analyzerUrl: (params) => `http://${params.listenHost}:${params.boundAddress.port}`,
        port,
        host,
        openBrowser: open || false,
      }).then((res) => {
        updateChartData = res.updateChartData;
      });
    });
  },
});
