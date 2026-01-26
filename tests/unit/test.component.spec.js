require("../../WebApp/app.js");
require("../../WebApp/Components/test.component.js");

describe("TestComponent Registration", function () {
  var appModule;

  beforeEach(function () {
    appModule = angular.module("app");
  });

  it("should have the app module defined", function () {
    expect(appModule).toBeDefined();
  });

  it("should have registrations in the invoke queue", function () {
    expect(appModule._invokeQueue.length).toBeGreaterThan(0);
  });

  it("should have component registration in the queue", function () {
    var hasComponentRegistration = appModule._invokeQueue.some(function (item) {
      return item[0] === "$compileProvider" && item[1] === "component";
    });
    expect(hasComponentRegistration).toBe(true);
  });

  it("should register testComponent", function () {
    var testComponentRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "component" &&
        item[2][0] === "testComponent"
      );
    });
    expect(testComponentRegistration).toBeDefined();
  });

  it("should have testComponent with correct configuration", function () {
    var testComponentRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "component" &&
        item[2][0] === "testComponent"
      );
    });

    var componentConfig = testComponentRegistration[2][1];
    expect(componentConfig.controllerAs).toBe("vm");
    expect(componentConfig.template).toContain("angularjs-version");
    expect(componentConfig.template).toContain("AngularJS Version:");
  });

  it("should have testComponent with controller function", function () {
    var testComponentRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "component" &&
        item[2][0] === "testComponent"
      );
    });

    var componentConfig = testComponentRegistration[2][1];
    expect(typeof componentConfig.controller).toBe("function");
  });

  it("should have testComponent with empty bindings", function () {
    var testComponentRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "component" &&
        item[2][0] === "testComponent"
      );
    });

    var componentConfig = testComponentRegistration[2][1];
    expect(componentConfig.bindings).toEqual({});
  });
});

describe("TestComponent Template", function () {
  beforeEach(function () {
    angular.module("app");
  });

  it("should have data-testid attribute in template", function () {
    var appModule = angular.module("app");
    var testComponentRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "component" &&
        item[2][0] === "testComponent"
      );
    });

    var componentConfig = testComponentRegistration[2][1];
    expect(componentConfig.template).toContain(
      'data-testid="angularjs-version"'
    );
  });

  it("should have test-component class in template", function () {
    var appModule = angular.module("app");
    var testComponentRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "component" &&
        item[2][0] === "testComponent"
      );
    });

    var componentConfig = testComponentRegistration[2][1];
    expect(componentConfig.template).toContain("test-component");
  });

  it("should bind to vm.version in template", function () {
    var appModule = angular.module("app");
    var testComponentRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "component" &&
        item[2][0] === "testComponent"
      );
    });

    var componentConfig = testComponentRegistration[2][1];
    expect(componentConfig.template).toContain("{{vm.version}}");
  });
});

describe("TestComponent Controller", function () {
  var controllerFn;
  var mockLog;

  beforeEach(function () {
    var appModule = angular.module("app");
    var testComponentRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "component" &&
        item[2][0] === "testComponent"
      );
    });
    controllerFn = testComponentRegistration[2][1].controller;
    mockLog = { info: jest.fn() };
  });

  it("should set version to angular.version.full", function () {
    var ctrl = {};
    controllerFn.call(ctrl, mockLog);
    expect(ctrl.version).toBe(angular.version.full);
  });

  it("should have $onInit lifecycle hook", function () {
    var ctrl = {};
    controllerFn.call(ctrl, mockLog);
    expect(ctrl.$onInit).toBeDefined();
    expect(typeof ctrl.$onInit).toBe("function");
  });

  it("should log initialization message when $onInit is called", function () {
    var ctrl = {};
    controllerFn.call(ctrl, mockLog);
    ctrl.$onInit();
    expect(mockLog.info).toHaveBeenCalledWith("test-component initialized...");
  });

  it("should call $log.info exactly once during $onInit", function () {
    var ctrl = {};
    controllerFn.call(ctrl, mockLog);
    ctrl.$onInit();
    expect(mockLog.info).toHaveBeenCalledTimes(1);
  });

  it("should have version in semver format", function () {
    var ctrl = {};
    controllerFn.call(ctrl, mockLog);
    expect(ctrl.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("should have version starting with 1.8", function () {
    var ctrl = {};
    controllerFn.call(ctrl, mockLog);
    expect(ctrl.version).toMatch(/^1\.8\.\d+$/);
  });
});
