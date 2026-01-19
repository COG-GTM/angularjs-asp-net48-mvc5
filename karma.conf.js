module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "node_modules/angular/angular.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "node_modules/jquery/dist/jquery.js",
      "WebApp/app.js",
      "WebApp/Components/**/*.js",
      "WebApp/Directives/**/*.js",
      "WebApp/**/*.spec.js",
    ],
    exclude: [],
    preprocessors: {
      "WebApp/app.js": ["coverage"],
      "WebApp/Components/**/!(*.spec).js": ["coverage"],
      "WebApp/Directives/**/!(*.spec).js": ["coverage"],
    },
    reporters: ["spec", "coverage"],
    coverageReporter: {
      type: "text",
      dir: "coverage/",
      subdir: ".",
      reporters: [
        { type: "text" },
        { type: "text-summary" },
        { type: "html" },
        { type: "lcov" },
      ],
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
        flags: [
          "--no-sandbox",
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--disable-software-rasterizer",
        ],
      },
    },
    singleRun: true,
    concurrency: Infinity,
  });
};
