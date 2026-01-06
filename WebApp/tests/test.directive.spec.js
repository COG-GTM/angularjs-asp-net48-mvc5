describe('TestDirective', function () {
  var $compile;
  var $rootScope;
  var $log;
  var $templateCache;

  beforeEach(module('app'));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$log_, _$templateCache_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $log = _$log_;
    $templateCache = _$templateCache_;

    $templateCache.put(
      'WebApp/Directives/test.directive.html',
      '<div data-testid="jquery-version" class="test-directive">jQuery Version: {{ vm.version }}</div>'
    );
  }));

  describe('Directive Definition', function () {
    it('should be defined as a directive', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect(element).toBeDefined();
    });

    it('should restrict to element only', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect(element[0].tagName.toLowerCase()).toBe('test-directive');
    });

    it('should have isolate scope', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope).toBeDefined();
    });

    it('should use controllerAs vm', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm).toBeDefined();
    });

    it('should have templateUrl defined', function () {
      expect($templateCache.get('WebApp/Directives/test.directive.html')).toBeDefined();
    });
  });

  describe('Controller', function () {
    it('should have version property', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBeDefined();
    });

    it('should set version to jQuery version', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBe($().jquery);
    });

    it('should have version as a string', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(typeof isolateScope.vm.version).toBe('string');
    });

    it('should have version in semver format', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toMatch(/^\d+\.\d+\.\d+/);
    });

    it('should log info message on initialization', function () {
      spyOn($log, 'info');
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect($log.info).toHaveBeenCalledWith('test-directive initialized...');
    });
  });

  describe('Template Rendering', function () {
    it('should render template content', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toContain('jQuery Version:');
    });

    it('should display the actual jQuery version', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toContain($().jquery);
    });

    it('should have data-testid attribute', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var versionElement = element.find('[data-testid="jquery-version"]');
      expect(versionElement.length).toBe(1);
    });

    it('should have test-directive class', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var versionElement = element.find('.test-directive');
      expect(versionElement.length).toBe(1);
    });

    it('should contain a div element', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect(element.find('div').length).toBeGreaterThan(0);
    });
  });

  describe('Dependency Injection', function () {
    it('should inject $log service', function () {
      spyOn($log, 'info');
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect($log.info).toHaveBeenCalled();
    });

    it('should have $inject property defined on TestDirective', function () {
      expect(TestDirective.$inject).toBeDefined();
      expect(TestDirective.$inject).toContain('$log');
    });

    it('should work with mocked $log', function () {
      var mockLog = { info: jasmine.createSpy('info') };
      module(function ($provide) {
        $provide.value('$log', mockLog);
      });
      inject(function (_$compile_, _$rootScope_) {
        var element = _$compile_('<test-directive></test-directive>')(_$rootScope_);
        _$rootScope_.$digest();
        expect(mockLog.info).toHaveBeenCalledWith('test-directive initialized...');
      });
    });
  });

  describe('Scope Isolation', function () {
    it('should not inherit from parent scope', function () {
      $rootScope.parentValue = 'parent';
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.parentValue).toBeUndefined();
    });

    it('should have its own scope', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.$id).not.toBe($rootScope.$id);
    });

    it('should not affect parent scope', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      isolateScope.vm.testValue = 'test';
      expect($rootScope.testValue).toBeUndefined();
    });
  });

  describe('Multiple Instances', function () {
    it('should support multiple instances', function () {
      var element1 = $compile('<test-directive></test-directive>')($rootScope);
      var element2 = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect(element1.isolateScope().$id).not.toBe(element2.isolateScope().$id);
    });

    it('should have independent scopes', function () {
      var element1 = $compile('<test-directive></test-directive>')($rootScope);
      var element2 = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      element1.isolateScope().vm.customValue = 'custom1';
      element2.isolateScope().vm.customValue = 'custom2';
      expect(element1.isolateScope().vm.customValue).toBe('custom1');
      expect(element2.isolateScope().vm.customValue).toBe('custom2');
    });

    it('should both display the same jQuery version', function () {
      var element1 = $compile('<test-directive></test-directive>')($rootScope);
      var element2 = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect(element1.isolateScope().vm.version).toBe(element2.isolateScope().vm.version);
    });
  });

  describe('jQuery Integration', function () {
    it('should correctly access jQuery version', function () {
      expect($().jquery).toBeDefined();
    });

    it('should match the global jQuery version', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm.version).toBe(jQuery.fn.jquery);
    });

    it('should work with jQuery methods', function () {
      var element = $compile('<test-directive></test-directive>')($rootScope);
      $rootScope.$digest();
      expect(element.find).toBeDefined();
      expect(typeof element.find).toBe('function');
    });
  });
});
