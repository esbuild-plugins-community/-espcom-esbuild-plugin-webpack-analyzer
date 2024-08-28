import { expect } from 'chai';

import { pluginWebpackAnalyzer } from '../src';

describe('Options', () => {
  it('validation works', () => {
    expect(typeof pluginWebpackAnalyzer).to.eq('function');
  });
});
