import * as path from 'node:path';

import { start } from 'webpack-bundle-analyzer';
import { Plugin } from 'esbuild';

import { TypeOptions, TypeStats, TypeStartResponse } from './types.js';
import { pluginName } from './constants.js';
import { getModules } from './getModules.js';
import { validateResult } from './validators/validateResult.js';
import { validateOptions } from './validators/validateOptions.js';

export const pluginWebpackAnalyzer = (options?: TypeOptions): Plugin => {
  validateOptions(options);

  return {
    name: pluginName,
    setup(build) {
      let response: TypeStartResponse | undefined;

      build.onEnd((resultRaw) => {
        const result = validateResult(resultRaw);

        const stats: TypeStats = {
          assets: Object.keys(result.metafile.outputs).map((chunkName) => ({
            name: chunkName,
            chunks: [chunkName.split(path.sep).pop()?.split('.').shift()!],
          })),
          modules: getModules(result.metafile),
        };

        if (response?.updateChartData) {
          response.updateChartData(stats);

          return Promise.resolve();
        }

        // https://github.com/webpack-contrib/webpack-bundle-analyzer
        return start(stats, {
          analyzerUrl: (params) => `http://${params.listenHost}:${params.boundAddress.port}`,
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          port: options?.port ?? 8888,
          host: options?.host ?? '127.0.0.1',
          openBrowser: options?.open || false,
        }).then((res) => {
          response = res;

          options?.getStartResponse?.(res);
        });
      });

      build.onDispose(() => {
        response?.http?.close();
      });
    },
  };
};
