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

    it("should set version to angular.version.full", function () {
      expect(ctrl.version).toBe(angular.version.full);
    });

    it("should have a version that is a string", function () {
      expect(typeof ctrl.version).toBe("string");
    });

    it("should have a non-empty version", function () {
      expect(ctrl.version.length).toBeGreaterThan(0);
    });

    it("should have a version matching semver pattern", function () {
      expect(ctrl.version).toMatch(/^\d+\.\d+\.\d+/);
    });

    describe("$onInit", function () {
      it("should be defined", function () {
        expect(ctrl.$onInit).toBeDefined();
      });

      it("should be a function", function () {
        expect(typeof ctrl.$onInit).toBe("function");
      });

      it("should log info message on init", function () {
        ctrl.$onInit();
        expect($log.info.logs.length).toBe(1);
        expect($log.info.logs[0][0]).toBe("test-component initialized...");
      });

      it("should only log once per init call", function () {
        ctrl.$onInit();
        expect($log.info.logs.length).toBe(1);
      });

      it("should log multiple times if called multiple times", function () {
        ctrl.$onInit();
        ctrl.$onInit();
        expect($log.info.logs.length).toBe(2);
      });
    });
  });

  describe("component definition", function () {
    it("should be registered on the app module", function () {
      var invokeQueue = angular.module("app")._invokeQueue;
      var componentRegistered = invokeQueue.some(function (item) {
        return item[1] === "component" && item[2][0] === "testComponent";
      });
      expect(componentRegistered).toBe(true);
    });
  });

  describe("component template", function () {
    var $compile, scope, element;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      scope = _$rootScope_.$new();
      element = $compile("<test-component></test-component>")(scope);
      scope.$digest();
    }));

    it("should render the component element", function () {
      expect(element).toBeDefined();
    });

    it("should contain a div with data-testid attribute", function () {
      var div = element.find('[data-testid="angularjs-version"]');
      expect(div.length).toBe(1);
    });

    it("should have the test-component CSS class", function () {
      var div = element.find(".test-component");
      expect(div.length).toBe(1);
    });

    it("should display the AngularJS version in the template", function () {
      var div = element.find('[data-testid="angularjs-version"]');
      expect(div.text()).toContain("AngularJS Version:");
      expect(div.text()).toContain(angular.version.full);
    });
  });

  describe("dependency injection", function () {
    it("should have $log as an injected dependency", function () {
      expect(TestComponent.$inject).toContain("$log");
    });

    it("should have exactly one dependency", function () {
      expect(TestComponent.$inject.length).toBe(1);
    });
  });
});
