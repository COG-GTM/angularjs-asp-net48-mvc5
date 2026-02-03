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
    it('should be defined', function() {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect(element).toBeDefined();
    });

    it('should restrict to element only', function() {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect(element.find('.test-directive').length).toBe(1);
    });

    it('should have isolated scope', function() {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope).toBeDefined();
    });
  });

  describe('controller', function() {
    it('should set version to jQuery version', function() {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBe($.fn.jquery);
    });

    it('should log info message on initialization', function() {
      spyOn($log, 'info');
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect($log.info).toHaveBeenCalledWith('test-directive initialized...');
    });
  });

  describe('template', function() {
    it('should render the jQuery version', function() {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var content = element.find('.test-directive').text();
      expect(content).toContain('jQuery Version:');
      expect(content).toContain($.fn.jquery);
    });

    it('should have data-testid attribute for testing', function() {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var testIdElement = element.find('[data-testid="jquery-version"]');
      expect(testIdElement.length).toBe(1);
    });

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
