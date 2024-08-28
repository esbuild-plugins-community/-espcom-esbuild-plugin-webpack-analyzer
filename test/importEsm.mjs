import { describe, it } from 'node:test';
import assert from 'node:assert';

import * as exportContent from '../dist/esm/index.js';

describe('Test import esm', () => {
  it('success', () => {
    assert.deepEqual(Object.keys(exportContent), ['pluginWebpackAnalyzer']);
    assert.deepEqual(typeof exportContent.pluginWebpackAnalyzer, 'function');
  });
});
