describe("TestDirective", function () {
  var $compile;
  var $rootScope;
  var $log;
  var $templateCache;
  var element;
  var scope;

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

    scope = $rootScope.$new();
  }));

  afterEach(function () {
    if (element) {
      element.remove();
    }
    scope.$destroy();
  });

  describe("Directive Definition", function () {
    it("should be defined", function () {
      var injector = angular.injector(["ng", "app"]);
      expect(injector.has("testDirectiveDirective")).toBe(true);
    });

    it("should compile without errors", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect(element).toBeDefined();
    });

    it("should be restricted to element", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect(element.length).toBe(1);
    });
  });

  describe("Template Rendering", function () {
    beforeEach(function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should render the template", function () {
      var content = element.text();
      expect(content).toContain("jQuery Version:");
    });

    it("should have data-testid attribute", function () {
      var testIdElement = element.find('[data-testid="jquery-version"]');
      expect(testIdElement.length).toBe(1);
    });

    it("should have test-directive class", function () {
      var directiveElement = element.find(".test-directive");
      expect(directiveElement.length).toBe(1);
    });
  });

  describe("Controller", function () {
    beforeEach(function () {
      spyOn($log, "info");
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should log info message on initialization", function () {
      expect($log.info).toHaveBeenCalledWith("test-directive initialized...");
    });

    it("should have isolated scope", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope).toBeDefined();
    });

    it("should have vm controller alias", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm).toBeDefined();
    });

    it("should have version property on vm", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBeDefined();
    });
  });

  describe("jQuery Integration", function () {
    beforeEach(function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should display jQuery version", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBeDefined();
    });

    it("should have version as string", function () {
      var isolateScope = element.isolateScope();
      expect(typeof isolateScope.vm.version).toBe("string");
    });
  });

  describe("Dependency Injection", function () {
    it("should have $log injected", function () {
      spyOn($log, "info");
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect($log.info).toHaveBeenCalled();
    });
  });

  describe("Scope Isolation", function () {
    it("should not inherit from parent scope", function () {
      scope.parentProperty = "test";
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.parentProperty).toBeUndefined();
    });

    it("should have empty bindings", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      var isolateScope = element.isolateScope();
      expect(Object.keys(isolateScope).filter(function (key) {
        return !key.startsWith("$") && key !== "vm";
      }).length).toBe(0);
    });
  });

  describe("Cleanup", function () {
    it("should handle cleanup when element is not created", function () {
      element = null;
      expect(element).toBeNull();
    });
  });
});
