module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/setupTests.js'
  ],
  transformIgnorePatterns: ['/node_modules/(?!axios).+\\.js$'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^axios$': require.resolve('axios')
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
