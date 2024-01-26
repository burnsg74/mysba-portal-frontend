export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__ mocks __/fileMock.js',
        '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.ts'
    },
}