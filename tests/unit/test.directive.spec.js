describe("testDirective", function () {
  var $compile, $rootScope, $log, $templateCache;

  beforeEach(module("app"));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$log_, _$templateCache_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $log = _$log_;
    $templateCache = _$templateCache_;

    $templateCache.put(
      "WebApp/Directives/test.directive.html",
      '<div data-testid="jquery-version" class="test-directive">jQuery Version: {{ vm.version }}</div>'
    );
  }));

  describe("directive compilation", function () {
    var element, scope;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should compile the directive", function () {
      expect(element).toBeDefined();
      expect(element.length).toBe(1);
    });

    it("should render the template", function () {
      var text = element.text().trim();
      expect(text).toContain("jQuery Version:");
    });

    it("should display the jQuery version from the controller", function () {
      var expectedVersion = $.fn.jquery;
      var text = element.text().trim();
      expect(text).toContain(expectedVersion);
    });

    it("should have the data-testid attribute on the inner element", function () {
      var versionEl = element.find('[data-testid="jquery-version"]');
      expect(versionEl.length).toBe(1);
    });

    it("should have the test-directive CSS class", function () {
      var directiveEl = element.find(".test-directive");
      expect(directiveEl.length).toBe(1);
    });
  });

  describe("directive definition", function () {
    var directiveFactory;

    beforeEach(inject(function ($injector) {
      var directives = $injector.get("testDirectiveDirective");
      directiveFactory = directives[0];
    }));

    it("should be restricted to element", function () {
      expect(directiveFactory.restrict).toBe("E");
    });

    it("should use an isolate scope", function () {
      expect(directiveFactory.scope).toEqual({});
    });

    it("should use controllerAs vm", function () {
      expect(directiveFactory.controllerAs).toBe("vm");
    });

    it("should reference the correct template URL", function () {
      expect(directiveFactory.templateUrl).toBe("WebApp/Directives/test.directive.html");
    });
  });

  describe("controller", function () {
    var element, scope, isolateScope;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      isolateScope = element.isolateScope();
    });

    it("should expose the controller as vm", function () {
      expect(isolateScope.vm).toBeDefined();
    });

    it("should set the jQuery version on vm", function () {
      expect(isolateScope.vm.version).toBe($.fn.jquery);
    });

    it("should have a non-empty version string", function () {
      expect(typeof isolateScope.vm.version).toBe("string");
      expect(isolateScope.vm.version.length).toBeGreaterThan(0);
    });

    it("should have a version matching semver format", function () {
      expect(isolateScope.vm.version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe("dependency injection", function () {
    it("should declare $log as a dependency", function () {
      expect(TestDirective.$inject).toEqual(["$log"]);
    });
  });

  describe("logging", function () {
    it("should log info message during initialization", function () {
      spyOn($log, "info");
      var scope = $rootScope.$new();
      $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect($log.info).toHaveBeenCalledWith("test-directive initialized...");
    });

    it("should log info exactly once during initialization", function () {
      spyOn($log, "info");
      var scope = $rootScope.$new();
      $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect($log.info.calls.count()).toBe(1);
    });
  });
});
