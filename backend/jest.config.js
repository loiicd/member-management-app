module.exports = {
  roots: [
    '<rootDir>/test'
  ],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverage: true,
  reporters: ['default', 'jest-junit', ['jest-sonar', {
    relativeRootDir: '../..'
  }]],
  coverageReporters: ['lcov', 'cobertura', 'text']
}
