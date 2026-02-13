describe("TestDirective", function () {
  var $compile, $rootScope, $scope, $log, $templateCache;

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
    $scope = $rootScope.$new();

    $templateCache.put(
      "WebApp/Directives/test.directive.html",
      '<div data-testid="jquery-version" class="test-directive">jQuery Version: {{ vm.version }}</div>'
    );
  }));

  describe("directive definition", function () {
    it("should be defined as a directive", function () {
      var element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      expect(element).toBeDefined();
    });

    it("should restrict to element only", function () {
      inject(function ($injector) {
        var directives = $injector.get("testDirectiveDirective");
        expect(directives[0].restrict).toBe("E");
      });
    });

    it("should use an isolate scope", function () {
      inject(function ($injector) {
        var directives = $injector.get("testDirectiveDirective");
        expect(directives[0].scope).toEqual({});
      });
    });

    it("should use controllerAs vm", function () {
      inject(function ($injector) {
        var directives = $injector.get("testDirectiveDirective");
        expect(directives[0].controllerAs).toBe("vm");
      });
    });

    it("should use the correct templateUrl", function () {
      inject(function ($injector) {
        var directives = $injector.get("testDirectiveDirective");
        expect(directives[0].templateUrl).toBe(
          "WebApp/Directives/test.directive.html"
        );
      });
    });
  });

  describe("controller behavior", function () {
    var element;

    beforeEach(function () {
      element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
    });

    it("should set the jQuery version", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBeDefined();
    });

    it("should set version to the current jQuery version", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toEqual($.fn.jquery);
    });

    it("should have a non-empty version string", function () {
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version.length).toBeGreaterThan(0);
    });

    it("should have version as a string type", function () {
      var isolateScope = element.isolateScope();
      expect(typeof isolateScope.vm.version).toBe("string");
    });

    it("should log info message on initialization", function () {
      expect($log.info.logs.length).toBeGreaterThan(0);
      var foundLog = $log.info.logs.some(function (log) {
        return log[0] === "test-directive initialized...";
      });
      expect(foundLog).toBe(true);
    });
  });

  describe("template rendering", function () {
    var element;

    beforeEach(function () {
      element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
    });

    it("should render the template content", function () {
      var div = element.find("div");
      expect(div.length).toBe(1);
    });

    it("should have the correct data-testid attribute", function () {
      var div = element.find('[data-testid="jquery-version"]');
      expect(div.length).toBe(1);
    });

    it("should have the test-directive CSS class", function () {
      var div = element.find(".test-directive");
      expect(div.length).toBe(1);
    });

    it("should display jQuery version text", function () {
      var text = element.find("div").text();
      expect(text).toContain("jQuery Version:");
    });

    it("should display the actual jQuery version number", function () {
      var text = element.find("div").text();
      expect(text).toContain($.fn.jquery);
    });

    it("should render with correct full text format", function () {
      var text = element.find("div").text().trim();
      expect(text).toBe("jQuery Version: " + $.fn.jquery);
    });
  });

  describe("dependency injection", function () {
    it("should have $log as an injectable dependency", function () {
      expect(TestDirective.$inject).toContain("$log");
    });

    it("should have exactly one dependency", function () {
      expect(TestDirective.$inject.length).toBe(1);
    });
  });
});
