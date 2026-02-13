module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/angular/angular.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "WebApp/app.js",
      "WebApp/Components/**/*.js",
      "WebApp/Directives/**/*.js",
      "WebApp/Directives/**/*.html",
      "WebApp/__tests__/**/*.spec.js",
    ],
    preprocessors: {
      "WebApp/app.js": ["coverage"],
      "WebApp/Components/**/*.js": ["coverage"],
      "WebApp/Directives/**/*.js": ["coverage"],
      "WebApp/Directives/**/*.html": ["html2js"],
    },
    reporters: ["progress", "coverage"],
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
    browsers: ["ChromeHeadless"],
    singleRun: true,
    concurrency: Infinity,
  });
};
