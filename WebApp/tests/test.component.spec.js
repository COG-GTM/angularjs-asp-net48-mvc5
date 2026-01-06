describe('TestComponent', function () {
  var $componentController;
  var $log;
  var $rootScope;
  var $compile;

  beforeEach(module('app'));

  beforeEach(inject(function (_$componentController_, _$log_, _$rootScope_, _$compile_) {
    $componentController = _$componentController_;
    $log = _$log_;
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('Controller', function () {
    var ctrl;

    beforeEach(function () {
      ctrl = $componentController('testComponent', { $log: $log });
    });

    it('should be defined', function () {
      expect(ctrl).toBeDefined();
    });

    it('should have version property', function () {
      expect(ctrl.version).toBeDefined();
    });

    it('should set version to angular.version.full', function () {
      expect(ctrl.version).toBe(angular.version.full);
    });

    it('should have $onInit method', function () {
      expect(typeof ctrl.$onInit).toBe('function');
    });

    it('should log info message on $onInit', function () {
      spyOn($log, 'info');
      ctrl.$onInit();
      expect($log.info).toHaveBeenCalledWith('test-component initialized...');
    });

    it('should call $onInit only once per initialization', function () {
      spyOn($log, 'info');
      ctrl.$onInit();
      ctrl.$onInit();
      expect($log.info).toHaveBeenCalledTimes(2);
    });

    it('should have version as a string', function () {
      expect(typeof ctrl.version).toBe('string');
    });

    it('should have version in semver format', function () {
      expect(ctrl.version).toMatch(/^\d+\.\d+\.\d+/);
    });
  });

  describe('Component Definition', function () {
    it('should be registered as a component', function () {
      expect(function () {
        $componentController('testComponent', { $log: $log });
      }).not.toThrow();
    });

    it('should use controllerAs vm', function () {
      var element = $compile('<test-component></test-component>')($rootScope);
      $rootScope.$digest();
      var isolateScope = element.isolateScope();
      expect(isolateScope.vm).toBeDefined();
    });

    it('should render template with version', function () {
      var element = $compile('<test-component></test-component>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toContain('AngularJS Version:');
    });

    it('should have data-testid attribute in template', function () {
      var element = $compile('<test-component></test-component>')($rootScope);
      $rootScope.$digest();
      var versionElement = element.find('[data-testid="angularjs-version"]');
      expect(versionElement.length).toBe(1);
    });

    it('should have test-component class in template', function () {
      var element = $compile('<test-component></test-component>')($rootScope);
      $rootScope.$digest();
      var versionElement = element.find('.test-component');
      expect(versionElement.length).toBe(1);
    });

    it('should display the actual AngularJS version', function () {
      var element = $compile('<test-component></test-component>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toContain(angular.version.full);
    });
  });

  describe('Dependency Injection', function () {
    it('should inject $log service', function () {
      var mockLog = { info: jasmine.createSpy('info') };
      var ctrl = $componentController('testComponent', { $log: mockLog });
      ctrl.$onInit();
      expect(mockLog.info).toHaveBeenCalled();
    });

    it('should work with real $log service', function () {
      spyOn($log, 'info');
      var ctrl = $componentController('testComponent', { $log: $log });
      ctrl.$onInit();
      expect($log.info).toHaveBeenCalled();
    });

    it('should have $inject property defined', function () {
      expect(TestComponent.$inject).toBeDefined();
      expect(TestComponent.$inject).toContain('$log');
    });
  });

  describe('Lifecycle Hooks', function () {
    var ctrl;

    beforeEach(function () {
      ctrl = $componentController('testComponent', { $log: $log });
    });

    it('should initialize version before $onInit', function () {
      expect(ctrl.version).toBeDefined();
    });

    it('should not modify version in $onInit', function () {
      var versionBefore = ctrl.version;
      ctrl.$onInit();
      expect(ctrl.version).toBe(versionBefore);
    });

    it('should be callable multiple times without error', function () {
      expect(function () {
        ctrl.$onInit();
        ctrl.$onInit();
        ctrl.$onInit();
      }).not.toThrow();
    });
  });

  describe('Template Rendering', function () {
    it('should render as a custom element', function () {
      var element = $compile('<test-component></test-component>')($rootScope);
      $rootScope.$digest();
      expect(element[0].tagName.toLowerCase()).toBe('test-component');
    });

    it('should contain a div element', function () {
      var element = $compile('<test-component></test-component>')($rootScope);
      $rootScope.$digest();
      expect(element.find('div').length).toBeGreaterThan(0);
    });

    it('should bind version to template', function () {
      var element = $compile('<test-component></test-component>')($rootScope);
      $rootScope.$digest();
      var text = element.text();
      expect(text).toContain(angular.version.full);
    });
  });
});
