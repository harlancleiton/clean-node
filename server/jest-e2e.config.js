const jestConfig = require('./jest.config');

module.exports = { ...jestConfig, testMatch: ['**/*.test.ts'] };
