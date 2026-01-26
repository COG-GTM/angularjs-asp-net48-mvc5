require("../../WebApp/app.js");
require("../../WebApp/Directives/test.directive.js");

describe("TestDirective Registration", function () {
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

  it("should have directive registration in the queue", function () {
    var hasDirectiveRegistration = appModule._invokeQueue.some(function (item) {
      return item[0] === "$compileProvider" && item[1] === "directive";
    });
    expect(hasDirectiveRegistration).toBe(true);
  });

  it("should register testDirective", function () {
    var testDirectiveRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "directive" &&
        item[2][0] === "testDirective"
      );
    });
    expect(testDirectiveRegistration).toBeDefined();
  });

  it("should have testDirective with factory function", function () {
    var testDirectiveRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "directive" &&
        item[2][0] === "testDirective"
      );
    });

    var directiveFactory = testDirectiveRegistration[2][1];
    expect(typeof directiveFactory).toBe("function");
  });

  it("should have testDirective factory with $inject annotation", function () {
    var testDirectiveRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "directive" &&
        item[2][0] === "testDirective"
      );
    });

    var directiveFactory = testDirectiveRegistration[2][1];
    expect(directiveFactory.$inject).toBeDefined();
    expect(directiveFactory.$inject).toContain("$log");
  });
});

describe("TestDirective Factory", function () {
  var directiveFactory;
  var mockLog;

  beforeEach(function () {
    var appModule = angular.module("app");
    var testDirectiveRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "directive" &&
        item[2][0] === "testDirective"
      );
    });
    directiveFactory = testDirectiveRegistration[2][1];
    mockLog = { info: jest.fn() };
  });

  it("should return a directive definition object", function () {
    var directiveDef = directiveFactory(mockLog);
    expect(directiveDef).toBeDefined();
    expect(typeof directiveDef).toBe("object");
  });

  it("should restrict to element only", function () {
    var directiveDef = directiveFactory(mockLog);
    expect(directiveDef.restrict).toBe("E");
  });

  it("should have isolated scope", function () {
    var directiveDef = directiveFactory(mockLog);
    expect(directiveDef.scope).toEqual({});
  });

  it("should use controllerAs vm", function () {
    var directiveDef = directiveFactory(mockLog);
    expect(directiveDef.controllerAs).toBe("vm");
  });

  it("should have the correct templateUrl", function () {
    var directiveDef = directiveFactory(mockLog);
    expect(directiveDef.templateUrl).toBe(
      "WebApp/Directives/test.directive.html"
    );
  });

  it("should have a controller function", function () {
    var directiveDef = directiveFactory(mockLog);
    expect(directiveDef.controller).toBeDefined();
    expect(typeof directiveDef.controller).toBe("function");
  });
});

describe("TestDirective Controller", function () {
  var directiveFactory;
  var mockLog;

  beforeEach(function () {
    var appModule = angular.module("app");
    var testDirectiveRegistration = appModule._invokeQueue.find(function (
      item
    ) {
      return (
        item[0] === "$compileProvider" &&
        item[1] === "directive" &&
        item[2][0] === "testDirective"
      );
    });
    directiveFactory = testDirectiveRegistration[2][1];
    mockLog = { info: jest.fn() };
  });

  it("should log initialization message when controller runs", function () {
    var directiveDef = directiveFactory(mockLog);
    directiveDef.controller();
    expect(mockLog.info).toHaveBeenCalledWith("test-directive initialized...");
  });

  it("should call $log.info exactly once", function () {
    var directiveDef = directiveFactory(mockLog);
    directiveDef.controller();
    expect(mockLog.info).toHaveBeenCalledTimes(1);
  });
});
