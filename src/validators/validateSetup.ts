import { PluginBuild } from 'esbuild';

import { pluginName } from '../constants.js';

export function validateSetup(build: PluginBuild) {
  if (build.initialOptions.metafile !== true) {
    throw new Error(`${pluginName}: "metafile" parameter must be set to "true" is esbuild config`);
  }
}
