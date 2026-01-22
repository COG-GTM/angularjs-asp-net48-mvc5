module.exports = function(config) {
  process.env.CHROME_BIN = require('puppeteer').executablePath();

  config.set({
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'WebApp/app.js',
      'WebApp/Components/test.component.js',
      'tests/unit/test.component.spec.js'
    ],
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    },
    singleRun: true
  });
};
