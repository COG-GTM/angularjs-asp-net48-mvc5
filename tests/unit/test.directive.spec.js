describe("testDirective", function () {
  var $compile, $rootScope, $log, $templateCache;

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
    var element, scope;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      $rootScope.$digest();
    });

    it("should compile successfully", function () {
      expect(element).toBeDefined();
    });

    it("should render the directive template", function () {
      expect(element.html()).toContain("jQuery Version:");
    });

    it("should display the jQuery version", function () {
      var jqueryVersion = $.fn.jquery;
      expect(element.text()).toContain(jqueryVersion);
    });

    it("should have the test-directive CSS class", function () {
      var html = element.html();
      expect(html).toContain("test-directive");
    });

    it("should have the data-testid attribute", function () {
      var html = element.html();
      expect(html).toContain('data-testid="jquery-version"');
    });

    it("should use an isolated scope", function () {
      var directiveScope = element.isolateScope();
      expect(directiveScope).toBeDefined();
    });
  });

  describe("controller", function () {
    var element, scope, directiveScope;

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile("<test-directive></test-directive>")(scope);
      $rootScope.$digest();
      directiveScope = element.isolateScope();
    });

    it("should set the jQuery version on vm", function () {
      expect(directiveScope.vm.version).toBe($.fn.jquery);
    });

    it("should have a string version value", function () {
      expect(typeof directiveScope.vm.version).toBe("string");
    });

    it("should have a non-empty version", function () {
      expect(directiveScope.vm.version.length).toBeGreaterThan(0);
    });

    it("should have a version matching a version pattern", function () {
      expect(directiveScope.vm.version).toMatch(/^\d+\.\d+\.\d+/);
    });

    it("should log info message on initialization", function () {
      var initLogs = $log.info.logs.filter(function (log) {
        return log[0] === "test-directive initialized...";
      });
      expect(initLogs.length).toBeGreaterThan(0);
    });

    it("should not produce any error logs", function () {
      expect($log.error.logs.length).toBe(0);
    });

    it("should not produce any warning logs", function () {
      expect($log.warn.logs.length).toBe(0);
    });
  });

  describe("restriction", function () {
    it("should render as an element", function () {
      var scope = $rootScope.$new();
      var element = $compile("<test-directive></test-directive>")(scope);
      $rootScope.$digest();
      expect(element.html()).toContain("jQuery Version:");
    });

    it("should not render as an attribute", function () {
      var scope = $rootScope.$new();
      var element = $compile('<div test-directive=""></div>')(scope);
      $rootScope.$digest();
      expect(element.html()).not.toContain("jQuery Version:");
    });
  });
});
