describe('app module', function() {
  var module;

  beforeEach(function() {
    module = angular.module('app');
  });

  it('should be registered', function() {
    expect(module).toBeDefined();
  });

  it('should have no dependencies', function() {
    expect(module.requires).toEqual([]);
  });
});
