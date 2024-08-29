import { describe, it } from 'node:test';
import * as assert from 'node:assert/strict';

import { pluginWebpackAnalyzer } from '../src';

const nonObjects = [0, true, null, '', [], () => false];
const nonStrings = [0, true, null, [], () => false, {}];
const nonNumbers = ['', true, null, [], () => false, {}];
const nonBooleans = ['', null, [], () => false, {}, 0];
const nonFunctions = ['', null, [], {}, 0, false];

void describe('Validate options', async () => {
  await it('options should be an object or undefined', () => {
    assert.doesNotThrow(() => pluginWebpackAnalyzer());
    assert.doesNotThrow(() => pluginWebpackAnalyzer({}));

    nonObjects.forEach((value: any) => {
      assert.throws(() => pluginWebpackAnalyzer(value), {
        message: '@espcom/esbuild-plugin-webpack-analyzer: Options must be a plain object',
      });
    });
  });

  await it('options.host should be a full string or undefined', () => {
    assert.doesNotThrow(() => pluginWebpackAnalyzer({ host: undefined }));
    assert.doesNotThrow(() => pluginWebpackAnalyzer({ host: '1' }));
    assert.throws(() => pluginWebpackAnalyzer({ host: '' }), {
      message:
        '@espcom/esbuild-plugin-webpack-analyzer: The "host" parameter must be a non-empty string',
    });

    nonStrings.forEach((value: any) => {
      assert.throws(() => pluginWebpackAnalyzer({ host: value }), {
        message: '@espcom/esbuild-plugin-webpack-analyzer: The "host" parameter must be a string',
      });
    });
  });

  await it('options.port should be a number or undefined', () => {
    assert.doesNotThrow(() => pluginWebpackAnalyzer({ port: undefined }));
    assert.doesNotThrow(() => pluginWebpackAnalyzer({ port: 0 }));

    nonNumbers.forEach((value: any) => {
      assert.throws(() => pluginWebpackAnalyzer({ port: value }), {
        message: '@espcom/esbuild-plugin-webpack-analyzer: The "port" parameter must be a number',
      });
    });
  });

  await it('options.open should be a boolean or undefined', () => {
    assert.doesNotThrow(() => pluginWebpackAnalyzer({ open: undefined }));
    assert.doesNotThrow(() => pluginWebpackAnalyzer({ open: true }));
    assert.doesNotThrow(() => pluginWebpackAnalyzer({ open: false }));

    nonBooleans.forEach((value: any) => {
      assert.throws(() => pluginWebpackAnalyzer({ open: value }), {
        message: '@espcom/esbuild-plugin-webpack-analyzer: The "open" parameter must be a boolean',
      });
    });
  });

  await it('options.getAnalyzerServer should be a function or undefined', () => {
    assert.doesNotThrow(() => pluginWebpackAnalyzer({ getStartResponse: undefined }));
    assert.doesNotThrow(() => pluginWebpackAnalyzer({ getStartResponse: () => undefined }));

    nonFunctions.forEach((value: any) => {
      assert.throws(() => pluginWebpackAnalyzer({ getStartResponse: value }), {
        message:
          '@espcom/esbuild-plugin-webpack-analyzer: The "getStartResponse" parameter must be a function',
      });
    });
  });
});
