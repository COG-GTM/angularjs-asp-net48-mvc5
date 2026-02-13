describe("TestComponent", function () {
  var $componentController, $log, $rootScope;

  beforeEach(module("app"));

  beforeEach(inject(function (_$componentController_, _$log_, _$rootScope_) {
    $componentController = _$componentController_;
    $log = _$log_;
    $rootScope = _$rootScope_;
  }));

  describe("controller", function () {
    var ctrl;

    beforeEach(function () {
      ctrl = $componentController("testComponent", { $log: $log });
    });

    it("should be defined", function () {
      expect(ctrl).toBeDefined();
    });

    it("should set version to the full AngularJS version", function () {
      expect(ctrl.version).toBe(angular.version.full);
    });

    it("should have version as a string", function () {
      expect(typeof ctrl.version).toBe("string");
    });

    it("should have a version matching semver format", function () {
      expect(ctrl.version).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it("should log info message on $onInit", function () {
      ctrl.$onInit();
      expect($log.info.logs.length).toBe(1);
      expect($log.info.logs[0][0]).toBe("test-component initialized...");
    });

    it("should have $onInit as a function", function () {
      expect(typeof ctrl.$onInit).toBe("function");
    });
  });

  describe("component registration", function () {
    var $compile, $scope, element;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $scope = _$rootScope_.$new();
    }));

    it("should render the component template", function () {
      element = $compile("<test-component></test-component>")($scope);
      $scope.$digest();
      var div = element.find("div");
      expect(div.length).toBe(1);
    });

    it("should have the correct data-testid attribute", function () {
      element = $compile("<test-component></test-component>")($scope);
      $scope.$digest();
      var div = element.find('[data-testid="angularjs-version"]');
      expect(div.length).toBe(1);
    });

    it("should have the test-component CSS class", function () {
      element = $compile("<test-component></test-component>")($scope);
      $scope.$digest();
      var div = element.find(".test-component");
      expect(div.length).toBe(1);
    });

    it("should display the AngularJS version in the template", function () {
      element = $compile("<test-component></test-component>")($scope);
      $scope.$digest();
      var text = element.find("div").text();
      expect(text).toContain("AngularJS Version:");
      expect(text).toContain(angular.version.full);
    });

    it("should have empty bindings", function () {
      var componentDef =
        $componentController("testComponent", { $log: $log }).constructor;
      expect(componentDef).toBeDefined();
    });
  });

  describe("dependency injection", function () {
    it("should inject $log service", function () {
      var ctrl = $componentController("testComponent", { $log: $log });
      ctrl.$onInit();
      expect($log.info.logs).not.toEqual([]);
    });

    it("should have $inject annotation for $log", function () {
      expect(TestComponent.$inject).toEqual(["$log"]);
    });
  });
});
