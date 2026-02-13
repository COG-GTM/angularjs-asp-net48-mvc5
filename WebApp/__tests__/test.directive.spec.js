describe("TestDirective", function () {
  var $compile, $rootScope, $scope, $log, $templateCache;

  beforeEach(module("app"));

  beforeEach(module(function ($provide) {
    $provide.value("$log", jasmine.createSpyObj("$log", ["info", "warn", "error", "debug", "log"]));
  }));

  beforeEach(inject(function (
    _$compile_,
    _$rootScope_,
    _$log_,
    _$templateCache_
  ) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $log = _$log_;
    $templateCache = _$templateCache_;
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
      var element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      var directiveContent = element.find('[data-testid="jquery-version"]');
      expect(directiveContent.length).toBe(1);
    });

    it("should use an isolated scope", function () {
      var element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      var isolateScope = element.find('[data-testid="jquery-version"]').scope();
      expect(isolateScope).toBeDefined();
      expect(isolateScope.$parent).toBeDefined();
    });

    it("should use controllerAs vm", function () {
      var element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      var isolateScope = element.find('[data-testid="jquery-version"]').scope();
      expect(isolateScope.vm).toBeDefined();
    });
  });

  describe("controller behavior", function () {
    it("should set vm.version to jQuery version", function () {
      var element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      var isolateScope = element.find('[data-testid="jquery-version"]').scope();
      expect(isolateScope.vm.version).toBe($().jquery);
    });

    it("should have a version string", function () {
      var element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      var isolateScope = element.find('[data-testid="jquery-version"]').scope();
      expect(typeof isolateScope.vm.version).toBe("string");
    });

    it("should have version matching semver format", function () {
      var element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      var isolateScope = element.find('[data-testid="jquery-version"]').scope();
      expect(isolateScope.vm.version).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it("should log info message during initialization", function () {
      $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      expect($log.info).toHaveBeenCalledWith("test-directive initialized...");
    });
  });

  describe("template rendering", function () {
    it("should render the template with jQuery version", function () {
      var element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      var text = element.find('[data-testid="jquery-version"]').text();
      expect(text).toContain("jQuery Version:");
    });

    it("should have the correct data-testid attribute", function () {
      var element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      var el = element.find('[data-testid="jquery-version"]');
      expect(el.length).toBe(1);
    });

    it("should have the test-directive CSS class", function () {
      var element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      var el = element.find(".test-directive");
      expect(el.length).toBe(1);
    });

    it("should display the actual jQuery version value", function () {
      var element = $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      var text = element.find('[data-testid="jquery-version"]').text();
      expect(text).toContain($().jquery);
    });
  });

  describe("dependency injection", function () {
    it("should have $inject annotation for $log", function () {
      expect(TestDirective.$inject).toEqual(["$log"]);
    });

    it("should call $log.info exactly once", function () {
      $compile("<test-directive></test-directive>")($scope);
      $scope.$digest();
      expect($log.info.calls.count()).toBe(1);
    });
  });
});
