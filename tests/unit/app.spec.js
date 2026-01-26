require("../../WebApp/app.js");

describe("App Module", function () {
  var appModule;

  beforeEach(function () {
    appModule = angular.module("app");
  });

  it("should be registered", function () {
    expect(appModule).toBeDefined();
  });

  it("should have no dependencies", function () {
    expect(appModule.requires).toEqual([]);
  });

  it("should have the correct name", function () {
    expect(appModule.name).toBe("app");
  });

  it("should have an invoke queue for registrations", function () {
    expect(appModule._invokeQueue).toBeDefined();
    expect(Array.isArray(appModule._invokeQueue)).toBe(true);
  });
});
