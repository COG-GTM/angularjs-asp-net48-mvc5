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

  describe("Controller", function () {
    var ctrl;

    beforeEach(function () {
      ctrl = $componentController("testComponent", null, {});
    });

    it("should be defined", function () {
      expect(ctrl).toBeDefined();
    });

    it("should have version property set to angular version", function () {
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
    });

    it("should be a function", function () {
      expect(typeof ctrl.$onInit).toBe("function");
    });

    it("should log info message when initialized", function () {
      ctrl.$onInit();
      expect($log.info).toHaveBeenCalled();
    });

    it("should log correct initialization message", function () {
      ctrl.$onInit();
      expect($log.info).toHaveBeenCalledWith("test-component initialized...");
    });

    it("should call $log.info exactly once", function () {
      ctrl.$onInit();
      expect($log.info.calls.count()).toBe(1);
    });
  });

  describe("Component definition", function () {
    var $compile;
    var element;
    var scope;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      scope = _$rootScope_.$new();
    }));

    it("should compile without errors", function () {
      element = $compile("<test-component></test-component>")(scope);
      scope.$digest();
      expect(element).toBeDefined();
    });

    it("should render with test-component class", function () {
      element = $compile("<test-component></test-component>")(scope);
      scope.$digest();
      expect(element.find(".test-component").length).toBe(1);
    });

    it("should have data-testid attribute", function () {
      element = $compile("<test-component></test-component>")(scope);
      scope.$digest();
      expect(element.find('[data-testid="angularjs-version"]').length).toBe(1);
    });

    it("should display AngularJS version text", function () {
      element = $compile("<test-component></test-component>")(scope);
      scope.$digest();
      expect(element.text()).toContain("AngularJS Version:");
    });

    it("should display the actual version number", function () {
      element = $compile("<test-component></test-component>")(scope);
      scope.$digest();
      expect(element.text()).toContain(angular.version.full);
    });
  });

  describe("Dependency injection", function () {
    it("should have $log as a dependency", function () {
      expect(TestComponent.$inject).toContain("$log");
    });

    it("should have exactly one dependency", function () {
      expect(TestComponent.$inject.length).toBe(1);
    });
  });
});
