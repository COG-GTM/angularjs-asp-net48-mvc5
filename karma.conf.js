module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/angular/angular.min.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "WebApp/app.js",
      "WebApp/Components/*.js",
      "WebApp/Directives/*.js",
      "WebApp/tests/**/*.spec.js",
    ],
    exclude: [],
    preprocessors: {
      "WebApp/app.js": ["coverage"],
      "WebApp/Components/*.js": ["coverage"],
      "WebApp/Directives/*.js": ["coverage"],
    },
    reporters: ["progress", "coverage"],
    coverageReporter: {
      type: "html",
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
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
      },
    },
    singleRun: true,
    concurrency: Infinity,
  });
};
