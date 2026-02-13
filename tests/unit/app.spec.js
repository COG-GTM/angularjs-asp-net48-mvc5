describe("App Module", function () {
  var module;

  beforeEach(function () {
    module = angular.module("app");
  });

  it("should be registered", function () {
    expect(module).toBeDefined();
  });

  it("should have the correct module name", function () {
    expect(module.name).toEqual("app");
  });

  it("should have no dependencies", function () {
    expect(module.requires).toEqual([]);
  });

  it("should be retrievable multiple times consistently", function () {
    var moduleAgain = angular.module("app");
    expect(moduleAgain).toBe(module);
  });
});
