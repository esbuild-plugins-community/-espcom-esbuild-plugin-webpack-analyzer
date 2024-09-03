## @espcom/esbuild-plugin-webpack-analyzer

[![npm](https://img.shields.io/npm/v/@espcom/esbuild-plugin-webpack-analyzer)](https://www.npmjs.com/package/@espcom/esbuild-plugin-webpack-analyzer)
![coverage](https://github.com/esbuild-plugins-community/esbuild-plugin-webpack-analyzer/blob/main/assets/coverage.svg)
![size-esm](https://github.com/esbuild-plugins-community/esbuild-plugin-webpack-analyzer/blob/main/assets/esm.svg)
![size-cjs](https://github.com/esbuild-plugins-community/esbuild-plugin-webpack-analyzer/blob/main/assets/cjs.svg)

A plugin for [esbuild](https://esbuild.github.io/) that integrates with the 
[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 
to visualize the size of webpack output files. 
This helps in analyzing the composition of your build and optimizing bundle sizes.

## Installation

First, ensure that you have `esbuild` installed:

```bash
npm install esbuild --save-dev
```

Then, install the plugin:

```bash
npm install @espcom/esbuild-plugin-webpack-analyzer --save-dev
```

## Usage

To use the plugin, add it to the plugins array in your esbuild configuration:

```javascript
import esbuild from 'esbuild';
import { pluginWebpackAnalyzer } from '@espcom/esbuild-plugin-webpack-analyzer';

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/out.js',
  metafile: true,  // Ensure metafile is set to true
  plugins: [pluginWebpackAnalyzer({ open: true })], // Configure the plugin as needed
});
```

## Options

The `pluginWebpackAnalyzer` function accepts an optional configuration object 
with the following properties:

- `host` (string, optional): The host for the analyzer server. Defaults to `'127.0.0.1'`.
- `port` (number, optional): The port for the analyzer server. Defaults to `8888`.
- `open` (boolean, optional): Automatically open the analyzer in the browser. Defaults to `false`.
- `getStartResponse` (function, optional): Callback function that receives the response object 
of the analyzer server.

### Example

```javascript
pluginWebpackAnalyzer({
  host: '0.0.0.0',
  port: 3000,
  open: true,
  getStartResponse: (response) => {
    const {
      updateChartData, // function, updates chart data. No need to call manually
      http, // 'node:http' Server
      ws, // WebSocket server
    } = response;
    
    // For example, you may close the server manually
    http.close();
  },
});
```

## How It Works

The plugin works by analyzing the build results (Metafile) from esbuild. It extracts module and 
chunk information from the `metafile` and then starts the `webpack-bundle-analyzer` server 
to display the analysis.

### Features

- Has builds both for ESM and CJS environments
- Compatible with all platforms (Linux, Windows, etc.)
- Supports esbuild's code splitting and ESM output

### Validation

The plugin includes validation for the following:

- Ensures that the `metafile` option is enabled in esbuild.
- Validates the options provided to the plugin, ensuring types and required fields are correctly set.

### Limitations

Currently, the plugin only shows the `stats` sizes of modules 
because `parsed` and `gzipped` information are not provided in esbuild's Metafile.
