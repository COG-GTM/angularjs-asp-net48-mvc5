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

    it("should call $onInit only once per initialization", function () {
      spyOn($log, "info");
      ctrl.$onInit();
      ctrl.$onInit();
      expect($log.info).toHaveBeenCalledTimes(2);
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

    it("should compile the component", function () {
      element = $compile("<test-component></test-component>")($rootScope);
      $rootScope.$digest();
      expect(element).toBeDefined();
    });

    it("should display the AngularJS version", function () {
      element = $compile("<test-component></test-component>")($rootScope);
      $rootScope.$digest();
      var text = element.text();
      expect(text).toContain("AngularJS Version:");
      expect(text).toContain(angular.version.full);
    });

    it("should have the correct test id attribute", function () {
      element = $compile("<test-component></test-component>")($rootScope);
      $rootScope.$digest();
      var html = element.html();
      expect(html).toContain('data-testid="angularjs-version"');
    });

    it("should have the test-component class", function () {
      element = $compile("<test-component></test-component>")($rootScope);
      $rootScope.$digest();
      var html = element.html();
      expect(html).toContain("test-component");
    });
  });

  describe("Bindings", function () {
    it("should have empty bindings object", function () {
      var componentInfo = $componentController("testComponent", null, {});
      expect(componentInfo).toBeDefined();
    });

    it("should work without any bindings passed", function () {
      ctrl = $componentController("testComponent", { $log: $log });
      expect(ctrl.version).toBeDefined();
    });
  });

  describe("Dependency Injection", function () {
    it("should inject $log service", function () {
      var mockLog = jasmine.createSpyObj("$log", ["info", "warn", "error"]);
      ctrl = $componentController("testComponent", { $log: mockLog });
      ctrl.$onInit();
      expect(mockLog.info).toHaveBeenCalled();
    });

    it("should handle $log.info being called with correct message", function () {
      var mockLog = jasmine.createSpyObj("$log", ["info"]);
      ctrl = $componentController("testComponent", { $log: mockLog });
      ctrl.$onInit();
      expect(mockLog.info).toHaveBeenCalledWith("test-component initialized...");
    });
  });
});
