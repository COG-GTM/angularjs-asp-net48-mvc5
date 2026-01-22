describe("TestDirective", function () {
  var $compile;
  var $rootScope;
  var $log;
  var $templateCache;
  var element;
  var scope;

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

    scope = $rootScope.$new();
  }));

  afterEach(function () {
    if (element) {
      element.remove();
    }
    scope.$destroy();
  });

  describe("Directive Definition", function () {
    it("should compile the directive", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect(element).toBeDefined();
    });

    it("should restrict to element only", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect(element.html()).toContain("jQuery Version:");
    });

    it("should have isolated scope", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope).toBeDefined();
    });

    it("should use controllerAs vm", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm).toBeDefined();
    });
  });

  describe("Template", function () {
    it("should load the template", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect(element.html()).toBeTruthy();
    });

    it("should have the correct test id attribute", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      var versionDiv = element.find('[data-testid="jquery-version"]');
      expect(versionDiv.length).toBe(1);
    });

    it("should have the test-directive class", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      var directiveDiv = element.find(".test-directive");
      expect(directiveDiv.length).toBe(1);
    });

    it("should display jQuery version text", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect(element.text()).toContain("jQuery Version:");
    });
  });

  describe("Controller", function () {
    it("should have version property defined", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBeDefined();
    });

    it("should log info message on initialization", function () {
      spyOn($log, "info");
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect($log.info).toHaveBeenCalledWith("test-directive initialized...");
    });

    it("should call $log.info exactly once", function () {
      spyOn($log, "info");
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect($log.info).toHaveBeenCalledTimes(1);
    });
  });

  describe("Dependency Injection", function () {
    it("should inject $log service correctly", function () {
      spyOn($log, "info");
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect($log.info).toHaveBeenCalled();
    });
  });

  describe("Scope Isolation", function () {
    it("should not inherit parent scope properties", function () {
      scope.parentProperty = "test";
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.parentProperty).toBeUndefined();
    });

    it("should have its own scope", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.$id).not.toBe(scope.$id);
    });
  });

  describe("Multiple Instances", function () {
    it("should create independent instances", function () {
      spyOn($log, "info");
      var element1 = $compile("<test-directive></test-directive>")(scope);
      var element2 = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      expect($log.info).toHaveBeenCalledTimes(2);
      element1.remove();
      element2.remove();
    });

    it("should have separate scopes for each instance", function () {
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
