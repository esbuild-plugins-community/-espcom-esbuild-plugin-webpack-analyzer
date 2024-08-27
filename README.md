## @espcom/esbuild-plugin-webpack-analyzer

[![npm](https://img.shields.io/npm/v/esbuild-plugin-webpack-analyzer)](https://www.npmjs.com/package/esbuild-plugin-webpack-analyzer)
[![license](https://img.shields.io/npm/l/esbuild-plugin-webpack-analyzer)](https://github.com/esbuild-plugins-community/esbuild-plugin-webpack-analyzer/LICENSE)

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
