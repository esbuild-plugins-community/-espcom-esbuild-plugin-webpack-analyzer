import * as path from 'node:path';
import * as assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

import { build, BuildOptions, context, Metafile } from 'esbuild';

import { pluginWebpackAnalyzer } from '../src/index.js';
import { validateResult } from '../src/validators/validateResult.js';
import { TypeStartResponse } from '../src/types.js';
import { getModules } from '../src/getModules.js';

const nonObjects = [0, true, null, '', [], () => false];

void describe('Validate result', async () => {
  const config: BuildOptions = {
    entryPoints: [path.resolve('test/res/entry.ts')],
    bundle: true,
    format: 'iife',
    logLevel: 'silent',
    write: false,
    metafile: true,
    target: 'node18',
    platform: 'node',
    packages: 'external',
    resolveExtensions: ['.ts'],
    plugins: [],
  };

  await it('validateResult throws an error', () => {
    assert.doesNotThrow(() => validateResult({ metafile: {} } as any));

    nonObjects.forEach((value: any) => {
      assert.throws(() => validateResult({ metafile: value } as any), {
        message:
          '@espcom/esbuild-plugin-webpack-analyzer: "metafile" parameter must be set to "true" is esbuild config',
      });
    });
  });

  await it('metafile option should be enabled', () => {
    return build({ ...config, metafile: false })
      .then(() => undefined)
      .catch((error) => {
        assert.match(
          error.message,
          new RegExp(
            '@espcom/esbuild-plugin-webpack-analyzer: "metafile" parameter must be set to "true" is esbuild config'
          )
        );
      });
  });

  await it('analyzer should start', async () => {
    const spyLog = mock.method(console, 'log');

    await build({
      ...config,
      plugins: [pluginWebpackAnalyzer()],
    });

    assert.equal(spyLog.mock.callCount(), 1);

    assert.equal(
      spyLog.mock.calls[0].arguments[0],
      '\x1B[1mWebpack Bundle Analyzer\x1B[22m is started at \x1B[1mhttp://127.0.0.1:8888\x1B[22m\n' +
        'Use \x1B[1mCtrl+C\x1B[22m to close it'
    );

    spyLog.mock.restore();
  });

  await it('analyzer should update stats on rebuild', async () => {
    const spyLog = mock.method(console, 'log');

    let response: TypeStartResponse | undefined;

    const ctx = await context({
      ...config,
      plugins: [
        pluginWebpackAnalyzer({
          getStartResponse(res) {
            response = res;
          },
        }),
      ],
    });

    await ctx.rebuild();

    const spyUpdateChartData = mock.method(response!, 'updateChartData');

    assert.equal(spyLog.mock.callCount(), 1);
    assert.equal(spyUpdateChartData.mock.callCount(), 0);

    assert.equal(
      spyLog.mock.calls[0].arguments[0],
      '\x1B[1mWebpack Bundle Analyzer\x1B[22m is started at \x1B[1mhttp://127.0.0.1:8888\x1B[22m\n' +
        'Use \x1B[1mCtrl+C\x1B[22m to close it'
    );

    await ctx.rebuild();

    assert.equal(spyLog.mock.callCount(), 1);
    assert.equal(spyUpdateChartData.mock.callCount(), 1);

    spyLog.mock.restore();

    await ctx.dispose();
  });

  await it('getModules works correctly', async () => {
    const sampleMetafile: Metafile = {
      inputs: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'test/res/entry.ts': {
          bytes: 110,
          imports: [
            { path: 'istanbul-cobertura-badger', kind: 'import-statement', external: true },
          ],
          format: 'esm',
        },
      },
      outputs: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'entry.js': {
          imports: [{ path: 'istanbul-cobertura-badger', kind: 'require-call', external: true }],
          exports: [],
          entryPoint: 'test/res/entry.ts',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          inputs: { 'test/res/entry.ts': { bytesInOutput: 83 } },
          bytes: 1719,
        },
      },
    };

    const modules = getModules(sampleMetafile);

    assert.deepEqual(modules, [
      {
        id: './test/res/entry.ts',
        name: './test/res/entry.ts',
        size: 110,
        chunks: ['entry'],
      },
    ]);
  });
});
