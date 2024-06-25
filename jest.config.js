
// jest.config.js

module.exports = {
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/.next/', '/node_modules/'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  