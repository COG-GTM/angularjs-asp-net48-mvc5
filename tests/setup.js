require("angular/angular.min.js");
require("angular-mocks");

global.angular = window.angular;

global.$ = jest.fn(function () {
  return {
    jquery: "3.6.0",
  };
});
