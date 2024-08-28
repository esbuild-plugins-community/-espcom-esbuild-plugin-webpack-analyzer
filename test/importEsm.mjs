import { describe, it } from 'node:test';
import assert from 'node:assert';

import { pluginWebpackAnalyzer } from '../dist/esm/index.js';

describe('Test import esm', () => {
  it('success', () => {
    assert.equal(typeof pluginWebpackAnalyzer, 'function');
  });
});
