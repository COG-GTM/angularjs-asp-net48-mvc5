process.env.CHROME_BIN =
  "/home/ubuntu/.cache/ms-playwright/chromium-1117/chrome-linux/chrome";

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
      "test/unit/**/*.spec.js",
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
    browsers: ["ChromeHeadless"],
    customLaunchers: {
      ChromeHeadless: {
        base: "Chrome",
        flags: [
          "--headless=new",
          "--disable-gpu",
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-software-rasterizer",
          "--disable-extensions",
          "--remote-debugging-port=9222",
        ],
      },
    },
    singleRun: true,
    concurrency: Infinity,
  });
};
