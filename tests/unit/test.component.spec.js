describe("testComponent", function () {
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
      ctrl = $componentController("testComponent", { $log: $log }, {});
    });

    it("should be defined", function () {
      expect(ctrl).toBeDefined();
    });

    it("should set version to the full AngularJS version string", function () {
      expect(ctrl.version).toBe(angular.version.full);
    });

    it("should have version as a string", function () {
      expect(typeof ctrl.version).toBe("string");
    });

    it("should have a non-empty version", function () {
      expect(ctrl.version.length).toBeGreaterThan(0);
    });

    it("should have a version matching semver pattern", function () {
      expect(ctrl.version).toMatch(/^\d+\.\d+\.\d+/);
    });

    describe("$onInit", function () {
      it("should be defined as a function", function () {
        expect(typeof ctrl.$onInit).toBe("function");
      });

      it("should log info message on initialization", function () {
        ctrl.$onInit();
        expect($log.info.logs.length).toBe(1);
        expect($log.info.logs[0][0]).toBe("test-component initialized...");
      });

      it("should not log warnings or errors on initialization", function () {
        ctrl.$onInit();
        expect($log.warn.logs.length).toBe(0);
        expect($log.error.logs.length).toBe(0);
      });
    });
  });

  describe("component registration", function () {
    it("should be registered on the app module", function () {
      var hasComponent = false;
      try {
        $componentController("testComponent", { $log: $log }, {});
        hasComponent = true;
      } catch (e) {
        hasComponent = false;
      }
      expect(hasComponent).toBe(true);
    });
  });

  describe("component definition", function () {
    var element, $compile;

    beforeEach(inject(function (_$compile_) {
      $compile = _$compile_;
    }));

    it("should render the component template", function () {
      var scope = $rootScope.$new();
      element = $compile("<test-component></test-component>")(scope);
      $rootScope.$digest();
      expect(element.html()).toContain("AngularJS Version:");
    });

    it("should display the version in the template", function () {
      var scope = $rootScope.$new();
      element = $compile("<test-component></test-component>")(scope);
      $rootScope.$digest();
      expect(element.text()).toContain(angular.version.full);
    });

    it("should have the test-component CSS class", function () {
      var scope = $rootScope.$new();
      element = $compile("<test-component></test-component>")(scope);
      $rootScope.$digest();
      var html = element.html();
      expect(html).toContain("test-component");
    });

    it("should have the data-testid attribute", function () {
      var scope = $rootScope.$new();
      element = $compile("<test-component></test-component>")(scope);
      $rootScope.$digest();
      var html = element.html();
      expect(html).toContain('data-testid="angularjs-version"');
    });
  });
});
