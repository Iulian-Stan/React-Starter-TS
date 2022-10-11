module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy'
  },
  collectCoverageFrom: ['<rootDir>/**/*.{ts, tsx}'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: "jsdom"
};