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

    it('should be defined', function() {
      expect(ctrl).toBeDefined();
    });

    it('should have version property set to angular.version.full', function() {
      expect(ctrl.version).toBe(angular.version.full);
    });

    it('should have $onInit method defined', function() {
      expect(ctrl.$onInit).toBeDefined();
      expect(typeof ctrl.$onInit).toBe('function');
    });

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

    it('should render the angularjs version in the template', function() {
      var element = $compile('<test-component></test-component>')($rootScope);
      $rootScope.$digest();
      var content = element.find('.test-component').text();
      expect(content).toContain('AngularJS Version:');
      expect(content).toContain(angular.version.full);
    });

    it('should have data-testid attribute for testing', function() {
      var element = $compile('<test-component></test-component>')($rootScope);
      $rootScope.$digest();
      var testIdElement = element.find('[data-testid="angularjs-version"]');
      expect(testIdElement.length).toBe(1);
    });
  });
});
