const { describe, it } = require('node:test');
const assert = require('node:assert');

const exportContent = require('../dist/cjs/index');

describe('Test import cjs', () => {
  it('success', () => {
    assert.deepEqual(Object.keys(exportContent), ['pluginWebpackAnalyzer']);
    assert.deepEqual(typeof exportContent.pluginWebpackAnalyzer, 'function');
  });
});
