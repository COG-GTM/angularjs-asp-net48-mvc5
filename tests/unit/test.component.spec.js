describe("TestComponent", function () {
  var $componentController;
  var $log;
  var ctrl;

  beforeEach(module("app"));

  beforeEach(inject(function (_$componentController_, _$log_) {
    $componentController = _$componentController_;
    $log = _$log_;
  }));

  describe("Controller", function () {
    beforeEach(function () {
      ctrl = $componentController("testComponent", null, {});
    });

    it("should be defined", function () {
      expect(ctrl).toBeDefined();
    });

    it("should have version property set to angular version", function () {
      expect(ctrl.version).toBe(angular.version.full);
    });

    it("should have version as a string", function () {
      expect(typeof ctrl.version).toBe("string");
    });

    it("should have version in semver format", function () {
      var semverRegex = /^\d+\.\d+\.\d+(-\w+)?$/;
      expect(ctrl.version).toMatch(semverRegex);
    });
  });

  describe("$onInit lifecycle hook", function () {
    beforeEach(function () {
      spyOn($log, "info");
      ctrl = $componentController("testComponent", { $log: $log }, {});
    });

    it("should have $onInit method defined", function () {
      expect(ctrl.$onInit).toBeDefined();
    });

    it("should be a function", function () {
      expect(typeof ctrl.$onInit).toBe("function");
    });

    it("should log initialization message when called", function () {
      ctrl.$onInit();
      expect($log.info).toHaveBeenCalledWith("test-component initialized...");
    });

    it("should call $log.info exactly once", function () {
      ctrl.$onInit();
      expect($log.info.calls.count()).toBe(1);
    });
  });

  describe("Component registration", function () {
    it("should be registered with the app module", function () {
      var hasComponent = false;
      try {
        $componentController("testComponent", null, {});
        hasComponent = true;
      } catch (e) {
        hasComponent = false;
      }
      expect(hasComponent).toBe(true);
    });
  });

  describe("Bindings", function () {
    beforeEach(function () {
      ctrl = $componentController("testComponent", null, {});
    });

    it("should work without any bindings", function () {
      expect(ctrl).toBeDefined();
      expect(ctrl.version).toBeDefined();
    });
  });
});
