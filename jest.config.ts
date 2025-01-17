export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|pdf)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '^src/(.*)$': '<rootDir>/src/$1',
    '../../i18n': 'identity-obj-proxy',
  },
};
