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
  }));

  describe("Directive compilation", function () {
    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should compile without errors", function () {
      expect(element).toBeDefined();
    });

    it("should create an element", function () {
      expect(element.length).toBe(1);
    });

    it("should have the test-directive class", function () {
      var innerDiv = element.find(".test-directive");
      expect(innerDiv.length).toBe(1);
    });

    it("should have data-testid attribute", function () {
      var innerDiv = element.find('[data-testid="jquery-version"]');
      expect(innerDiv.length).toBe(1);
    });
  });

  describe("Controller", function () {
    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should have a controller", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm).toBeDefined();
    });

    it("should have version property", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBeDefined();
    });

    it("should have version as jQuery version", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBe($().jquery);
    });

    it("should log initialization message", function () {
      expect($log.info).toHaveBeenCalledWith("test-directive initialized...");
    });
  });

  describe("Template rendering", function () {
    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should display jQuery version in the template", function () {
      var text = element.text();
      expect(text).toContain("jQuery Version:");
    });

    it("should display the actual jQuery version number", function () {
      var text = element.text();
      expect(text).toContain($().jquery);
    });
  });

  describe("Directive configuration", function () {
    var directiveDefinition;

    beforeEach(inject(function ($injector) {
      var testDirectiveDirective = $injector.get("testDirectiveDirective");
      directiveDefinition = testDirectiveDirective[0];
    }));

    it("should be restricted to element", function () {
      expect(directiveDefinition.restrict).toBe("E");
    });

    it("should have isolated scope", function () {
      expect(directiveDefinition.scope).toEqual({});
    });

    it("should use controllerAs vm", function () {
      expect(directiveDefinition.controllerAs).toBe("vm");
    });

    it("should have templateUrl defined", function () {
      expect(directiveDefinition.templateUrl).toBe(
        "WebApp/Directives/test.directive.html"
      );
    });
  });

  describe("Scope isolation", function () {
    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
      scope.externalVar = "external";
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should not inherit parent scope properties", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.externalVar).toBeUndefined();
    });

    it("should have its own isolated scope", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.$parent).toBe(scope);
    });
  });
});
