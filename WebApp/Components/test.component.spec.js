describe("TestComponent", function () {
  var $componentController;
  var $log;
  var $rootScope;

  beforeEach(module("app"));

  beforeEach(inject(function (_$componentController_, _$log_, _$rootScope_) {
    $componentController = _$componentController_;
    $log = _$log_;
    $rootScope = _$rootScope_;
  }));

  describe("Component Definition", function () {
    it("should be registered as a component", function () {
      var ctrl = $componentController("testComponent", null, {});
      expect(ctrl).toBeDefined();
    });
  });

  describe("Controller", function () {
    var ctrl;

    beforeEach(function () {
      ctrl = $componentController("testComponent", { $log: $log }, {});
    });

    it("should be defined", function () {
      expect(ctrl).toBeDefined();
    });

    it("should have version property set to AngularJS version", function () {
      expect(ctrl.version).toBe(angular.version.full);
    });

    it("should have version property as a string", function () {
      expect(typeof ctrl.version).toBe("string");
    });

    it("should have version in semver format", function () {
      expect(ctrl.version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe("$onInit lifecycle hook", function () {
    var ctrl;

    beforeEach(function () {
      spyOn($log, "info");
      ctrl = $componentController("testComponent", { $log: $log }, {});
    });

    it("should have $onInit method defined", function () {
      expect(ctrl.$onInit).toBeDefined();
      expect(typeof ctrl.$onInit).toBe("function");
    });

    it("should log initialization message when $onInit is called", function () {
      ctrl.$onInit();
      expect($log.info).toHaveBeenCalledWith("test-component initialized...");
    });

    it("should call $log.info exactly once during initialization", function () {
      ctrl.$onInit();
      expect($log.info.calls.count()).toBe(1);
    });
  });

  describe("Dependency Injection", function () {
    it("should have $log injected", function () {
      var mockLog = jasmine.createSpyObj("$log", ["info", "warn", "error"]);
      var ctrl = $componentController("testComponent", { $log: mockLog }, {});
      ctrl.$onInit();
      expect(mockLog.info).toHaveBeenCalled();
    });

    it("should work with different $log implementations", function () {
      var customLog = {
        info: jasmine.createSpy("info"),
      };
      var ctrl = $componentController("testComponent", { $log: customLog }, {});
      ctrl.$onInit();
      expect(customLog.info).toHaveBeenCalledWith(
        "test-component initialized..."
      );
    });
  });

  describe("Component Bindings", function () {
    it("should have empty bindings object", function () {
      var ctrl = $componentController("testComponent", null, {});
      expect(ctrl).toBeDefined();
    });

    it("should work without any bindings passed", function () {
      var ctrl = $componentController("testComponent", { $log: $log }, {});
      expect(ctrl.version).toBeDefined();
    });
  });
});
