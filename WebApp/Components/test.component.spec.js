describe('TestComponent', function() {
  var $componentController, $log;

  beforeEach(module('app'));
  
  beforeEach(inject(function(_$componentController_, _$log_) {
    $componentController = _$componentController_;
    $log = _$log_;
  }));

  it('should set version from angular.version.full', function() {
    var ctrl = $componentController('testComponent', { $log: $log });
    expect(ctrl.version).toBe(angular.version.full);
  });

  it('should log initialization message', function() {
    spyOn($log, 'info');
    var ctrl = $componentController('testComponent', { $log: $log });
    ctrl.$onInit();
    expect($log.info).toHaveBeenCalledWith('test-component initialized...');
  });
});
