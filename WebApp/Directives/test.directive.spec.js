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

  describe("directive definition", function () {
    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should compile the directive", function () {
      expect(element).toBeDefined();
    });

    it("should be restricted to element", function () {
      expect(element.length).toBe(1);
    });

    it("should have an isolated scope", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope).toBeDefined();
    });

    it("should use controllerAs vm", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm).toBeDefined();
    });
  });

  describe("controller", function () {
    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should have the jQuery version", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBe($.fn.jquery);
    });

    it("should have a version string", function () {
      var isolateScope = element.isolateScope();
      expect(typeof isolateScope.vm.version).toBe("string");
    });

    it("should have a non-empty version", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version.length).toBeGreaterThan(0);
    });

    it("should log initialization message", function () {
      expect($log.info).toHaveBeenCalledWith("test-directive initialized...");
    });

    it("should call $log.info exactly once", function () {
      expect($log.info.calls.count()).toBe(1);
    });
  });

  describe("template rendering", function () {
    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should render the template", function () {
      expect(element.html()).toContain("jQuery Version:");
    });

    it("should have the data-testid attribute", function () {
      var testElement = $(element).find('[data-testid="jquery-version"]');
      expect(testElement.length).toBe(1);
    });

    it("should have the test-directive class", function () {
      var testElement = $(element).find(".test-directive");
      expect(testElement.length).toBe(1);
    });

    it("should display the jQuery version in the template", function () {
      var isolateScope = element.isolateScope();
      expect(element.text()).toContain(isolateScope.vm.version);
    });
  });

  describe("directive factory function", function () {
    it("should be registered with the app module", function () {
      var hasDirective = false;
      try {
        inject(function (testDirectiveDirective) {
          hasDirective = testDirectiveDirective !== undefined;
        });
      } catch (e) {
        hasDirective = false;
      }
      expect(hasDirective).toBe(true);
    });
  });
});
