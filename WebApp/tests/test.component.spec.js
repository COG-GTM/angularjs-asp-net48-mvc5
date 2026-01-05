describe("TestComponent", function () {
  var $componentController;
  var $log;
  var $compile;
  var $rootScope;

  beforeEach(module("app"));

  beforeEach(inject(function (_$componentController_, _$log_, _$compile_, _$rootScope_) {
    $componentController = _$componentController_;
    $log = _$log_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  describe("Controller", function () {
    var ctrl;

    beforeEach(function () {
      ctrl = $componentController("testComponent", { $log: $log });
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

    it("should display correct version format", function () {
      expect(ctrl.version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe("Component Registration", function () {
    it("should be registered as a component", function () {
      var $injector = angular.injector(["ng", "app"]);
      expect(function () {
        $injector.get("testComponentDirective");
      }).not.toThrow();
    });
  });

  describe("Template", function () {
    var element;
    var scope;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile("<test-component></test-component>")(scope);
      scope.$digest();
    });

    it("should render the component", function () {
      expect(element.length).toBe(1);
    });

    it("should have data-testid attribute", function () {
      var innerDiv = element.find('[data-testid="angularjs-version"]');
      expect(innerDiv.length).toBe(1);
    });

    it("should have test-component class", function () {
      var innerDiv = element.find(".test-component");
      expect(innerDiv.length).toBe(1);
    });

    it("should display AngularJS version text", function () {
      var text = element.text();
      expect(text).toContain("AngularJS Version:");
      expect(text).toContain(angular.version.full);
    });
  });

  describe("Bindings", function () {
    it("should have no required bindings", function () {
      var $injector = angular.injector(["ng", "app"]);
      var testComponentDirective = $injector.get("testComponentDirective");
      var bindings = testComponentDirective[0].bindings || {};
      expect(Object.keys(bindings).length).toBe(0);
    });
  });

  describe("ControllerAs", function () {
    it("should use vm as controllerAs", function () {
      var $injector = angular.injector(["ng", "app"]);
      var testComponentDirective = $injector.get("testComponentDirective");
      expect(testComponentDirective[0].controllerAs).toBe("vm");
    });
  });
});
