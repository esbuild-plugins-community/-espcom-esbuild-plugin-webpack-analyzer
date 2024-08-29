## @espcom/esbuild-plugin-webpack-analyzer

[![npm](https://img.shields.io/npm/v/@espcom/esbuild-plugin-webpack-analyzer)](https://www.npmjs.com/package/@espcom/esbuild-plugin-webpack-analyzer)
![coverage](https://github.com/esbuild-plugins-community/esbuild-plugin-webpack-analyzer/blob/main/assets/coverage.svg)
![size-esm](https://github.com/esbuild-plugins-community/esbuild-plugin-webpack-analyzer/blob/main/assets/esm.svg)
![size-cjs](https://github.com/esbuild-plugins-community/esbuild-plugin-webpack-analyzer/blob/main/assets/cjs.svg)

A basic integration of [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) into esbuild.

### Usage

```typescript
import { BuildOptions } from 'esbuild';
import { pluginWebpackAnalyzer } from '@espcom/esbuild-plugin-webpack-analyzer';

const esbuildConfig: BuildOptions = {
  metafile: true, // required
  plugins: [
    pluginAnalyzer({
      port: 8888,
      host: '127.0.0.1',
      open: true,
    }),
  ],
};
```

### Features

- shows only stats sizes of modules
- works both with `splitting: true` or `splitting: false`
