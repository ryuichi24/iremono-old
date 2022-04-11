/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: './tsconfig.json',
    },
  },
  transformIgnorePatterns: [],
  testEnvironment: 'node',
  moduleNameMapper: {
    'strtok3/core': 'strtok3/lib/core.js',
  },
};
