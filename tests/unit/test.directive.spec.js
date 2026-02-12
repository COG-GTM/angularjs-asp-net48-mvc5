describe("TestDirective", function () {
  var $compile, $rootScope, $log, $templateCache;

  beforeEach(module("app"));

  beforeEach(inject(function (
    _$compile_,
    _$rootScope_,
    _$log_,
    _$templateCache_
  ) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $log = _$log_;
    $templateCache = _$templateCache_;

    $templateCache.put(
      "WebApp/Directives/test.directive.html",
      '<div data-testid="jquery-version" class="test-directive">jQuery Version: {{ vm.version }}</div>'
    );
  }));

  describe("directive definition", function () {
    it("should be registered on the app module", function () {
      var invokeQueue = angular.module("app")._invokeQueue;
      var directiveRegistered = invokeQueue.some(function (item) {
        return item[1] === "directive" && item[2][0] === "testDirective";
      });
      expect(directiveRegistered).toBe(true);
    });
  });

  describe("directive factory", function () {
    var directiveDefinition;

    beforeEach(inject(function ($injector) {
      var directives = $injector.get("testDirectiveDirective");
      directiveDefinition = directives[0];
    }));

    it("should be defined", function () {
      expect(directiveDefinition).toBeDefined();
    });

    it("should restrict to element usage", function () {
      expect(directiveDefinition.restrict).toBe("E");
    });

    it("should have an isolate scope", function () {
      expect(directiveDefinition.scope).toEqual({});
    });

    it("should use controllerAs vm", function () {
      expect(directiveDefinition.controllerAs).toBe("vm");
    });

    it("should reference the correct template URL", function () {
      expect(directiveDefinition.templateUrl).toBe(
        "WebApp/Directives/test.directive.html"
      );
    });
  });

  describe("directive rendering", function () {
    var element, scope;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should render the directive element", function () {
      expect(element).toBeDefined();
    });

    it("should contain a div with data-testid attribute", function () {
      var div = element.find('[data-testid="jquery-version"]');
      expect(div.length).toBe(1);
    });

    it("should have the test-directive CSS class", function () {
      var div = element.find(".test-directive");
      expect(div.length).toBe(1);
    });

    it("should display the jQuery version", function () {
      var div = element.find('[data-testid="jquery-version"]');
      expect(div.text()).toContain("jQuery Version:");
    });

    it("should display the actual jQuery version value", function () {
      var div = element.find('[data-testid="jquery-version"]');
      expect(div.text()).toContain($.fn.jquery);
    });
  });

  describe("directive controller", function () {
    var element, scope, directiveScope;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      directiveScope = element.isolateScope();
    });

    it("should set the jQuery version on the controller", function () {
      expect(directiveScope.vm.version).toBe($.fn.jquery);
    });

    it("should have a version that is a string", function () {
      expect(typeof directiveScope.vm.version).toBe("string");
    });

    it("should have a non-empty version", function () {
      expect(directiveScope.vm.version.length).toBeGreaterThan(0);
    });

    it("should have a version matching semver pattern", function () {
      expect(directiveScope.vm.version).toMatch(/^\d+\.\d+\.\d+/);
    });

    it("should log info message on initialization", function () {
      expect($log.info.logs.length).toBeGreaterThan(0);
      var foundLog = $log.info.logs.some(function (log) {
        return log[0] === "test-directive initialized...";
      });
      expect(foundLog).toBe(true);
    });
  });

  describe("dependency injection", function () {
    it("should have $log as an injected dependency", function () {
      expect(TestDirective.$inject).toContain("$log");
    });

    it("should have exactly one dependency", function () {
      expect(TestDirective.$inject.length).toBe(1);
    });
  });
});
