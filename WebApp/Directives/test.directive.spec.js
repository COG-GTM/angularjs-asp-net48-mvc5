describe("testDirective", function () {
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
    it("should be defined", function () {
      var directive = angular.module("app")._invokeQueue.find(function (item) {
        return item[1] === "directive" && item[2][0] === "testDirective";
      });
      expect(directive).toBeDefined();
    });

    it("should have restrict set to E (element)", function () {
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();

      var isolateScope = element.isolateScope();
      expect(isolateScope).toBeDefined();
    });

    it("should have isolate scope", function () {
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();

      var isolateScope = element.isolateScope();
      expect(isolateScope).toBeDefined();
    });

    it("should use templateUrl for external template", function () {
      var directive = angular.module("app")._invokeQueue.find(function (item) {
        return item[1] === "directive" && item[2][0] === "testDirective";
      });
      expect(directive).toBeDefined();
    });

    it("should have controllerAs set to vm", function () {
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();

      var isolateScope = element.isolateScope();
      expect(isolateScope.vm).toBeDefined();
    });
  });

  describe("controller", function () {
    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should have version property defined", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBeDefined();
    });

    it("should set version to jQuery version", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBe($().jquery);
    });

    it("should log info message on initialization", function () {
      spyOn($log, "info");

      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();

      expect($log.info).toHaveBeenCalledWith("test-directive initialized...");
    });
  });

  describe("template rendering", function () {
    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      scope.$digest();
    });

    it("should render the template", function () {
      expect(element.html()).toContain("jQuery Version:");
    });

    it("should have data-testid attribute", function () {
      var innerDiv = element.find('[data-testid="jquery-version"]');
      expect(innerDiv.length).toBe(1);
    });

    it("should have test-directive class", function () {
      var innerDiv = element.find(".test-directive");
      expect(innerDiv.length).toBe(1);
    });

    it("should display jQuery version in template", function () {
      var jqueryVersion = $().jquery;
      expect(element.text()).toContain(jqueryVersion);
    });
  });

  describe("dependency injection", function () {
    it("should inject $log service", function () {
      var directive = angular.module("app")._invokeQueue.find(function (item) {
        return item[1] === "directive" && item[2][0] === "testDirective";
      });
      expect(directive).toBeDefined();

      var directiveFactory = directive[2][1];
      expect(directiveFactory.$inject).toContain("$log");
    });
  });
});
