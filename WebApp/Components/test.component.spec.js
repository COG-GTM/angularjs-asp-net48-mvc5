describe("TestComponent", function () {
  var $componentController;
  var $log;
  var ctrl;

  beforeEach(module("app"));

  beforeEach(inject(function (_$componentController_, _$log_) {
    $componentController = _$componentController_;
    $log = _$log_;
  }));

  describe("initialization", function () {
    beforeEach(function () {
      ctrl = $componentController("testComponent", null, {});
    });

    it("should be defined", function () {
      expect(ctrl).toBeDefined();
    });

    it("should have the AngularJS version", function () {
      expect(ctrl.version).toBe(angular.version.full);
    });

    it("should have a version string", function () {
      expect(typeof ctrl.version).toBe("string");
    });

    it("should have a non-empty version", function () {
      expect(ctrl.version.length).toBeGreaterThan(0);
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

  describe("component configuration", function () {
    var $compile;
    var $rootScope;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it("should use controllerAs vm", function () {
      var element = $compile("<test-component></test-component>")($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm).toBeDefined();
    });

    it("should render the template with data-testid", function () {
      var element = $compile("<test-component></test-component>")($rootScope);
      $rootScope.$digest();
      var testElement = $(element).find('[data-testid="angularjs-version"]');
      expect(testElement.length).toBe(1);
    });

    it("should have the test-component class", function () {
      var element = $compile("<test-component></test-component>")($rootScope);
      $rootScope.$digest();
      var testElement = $(element).find(".test-component");
      expect(testElement.length).toBe(1);
    });

    it("should display the version in the template", function () {
      var element = $compile("<test-component></test-component>")($rootScope);
      $rootScope.$digest();
      expect(element.text()).toContain("AngularJS Version:");
    });
  });
});
