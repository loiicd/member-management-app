/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)']
};