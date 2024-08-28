import { expect } from 'chai';

import { pluginWebpackAnalyzer } from '../src';

const nonObjects = [0, true, null, '', [], () => false];
const nonStrings = [0, true, null, [], () => false, {}];
const nonNumbers = ['', true, null, [], () => false, {}];
const nonBooleans = ['', null, [], () => false, {}, 0];
const nonFunctions = ['', null, [], {}, 0, false];

describe('Validate options', () => {
  it('options should be an object or undefined', () => {
    expect(() => pluginWebpackAnalyzer()).to.not.throw();
    expect(() => pluginWebpackAnalyzer({})).to.not.throw();

    nonObjects.forEach((value: any) => {
      expect(() => pluginWebpackAnalyzer(value)).to.throw(
        '@espcom/esbuild-plugin-webpack-analyzer: Options must be a plain object'
      );
    });
  });

  it('options.host should be a full string or undefined', () => {
    expect(() => pluginWebpackAnalyzer({ host: undefined })).to.not.throw();
    expect(() => pluginWebpackAnalyzer({ host: '1' })).to.not.throw();
    expect(() => pluginWebpackAnalyzer({ host: '' })).to.throw(
      '@espcom/esbuild-plugin-webpack-analyzer: The "host" parameter must be a non-empty string'
    );

    nonStrings.forEach((value: any) => {
      expect(() => pluginWebpackAnalyzer({ host: value })).to.throw(
        '@espcom/esbuild-plugin-webpack-analyzer: The "host" parameter must be a string'
      );
    });
  });

  it('options.port should be a number or undefined', () => {
    expect(() => pluginWebpackAnalyzer({ port: undefined })).to.not.throw();
    expect(() => pluginWebpackAnalyzer({ port: 0 })).to.not.throw();

    nonNumbers.forEach((value: any) => {
      expect(() => pluginWebpackAnalyzer({ port: value })).to.throw(
        '@espcom/esbuild-plugin-webpack-analyzer: The "port" parameter must be a number'
      );
    });
  });

  it('options.open should be a boolean or undefined', () => {
    expect(() => pluginWebpackAnalyzer({ open: undefined })).to.not.throw();
    expect(() => pluginWebpackAnalyzer({ open: true })).to.not.throw();
    expect(() => pluginWebpackAnalyzer({ open: false })).to.not.throw();

    nonBooleans.forEach((value: any) => {
      expect(() => pluginWebpackAnalyzer({ open: value })).to.throw(
        '@espcom/esbuild-plugin-webpack-analyzer: The "open" parameter must be a boolean'
      );
    });
  });

  it('options.getAnalyzerServer should be a function or undefined', () => {
    expect(() => pluginWebpackAnalyzer({ getAnalyzerServer: undefined })).to.not.throw();
    expect(() => pluginWebpackAnalyzer({ getAnalyzerServer: () => undefined })).to.not.throw();

    nonFunctions.forEach((value: any) => {
      expect(() => pluginWebpackAnalyzer({ getAnalyzerServer: value })).to.throw(
        '@espcom/esbuild-plugin-webpack-analyzer: The "getAnalyzerServer" parameter must be a function'
      );
    });
  });
});
