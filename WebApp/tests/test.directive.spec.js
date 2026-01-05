describe("TestDirective", function () {
  var $compile;
  var $rootScope;
  var $log;
  var $templateCache;

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

  describe("Directive Definition", function () {
    it("should be registered as a directive", function () {
      var $injector = angular.injector(["ng", "app"]);
      expect(function () {
        $injector.get("testDirectiveDirective");
      }).not.toThrow();
    });

    it("should have restrict set to E (element)", function () {
      var $injector = angular.injector(["ng", "app"]);
      var directive = $injector.get("testDirectiveDirective");
      expect(directive[0].restrict).toBe("E");
    });

    it("should have isolate scope", function () {
      var $injector = angular.injector(["ng", "app"]);
      var directive = $injector.get("testDirectiveDirective");
      expect(directive[0].scope).toEqual({});
    });

    it("should use vm as controllerAs", function () {
      var $injector = angular.injector(["ng", "app"]);
      var directive = $injector.get("testDirectiveDirective");
      expect(directive[0].controllerAs).toBe("vm");
    });

    it("should have templateUrl defined", function () {
      var $injector = angular.injector(["ng", "app"]);
      var directive = $injector.get("testDirectiveDirective");
      expect(directive[0].templateUrl).toBe("WebApp/Directives/test.directive.html");
    });
  });

  describe("Controller", function () {
    var element;
    var scope;
    var isolateScope;

    beforeEach(function () {
      spyOn($log, "info");
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
      isolateScope = element.isolateScope();
    });

    it("should create the directive element", function () {
      expect(element.length).toBe(1);
    });

    it("should have vm defined in isolate scope", function () {
      expect(isolateScope.vm).toBeDefined();
    });

    it("should have version property set to jQuery version", function () {
      expect(isolateScope.vm.version).toBe($().jquery);
    });

    it("should log info message on initialization", function () {
      expect($log.info).toHaveBeenCalledWith("test-directive initialized...");
    });
  });

  describe("Template Rendering", function () {
    var element;
    var scope;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should render the directive", function () {
      expect(element.length).toBe(1);
    });

    it("should have data-testid attribute for jquery-version", function () {
      var innerDiv = element.find('[data-testid="jquery-version"]');
      expect(innerDiv.length).toBe(1);
    });

    it("should have test-directive class", function () {
      var innerDiv = element.find(".test-directive");
      expect(innerDiv.length).toBe(1);
    });

    it("should display jQuery version text", function () {
      var text = element.text();
      expect(text).toContain("jQuery Version:");
    });
  });

  describe("Dependency Injection", function () {
    it("should have $log injected via factory function", function () {
      expect(TestDirective.$inject).toContain("$log");
    });
  });

  describe("jQuery Integration", function () {
    it("should have access to jQuery", function () {
      expect(typeof $).toBe("function");
      expect($().jquery).toBeDefined();
    });

    it("should display valid jQuery version format", function () {
      var version = $().jquery;
      expect(version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });
});
