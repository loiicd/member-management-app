module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverage: true,
  reporters: ['default'],
  coverageReporters: ['lcov', 'cobertura', 'text']
}


// /** @type {import('ts-jest').JestConfigWithTsJest} */
// export default {
//   preset: 'ts-jest',
//   transform: { '^.+\\.ts?$': 'ts-jest' },
//   testEnvironment: 'jsdom',
//   clearMocks: true,
//   collectCoverage: true,
//   coverageDirectory: "coverage",
//   transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)']
// };