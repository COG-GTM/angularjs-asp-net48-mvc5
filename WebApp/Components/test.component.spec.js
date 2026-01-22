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

    it("should have $onInit method defined", function () {
      expect(ctrl.$onInit).toBeDefined();
      expect(typeof ctrl.$onInit).toBe("function");
    });

    it("should log info message on $onInit", function () {
      spyOn($log, "info");
      ctrl.$onInit();
      expect($log.info).toHaveBeenCalledWith("test-component initialized...");
    });

    it("should have correct version format", function () {
      expect(ctrl.version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe("Component Definition", function () {
    var $compile;
    var $rootScope;
    var element;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it("should compile without errors", function () {
      element = $compile("<test-component></test-component>")($rootScope);
      $rootScope.$digest();
      expect(element).toBeDefined();
    });

    it("should render the template with version", function () {
      element = $compile("<test-component></test-component>")($rootScope);
      $rootScope.$digest();
      var content = element.text();
      expect(content).toContain("AngularJS Version:");
    });

    it("should have data-testid attribute", function () {
      element = $compile("<test-component></test-component>")($rootScope);
      $rootScope.$digest();
      var testIdElement = element.find('[data-testid="angularjs-version"]');
      expect(testIdElement.length).toBe(1);
    });

    it("should have test-component class", function () {
      element = $compile("<test-component></test-component>")($rootScope);
      $rootScope.$digest();
      var componentElement = element.find(".test-component");
      expect(componentElement.length).toBe(1);
    });
  });

  describe("Dependency Injection", function () {
    it("should have $log injected", function () {
      var injector = angular.injector(["ng", "app"]);
      var $log = injector.get("$log");
      expect($log).toBeDefined();
    });

    it("should use controllerAs vm", function () {
      ctrl = $componentController("testComponent", null, {});
      expect(ctrl.version).toBeDefined();
    });
  });
});
