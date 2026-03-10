module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'WebApp/app.js',
      'WebApp/Components/test.component.js',
      'tests/unit/test.component.spec.js'
    ],
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
