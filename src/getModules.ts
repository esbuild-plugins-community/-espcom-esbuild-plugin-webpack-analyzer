import { Metafile } from 'esbuild';

import { TypeModule } from './types';

export const getModules = ({ inputs, outputs }: Metafile): Array<TypeModule> => {
  const chunksIndexed: Record<string, Set<string>> = {};

  Object.entries(outputs).forEach(([chunkName, chunk]) => {
    Object.keys(chunk.inputs).forEach((moduleName) => {
      chunksIndexed[moduleName] = chunksIndexed[moduleName] || new Set();
      chunksIndexed[moduleName].add(chunkName.split('/').pop()?.split('.').shift() || 'unknown');
    });
  });

  return Object.entries(inputs).map(([moduleName, obj]) => {
    const name = `./${moduleName
      .replace(/(.*)?\/node_modules\//, '/node_modules/')
      .replace(/^((\.)*\/)+/, '')}`;

    return {
      id: name,
      name,
      size: obj.bytes,
      chunks: [...(chunksIndexed[moduleName] || [])],
    };
  });
};
