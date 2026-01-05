describe("TestDirective", function () {
  var $compile;
  var $rootScope;
  var $log;
  var $httpBackend;
  var element;
  var scope;

  beforeEach(module("app"));

  beforeEach(inject(function (
    _$compile_,
    _$rootScope_,
    _$log_,
    _$httpBackend_
  ) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $log = _$log_;
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();

    $httpBackend
      .whenGET("WebApp/Directives/test.directive.html")
      .respond(
        '<div data-testid="jquery-version" class="test-directive">jQuery Version: {{ vm.version }}</div>'
      );
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe("Directive Definition", function () {
    it("should compile without errors", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      $httpBackend.flush();
      scope.$digest();
      expect(element).toBeDefined();
    });

    it("should be restricted to element", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      $httpBackend.flush();
      scope.$digest();
      expect(element.length).toBe(1);
    });

    it("should use templateUrl", function () {
      $httpBackend.expectGET("WebApp/Directives/test.directive.html");
      element = $compile("<test-directive></test-directive>")(scope);
      $httpBackend.flush();
      scope.$digest();
    });

    it("should have isolated scope", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      $httpBackend.flush();
      scope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope).toBeDefined();
    });
  });

  describe("Controller", function () {
    it("should have vm as controllerAs alias", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      $httpBackend.flush();
      scope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm).toBeDefined();
    });

    it("should have version property set to jQuery version", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      $httpBackend.flush();
      scope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBe($.fn.jquery);
    });

    it("should log info message on initialization", function () {
      spyOn($log, "info");
      element = $compile("<test-directive></test-directive>")(scope);
      $httpBackend.flush();
      scope.$digest();
      expect($log.info).toHaveBeenCalledWith("test-directive initialized...");
    });
  });

  describe("Template Rendering", function () {
    it("should render jQuery version in template", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      $httpBackend.flush();
      scope.$digest();
      var content = element.text();
      expect(content).toContain("jQuery Version:");
    });

    it("should have data-testid attribute in rendered template", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      $httpBackend.flush();
      scope.$digest();
      var testIdElement = element.find('[data-testid="jquery-version"]');
      expect(testIdElement.length).toBe(1);
    });

    it("should have test-directive CSS class in rendered template", function () {
      element = $compile("<test-directive></test-directive>")(scope);
      $httpBackend.flush();
      scope.$digest();
      var classElement = element.find(".test-directive");
      expect(classElement.length).toBe(1);
    });
  });

  describe("Dependency Injection", function () {
    it("should have $log injected", function () {
      spyOn($log, "info");
      element = $compile("<test-directive></test-directive>")(scope);
      $httpBackend.flush();
      scope.$digest();
      expect($log.info).toHaveBeenCalled();
    });
  });
});
