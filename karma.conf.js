process.env.CHROME_BIN =
  "/opt/.devin/chrome/chrome/linux-133.0.6943.126/chrome-linux64/chrome";

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/angular/angular.min.js",
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
