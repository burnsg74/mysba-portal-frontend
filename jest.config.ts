export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.[t|j]sx?$": "babel-jest",
        "^.+\\.svg$": "jest-transformer-svg"
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|png)$': '<rootDir>/src/__ mocks __/fileMock.js',
        '\\.module\\.css$': 'identity-obj-proxy',
        "^src/(.*)$": "<rootDir>/src/$1"
    },
}