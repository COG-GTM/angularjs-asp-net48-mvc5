describe('testDirective', function() {
  var $compile;
  var $rootScope;
  var $log;
  var $templateCache;

  beforeEach(module('app'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$log_, _$templateCache_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $log = _$log_;
    $templateCache = _$templateCache_;

    $templateCache.put('WebApp/Directives/test.directive.html',
      '<div data-testid="jquery-version" class="test-directive">jQuery Version: {{vm.version}}</div>');
  }));

  describe('directive definition', function() {
    // Verifies that the testDirective compiles successfully and produces
    // a valid DOM element when used as a custom HTML element.
    it('should be defined', function() {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect(element).toBeDefined();
    });

    // Confirms the directive is restricted to element usage only (restrict: 'E'),
    // meaning it can only be used as <test-directive> and not as an attribute.
    it('should restrict to element only', function() {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect(element.find('.test-directive').length).toBe(1);
    });

    // Ensures the directive creates an isolated scope (scope: {}), which prevents
    // accidental data sharing with parent scopes and improves encapsulation.
    it('should have isolated scope', function() {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope).toBeDefined();
    });
  });

  describe('controller', function() {
    // Validates that the directive's controller correctly retrieves and stores
    // the jQuery version from $.fn.jquery for display in the template.
    it('should set version to jQuery version', function() {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBe($.fn.jquery);
    });

    // Verifies that the directive logs an initialization message via the $log
    // service when the controller is instantiated for debugging purposes.
    it('should log info message on initialization', function() {
      spyOn($log, 'info');
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect($log.info).toHaveBeenCalledWith('test-directive initialized...');
    });
  });

  describe('template', function() {
    // Tests that the directive's template correctly renders the jQuery version
    // string by compiling the directive and inspecting the resulting DOM content.
    it('should render the jQuery version', function() {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var content = element.find('.test-directive').text();
      expect(content).toContain('jQuery Version:');
      expect(content).toContain($.fn.jquery);
    });

    // Ensures the directive includes a data-testid attribute for E2E test
    // selectors, enabling reliable element targeting in Playwright tests.
    it('should have data-testid attribute for testing', function() {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var testIdElement = element.find('[data-testid="jquery-version"]');
      expect(testIdElement.length).toBe(1);
    });

    // Confirms the directive uses an external template file via templateUrl
    // rather than an inline template, following separation of concerns.
    it('should use external template URL', inject(function($injector) {
      var $directiveIntrospector = function(name) {
        var directives = $injector.get(name + 'Directive');
        return directives[0];
      };
      var directive = $directiveIntrospector('testDirective');
      expect(directive.templateUrl).toBe('WebApp/Directives/test.directive.html');
    }));
  });
});
