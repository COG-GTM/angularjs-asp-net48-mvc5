var fs = require("fs");
var path = require("path");
var playwrightDir = path.join(
  process.env.HOME,
  ".cache",
  "ms-playwright"
);
var chromiumDirs = fs.readdirSync(playwrightDir)
  .filter(function (d) { return d.startsWith("chromium-"); })
  .sort()
  .reverse();
process.env.CHROME_BIN = path.join(
  playwrightDir,
  chromiumDirs[0],
  "chrome-linux",
  "chrome"
);

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
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    singleRun: true,
    concurrency: Infinity,
  });
};
