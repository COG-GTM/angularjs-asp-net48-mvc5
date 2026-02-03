describe('testComponent', function() {
  var $componentController;

  beforeEach(angular.mock.module('app'));

  beforeEach(angular.mock.inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  it('should be registered with the app module', function() {
    var ctrl = $componentController('testComponent');
    expect(ctrl).toBeDefined();
  });

  it('should have a controller that is a function', function() {
    var ctrl = $componentController('testComponent');
    expect(typeof ctrl.constructor).toBe('function');
  });

  it('should be registered with the correct name', function() {
    var ctrl = $componentController('testComponent');
    expect(ctrl).not.toBeNull();
  });
});
