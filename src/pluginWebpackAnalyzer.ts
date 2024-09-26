import { start } from 'webpack-bundle-analyzer';
import { Plugin } from 'esbuild';

import { TypeOptions, TypeStartResponse } from './types.js';
import { pluginName } from './constants.js';
import { getStats } from './getStats.js';
import { validateResult } from './validators/validateResult.js';
import { validateOptions } from './validators/validateOptions.js';
import { validateSetup } from './validators/validateSetup.js';

export const pluginWebpackAnalyzer = (options?: TypeOptions): Plugin => {
  validateOptions(options);

  const finalOptions: TypeOptions = {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    port: options?.port ?? 8888,
    host: options?.host ?? '127.0.0.1',
    open: options?.open || false,
    extensions: options?.extensions || ['.js', '.cjs', '.mjs', '.ts', '.tsx'],
    getStartResponse: options?.getStartResponse,
  };

  const extensionsSet = new Set(finalOptions.extensions);

  return {
    name: pluginName,
    setup(build) {
      let response: TypeStartResponse | undefined;

      validateSetup(build);

      build.onEnd((resultRaw) => {
        const result = validateResult(resultRaw);

        const stats = getStats(result.metafile, extensionsSet);

        if (response?.updateChartData) {
          response.updateChartData(stats);

          return Promise.resolve();
        }

        // https://github.com/webpack-contrib/webpack-bundle-analyzer
        return start(stats, {
          analyzerUrl: (params) => `http://${params.listenHost}:${params.boundAddress.port}`,
          port: finalOptions.port!,
          host: finalOptions.host!,
          openBrowser: finalOptions.open!,
          reportTitle: 'Analyzer',
        }).then((res) => {
          response = res;

          finalOptions?.getStartResponse?.(res);
        });
      });

      build.onDispose(() => {
        response?.http?.close();
      });
    },
  };
};
