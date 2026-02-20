describe("App Module", function () {
  var module;

  beforeEach(function () {
    module = angular.module("app");
  });

  it("should be registered", function () {
    expect(module).toBeDefined();
  });

  it("should have the correct module name", function () {
    expect(module.name).toBe("app");
  });

  it("should have no dependencies", function () {
    expect(module.requires).toEqual([]);
  });

  it("should be retrievable via angular.module", function () {
    expect(function () {
      angular.module("app");
    }).not.toThrow();
  });

  it("should throw when accessing a non-existent module", function () {
    expect(function () {
      angular.module("nonExistentModule");
    }).toThrow();
  });
});
