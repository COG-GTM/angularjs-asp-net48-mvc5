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

  describe("Directive Definition", function () {
    it("should be defined as a directive", inject(function ($injector) {
      var directive = $injector.get("testDirectiveDirective");
      expect(directive).toBeDefined();
      expect(directive.length).toBe(1);
    }));

    it("should be restricted to element", inject(function ($injector) {
      var directive = $injector.get("testDirectiveDirective")[0];
      expect(directive.restrict).toBe("E");
    }));

    it("should have isolated scope", inject(function ($injector) {
      var directive = $injector.get("testDirectiveDirective")[0];
      expect(directive.scope).toEqual({});
    }));

    it("should have correct templateUrl", inject(function ($injector) {
      var directive = $injector.get("testDirectiveDirective")[0];
      expect(directive.templateUrl).toBe(
        "WebApp/Directives/test.directive.html"
      );
    }));

    it("should use controllerAs vm", inject(function ($injector) {
      var directive = $injector.get("testDirectiveDirective")[0];
      expect(directive.controllerAs).toBe("vm");
    }));

    it("should have a controller function", inject(function ($injector) {
      var directive = $injector.get("testDirectiveDirective")[0];
      expect(typeof directive.controller).toBe("function");
    }));
  });

  describe("Directive Compilation", function () {
    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    afterEach(function () {
      if (element) {
        element.remove();
      }
      if (scope) {
        scope.$destroy();
      }
    });

    it("should compile without errors", function () {
      expect(element).toBeDefined();
    });

    it("should create an element", function () {
      expect(element.length).toBe(1);
    });

    it("should have the test-directive class", function () {
      var innerDiv = element.find("div");
      expect(innerDiv.hasClass("test-directive")).toBe(true);
    });

    it("should have data-testid attribute", function () {
      var innerDiv = element.find("div");
      expect(innerDiv.attr("data-testid")).toBe("jquery-version");
    });
  });

  describe("Controller", function () {
    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    afterEach(function () {
      if (element) {
        element.remove();
      }
      if (scope) {
        scope.$destroy();
      }
    });

    it("should log initialization message", function () {
      expect($log.info).toHaveBeenCalledWith("test-directive initialized...");
    });

    it("should call $log.info exactly once", function () {
      expect($log.info.calls.count()).toBe(1);
    });

    it("should set version property to jQuery version", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBe($().jquery);
    });

    it("should have version as a string", function () {
      var isolateScope = element.isolateScope();
      expect(typeof isolateScope.vm.version).toBe("string");
    });

    it("should have version in semver format", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe("Template Rendering", function () {
    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    afterEach(function () {
      if (element) {
        element.remove();
      }
      if (scope) {
        scope.$destroy();
      }
    });

    it("should render jQuery version in template", function () {
      var text = element.text();
      expect(text).toContain("jQuery Version:");
      expect(text).toContain($().jquery);
    });

    it("should display version number", function () {
      var text = element.text();
      expect(text).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
    });
  });

  describe("Isolated Scope", function () {
    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
      scope.parentValue = "test";
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    afterEach(function () {
      if (element) {
        element.remove();
      }
      if (scope) {
        scope.$destroy();
      }
    });

    it("should not inherit parent scope properties", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.parentValue).toBeUndefined();
    });

    it("should have its own scope", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope).toBeDefined();
      expect(isolateScope.$id).not.toBe(scope.$id);
    });
  });

  describe("Dependency Injection", function () {
    it("should have $log injected via $inject annotation", function () {
      expect(TestDirective.$inject).toEqual(["$log"]);
    });
  });

  describe("Multiple Instances", function () {
    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
    });

    afterEach(function () {
      if (scope) {
        scope.$destroy();
      }
    });

    it("should allow multiple instances", function () {
      var element1 = $compile("<test-directive></test-directive>")(scope);
      var element2 = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();

      expect(element1.length).toBe(1);
      expect(element2.length).toBe(1);

      element1.remove();
      element2.remove();
    });

    it("should have independent scopes for each instance", function () {
      var element1 = $compile("<test-directive></test-directive>")(scope);
      var element2 = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();

      var scope1 = element1.isolateScope();
      var scope2 = element2.isolateScope();

      expect(scope1.$id).not.toBe(scope2.$id);

      element1.remove();
      element2.remove();
    });
  });
});
