import * as path from 'path';
import { Server } from 'node:http';

import { spy } from 'sinon';
import { expect } from 'chai';
import { BuildOptions, build } from 'esbuild';

import { pluginWebpackAnalyzer } from '../src';

describe('Validate result', () => {
  let server: Server | undefined;
  let spyLog: any;

  const config: BuildOptions = {
    entryPoints: [path.resolve(__dirname, 'entry.ts')],
    bundle: true,
    format: 'iife',
    logLevel: 'silent',
    write: false,
    metafile: true,
    platform: 'browser',
    resolveExtensions: ['.ts'],
    plugins: [
      pluginWebpackAnalyzer({
        getAnalyzerServer: (params) => {
          server = params.http;
        },
      }),
    ],
  };

  before(() => {
    spyLog = spy(console, 'log');
  });

  after(() => {
    spyLog.restore();
  });

  it('metafile option should be enabled', () => {
    return build({ ...config, metafile: false }).catch((error) => {
      expect(error.message).to.include(
        '@espcom/esbuild-plugin-webpack-analyzer: "metafile" parameter must be set to "true" is esbuild config'
      );
    });
  });

  it('analyzer should start', () => {
    return build(config).then(() => {
      expect(
        spyLog.calledWith(
          '\x1B[1mWebpack Bundle Analyzer\x1B[22m is started at \x1B[1mhttp://127.0.0.1:8888\x1B[22m\n' +
            'Use \x1B[1mCtrl+C\x1B[22m to close it'
        )
      ).to.be.eq(true);

      server?.close();
    });
  });
});
