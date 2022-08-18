module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/react', '@testing-library/jest-dom'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
