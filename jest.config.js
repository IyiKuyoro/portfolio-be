// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  automock: false, // All imported modules in your tests should be mocked automatically
  clearMocks: true, // Automatically clear mock calls and instances between every test
  collectCoverage: true, // Indicates whether the coverage information should be collected while executing the test
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/config.ts',
    '!<rootDir>/src/logger.ts',
    '!**/node_modules/**',
    '!src/database',
  ], // An array of glob patterns indicating a set of files for which coverage information should be collected
  coverageDirectory: 'coverage', // The directory where Jest should output its coverage files
  coveragePathIgnorePatterns: [
    '<rootDir>/src/database/*',
    '\\\\node_modules\\\\',
  ], // An array of regexp pattern strings used to skip coverage collection
  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover',
    'text-summary',
  ], // A list of reporter names that Jest uses when writing coverage reports
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 95,
      statements: -10,
    },
  }, // An object that configures minimum threshold enforcement for coverage results
  dependencyExtractor: null, // A path to a custom dependency extractor
  moduleDirectories: [
    'node_modules',
  ], // An array of directory names to be searched recursively up from the requiring module's location
  resetMocks: true, // Automatically reset mock state between every test
  testEnvironment: 'node', // The test environment that will be used for testing
  testMatch: [
    '<rootDir>/integrationTests/**/?(*.)(spec|test).js',
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ], // The glob patterns Jest uses to detect test files
  testPathIgnorePatterns: [
    '\\\\node_modules\\\\',
  ], // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  transform: null, // A map from regular expressions to paths to transformers
  transformIgnorePatterns: [
    '\\\\node_modules\\\\',
  ], // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  verbose: true, // Indicates whether each individual test should be reported during the run
};
