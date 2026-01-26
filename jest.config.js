module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/tests/unit/**/*.spec.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  collectCoverage: true,
  collectCoverageFrom: ["WebApp/**/*.js", "!WebApp/**/*.spec.js"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  moduleFileExtensions: ["js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  verbose: true,
};
