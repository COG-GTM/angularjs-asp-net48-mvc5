describe("TestDirective", function () {
  var $compile;
  var $rootScope;
  var $log;
  var $templateCache;
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
    scope = $rootScope.$new();

    $templateCache.put(
      "WebApp/Directives/test.directive.html",
      '<div data-testid="jquery-version" class="test-directive">jQuery Version: {{ vm.version }}</div>'
    );
  }));

  describe("Directive definition", function () {
    it("should be defined", function () {
      expect(TestDirective).toBeDefined();
    });

    it("should be a function", function () {
      expect(typeof TestDirective).toBe("function");
    });

    it("should have $log as a dependency", function () {
      expect(TestDirective.$inject).toContain("$log");
    });

    it("should have exactly one dependency", function () {
      expect(TestDirective.$inject.length).toBe(1);
    });
  });

  describe("Directive factory", function () {
    var directiveDefinition;

    beforeEach(function () {
      directiveDefinition = TestDirective($log);
    });

    it("should return an object", function () {
      expect(typeof directiveDefinition).toBe("object");
    });

    it("should restrict to element", function () {
      expect(directiveDefinition.restrict).toBe("E");
    });

    it("should have isolated scope", function () {
      expect(directiveDefinition.scope).toEqual({});
    });

    it("should have templateUrl defined", function () {
      expect(directiveDefinition.templateUrl).toBe(
        "WebApp/Directives/test.directive.html"
      );
    });

    it("should use controllerAs vm", function () {
      expect(directiveDefinition.controllerAs).toBe("vm");
    });

    it("should have a controller function", function () {
      expect(typeof directiveDefinition.controller).toBe("function");
    });
  });

  describe("Directive controller", function () {
    var element;

    beforeEach(function () {
      spyOn($log, "info");
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should compile without errors", function () {
      expect(element).toBeDefined();
    });

    it("should log info message when initialized", function () {
      expect($log.info).toHaveBeenCalled();
    });

    it("should log correct initialization message", function () {
      expect($log.info).toHaveBeenCalledWith("test-directive initialized...");
    });

    it("should call $log.info exactly once", function () {
      expect($log.info.calls.count()).toBe(1);
    });
  });

  describe("Directive template rendering", function () {
    var element;

    beforeEach(function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should render with test-directive class", function () {
      expect(element.find(".test-directive").length).toBe(1);
    });

    it("should have data-testid attribute", function () {
      expect(element.find('[data-testid="jquery-version"]').length).toBe(1);
    });

    it("should display jQuery version text", function () {
      expect(element.text()).toContain("jQuery Version:");
    });

    it("should display the actual jQuery version number", function () {
      expect(element.text()).toContain($().jquery);
    });
  });

  describe("jQuery version property", function () {
    var element;
    var isolateScope;

    beforeEach(function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      isolateScope = element.isolateScope();
    });

    it("should have vm defined in isolate scope", function () {
      expect(isolateScope.vm).toBeDefined();
    });

    it("should have version property on vm", function () {
      expect(isolateScope.vm.version).toBeDefined();
    });

    it("should have version as a string", function () {
      expect(typeof isolateScope.vm.version).toBe("string");
    });

    it("should match jQuery version", function () {
      expect(isolateScope.vm.version).toBe($().jquery);
    });

    it("should have version in semver format", function () {
      expect(isolateScope.vm.version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe("Isolated scope behavior", function () {
    var element;
    var parentScope;

    beforeEach(function () {
      parentScope = $rootScope.$new();
      parentScope.testValue = "parent value";
      element = $compile("<test-directive></test-directive>")(parentScope);
      parentScope.$digest();
    });

    it("should not inherit parent scope properties", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.testValue).toBeUndefined();
    });

    it("should have its own scope", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.$id).not.toBe(parentScope.$id);
    });
  });
});
