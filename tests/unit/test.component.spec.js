describe("TestComponent", function () {
  var $componentController, $rootScope, $log;

  beforeEach(module("app"));

  beforeEach(inject(function (_$componentController_, _$rootScope_, _$log_) {
    $componentController = _$componentController_;
    $rootScope = _$rootScope_;
    $log = _$log_;
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
      expect(ctrl.version).toEqual(angular.version.full);
    });

    it("should have version as a string", function () {
      expect(typeof ctrl.version).toBe("string");
    });

    it("should have a non-empty version", function () {
      expect(ctrl.version.length).toBeGreaterThan(0);
    });

    it("should have a version matching semver format", function () {
      var semverPattern = /^\d+\.\d+\.\d+$/;
      expect(ctrl.version).toMatch(semverPattern);
    });

    it("should have $onInit lifecycle hook defined", function () {
      expect(ctrl.$onInit).toBeDefined();
      expect(typeof ctrl.$onInit).toBe("function");
    });

    it("should log info message on $onInit", function () {
      ctrl.$onInit();
      expect($log.info.logs.length).toBe(1);
      expect($log.info.logs[0][0]).toBe("test-component initialized...");
    });

    it("should not log before $onInit is called", function () {
      expect($log.info.logs.length).toBe(0);
    });
  });

  describe("component definition", function () {
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

    it("should display AngularJS version in the template", function () {
      element = $compile("<test-component></test-component>")($scope);
      $scope.$digest();
      var text = element.find("div").text();
      expect(text).toContain("AngularJS Version:");
      expect(text).toContain(angular.version.full);
    });

    it("should render with correct text format", function () {
      element = $compile("<test-component></test-component>")($scope);
      $scope.$digest();
      var text = element.find("div").text().trim();
      expect(text).toBe("AngularJS Version: " + angular.version.full);
    });
  });

  describe("dependency injection", function () {
    it("should have $log as an injectable dependency", function () {
      expect(TestComponent.$inject).toContain("$log");
    });

    it("should have exactly one dependency", function () {
      expect(TestComponent.$inject.length).toBe(1);
    });
  });
});
