module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/main/**/*.ts',
    '!<rootDir>/src/data/protocols/**',
    '!<rootDir>/src/domain/models/**',
    '!<rootDir>/src/reportWebVitals.js',
    '!<rootDir>/src/setupTests.js'

  ],
  coverageDirectory: 'coverage',
  transformIgnorePatterns: ['/node_modules/(?!axios).+\\.js$'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^axios$': require.resolve('axios')
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
