describe("testComponent", function () {
  var $componentController, $rootScope, $log, $compile;

  beforeEach(module("app"));

  beforeEach(inject(function (_$componentController_, _$rootScope_, _$log_, _$compile_) {
    $componentController = _$componentController_;
    $rootScope = _$rootScope_;
    $log = _$log_;
    $compile = _$compile_;
  }));

  describe("controller", function () {
    var ctrl;

    beforeEach(function () {
      ctrl = $componentController("testComponent", { $log: $log });
    });

    it("should be defined", function () {
      expect(ctrl).toBeDefined();
    });

    it("should set the version to the full AngularJS version", function () {
      expect(ctrl.version).toBe(angular.version.full);
    });

    it("should have a version that is a non-empty string", function () {
      expect(typeof ctrl.version).toBe("string");
      expect(ctrl.version.length).toBeGreaterThan(0);
    });

    it("should have a version matching semver format", function () {
      expect(ctrl.version).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it("should have $onInit defined", function () {
      expect(ctrl.$onInit).toBeDefined();
      expect(typeof ctrl.$onInit).toBe("function");
    });

    it("should log info message on $onInit", function () {
      spyOn($log, "info");
      ctrl.$onInit();
      expect($log.info).toHaveBeenCalledWith("test-component initialized...");
    });

    it("should log info exactly once on $onInit", function () {
      spyOn($log, "info");
      ctrl.$onInit();
      expect($log.info.calls.count()).toBe(1);
    });
  });

  describe("component registration", function () {
    it("should be registered on the app module", function () {
      expect(function () {
        $componentController("testComponent");
      }).not.toThrow();
    });
  });

  describe("template rendering", function () {
    var element, scope;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile("<test-component></test-component>")(scope);
      scope.$digest();
    });

    it("should render the component element", function () {
      expect(element.length).toBe(1);
    });

    it("should display the AngularJS version in the template", function () {
      var text = element.text().trim();
      expect(text).toContain("AngularJS Version:");
      expect(text).toContain(angular.version.full);
    });

    it("should have the data-testid attribute", function () {
      var versionEl = element.find('[data-testid="angularjs-version"]');
      expect(versionEl.length).toBe(1);
    });

    it("should have the test-component CSS class", function () {
      var versionEl = element.find(".test-component");
      expect(versionEl.length).toBe(1);
    });
  });

  describe("dependency injection", function () {
    it("should declare $log as a dependency", function () {
      expect(TestComponent.$inject).toEqual(["$log"]);
    });
  });

  describe("bindings", function () {
    it("should use controllerAs vm", function () {
      var scope = $rootScope.$new();
      var element = $compile("<test-component></test-component>")(scope);
      scope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm).toBeDefined();
      expect(isolateScope.vm.version).toBe(angular.version.full);
    });
  });
});
