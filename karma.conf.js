module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "node_modules/jquery/dist/jquery.js",
      "node_modules/angular/angular.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "WebApp/app.js",
      "WebApp/Components/**/*.js",
      "WebApp/Directives/**/*.js",
      "tests/unit/**/*.spec.js",
    ],
    exclude: [],
    preprocessors: {
      "WebApp/**/*.js": ["coverage"],
    },
    reporters: ["spec", "coverage"],
    coverageReporter: {
      type: "text",
      dir: "coverage/",
      subdir: ".",
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    browsers: ["ChromeHeadlessNoSandbox"],
    singleRun: true,
    concurrency: Infinity,
  });
};
