module.exports = {
  transformIgnorePatterns: ["/node_modules/(?!axios).+\\.js$"],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
};
