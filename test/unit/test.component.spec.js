describe('testComponent', function() {
  var $componentController;
  var $log;

  beforeEach(module('app'));

  beforeEach(inject(function(_$componentController_, _$log_) {
    $componentController = _$componentController_;
    $log = _$log_;
  }));

  describe('controller', function() {
    var ctrl;

    beforeEach(function() {
      ctrl = $componentController('testComponent', { $log: $log });
    });

    // Ensures the TestComponent controller is properly instantiated
    // when the component is created via dependency injection.
    it('should be defined', function() {
      expect(ctrl).toBeDefined();
    });

    // Validates that the controller exposes the current AngularJS version
    // by reading from angular.version.full, which is displayed in the UI.
    it('should have version property set to angular.version.full', function() {
      expect(ctrl.version).toBe(angular.version.full);
    });

    // Confirms the $onInit lifecycle hook is defined as a function,
    // which AngularJS calls after the component's bindings are initialized.
    it('should have $onInit method defined', function() {
      expect(ctrl.$onInit).toBeDefined();
      expect(typeof ctrl.$onInit).toBe('function');
    });

    // Verifies that the $onInit lifecycle hook logs an initialization message
    // using the $log service for debugging and monitoring purposes.
    it('should log info message on $onInit', function() {
      spyOn($log, 'info');
      ctrl.$onInit();
      expect($log.info).toHaveBeenCalledWith('test-component initialized...');
    });
  });

  describe('component definition', function() {
    var $compile;
    var $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    // Tests that the component's inline template correctly renders the AngularJS
    // version string by compiling the component and checking the DOM output.
    it('should render the angularjs version in the template', function() {
      var element = $compile('<test-component></test-component>')($rootScope);
      $rootScope.$digest();
      var content = element.find('.test-component').text();
      expect(content).toContain('AngularJS Version:');
      expect(content).toContain(angular.version.full);
    });

    // Ensures the component includes a data-testid attribute for E2E test
    // selectors, enabling reliable element targeting in Playwright tests.
    it('should have data-testid attribute for testing', function() {
      var element = $compile('<test-component></test-component>')($rootScope);
      $rootScope.$digest();
      var testIdElement = element.find('[data-testid="angularjs-version"]');
      expect(testIdElement.length).toBe(1);
    });
  });
});
