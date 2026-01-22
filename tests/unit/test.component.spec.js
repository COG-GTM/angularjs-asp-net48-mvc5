describe('testComponent', function() {
  var $componentController, $log, scope;

  beforeEach(module('app'));

  beforeEach(inject(function(_$componentController_, _$log_, $rootScope) {
    $componentController = _$componentController_;
    $log = _$log_;
    scope = $rootScope.$new();
  }));

  it('should initialize with AngularJS version', function() {
    var ctrl = $componentController('testComponent', {$log: $log}, {});
    ctrl.$onInit();
    expect(ctrl.version).toBeDefined();
    expect(ctrl.version).toBe(angular.version.full);
  });

  it('should log initialization message', function() {
    spyOn($log, 'info');
    var ctrl = $componentController('testComponent', {$log: $log}, {});
    ctrl.$onInit();
    expect($log.info).toHaveBeenCalledWith('test-component initialized...');
  });

  it('should have correct controllerAs alias', function() {
    var ctrl = $componentController('testComponent', {$log: $log}, {});
    expect(ctrl).toBeDefined();
  });
});
