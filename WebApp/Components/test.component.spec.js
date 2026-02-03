describe('TestComponent', function() {
  var $componentController, $log;

  beforeEach(module('app'));
  
  beforeEach(inject(function(_$componentController_, _$log_) {
    $componentController = _$componentController_;
    $log = _$log_;
  }));

  it('should log initialization message', function() {
    spyOn($log, 'info');
    var ctrl = $componentController('testComponent', { $log: $log });
    ctrl.$onInit();
    expect($log.info).toHaveBeenCalledWith('test-component initialized...');
  });
});
