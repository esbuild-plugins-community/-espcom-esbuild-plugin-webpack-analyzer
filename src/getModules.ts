import * as path from 'node:path';

import { Metafile } from 'esbuild';

import { TypeModule } from './types.js';

export const getModules = ({ inputs, outputs }: Metafile): Array<TypeModule> => {
  const chunksIndexed: Record<string, Set<string>> = {};

  Object.entries(outputs).forEach(([chunkName, chunkData]) => {
    Object.keys(chunkData.inputs).forEach((moduleName) => {
      chunksIndexed[moduleName] = chunksIndexed[moduleName] || new Set();
      chunksIndexed[moduleName].add(path.parse(chunkName).name.split('.').shift()!);
    });
  });

  return Object.entries(inputs).map(([moduleName, moduleData]) => {
    const name = `./${moduleName.replace(/(.*)?node_modules/, 'node_modules')}`;

    return {
      id: name,
      name,
      size: moduleData.bytes,
      chunks: [...(chunksIndexed[moduleName] || [])],
    };
  });
};
