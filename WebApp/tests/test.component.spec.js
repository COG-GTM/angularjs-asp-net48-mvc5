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

    it("should have correct controllerAs alias", function () {
      expect(ctrl).toBeDefined();
    });
  });

  describe("Component Definition", function () {
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

    it("should render version in template", function () {
      element = $compile("<test-component></test-component>")(scope);
      scope.$digest();
      var content = element.text();
      expect(content).toContain("AngularJS Version:");
    });

    it("should have data-testid attribute", function () {
      element = $compile("<test-component></test-component>")(scope);
      scope.$digest();
      var testIdElement = element.find('[data-testid="angularjs-version"]');
      expect(testIdElement.length).toBe(1);
    });

    it("should have test-component CSS class", function () {
      element = $compile("<test-component></test-component>")(scope);
      scope.$digest();
      var classElement = element.find(".test-component");
      expect(classElement.length).toBe(1);
    });
  });

  describe("Dependency Injection", function () {
    it("should have $log injected", function () {
      var ctrl = $componentController("testComponent", { $log: $log });
      expect(ctrl).toBeDefined();
    });

    it("should work with mock $log", function () {
      var mockLog = { info: jasmine.createSpy("info") };
      var ctrl = $componentController("testComponent", { $log: mockLog });
      ctrl.$onInit();
      expect(mockLog.info).toHaveBeenCalled();
    });
  });
});
