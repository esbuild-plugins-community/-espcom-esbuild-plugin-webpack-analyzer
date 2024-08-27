const path = require('path');

const { getEslintConfig } = require('@espcom/eslint-config');

const eslintConfig = getEslintConfig({
  tsConfigPath: path.resolve(__dirname, './tsconfig.json'),
});

module.exports = eslintConfig;
