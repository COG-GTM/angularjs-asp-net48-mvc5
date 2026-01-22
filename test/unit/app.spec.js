describe("App Module", function () {
  var module;

  beforeEach(function () {
    module = angular.module("app");
  });

  it("should be defined", function () {
    expect(module).toBeDefined();
  });

  it("should have the correct name", function () {
    expect(module.name).toBe("app");
  });

  it("should have no dependencies", function () {
    expect(module.requires).toEqual([]);
  });

  it("should be retrievable from angular", function () {
    expect(function () {
      angular.module("app");
    }).not.toThrow();
  });
});
