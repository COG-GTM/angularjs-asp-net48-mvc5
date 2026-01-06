describe('App Module', function () {
  var module;

  beforeEach(function () {
    module = angular.module('app');
  });

  it('should be defined', function () {
    expect(module).toBeDefined();
  });

  it('should have the correct name', function () {
    expect(module.name).toBe('app');
  });

  it('should have no dependencies', function () {
    expect(module.requires).toEqual([]);
  });

  it('should be retrievable via angular.module', function () {
    var retrievedModule = angular.module('app');
    expect(retrievedModule).toBe(module);
  });

  it('should not throw when accessed', function () {
    expect(function () {
      angular.module('app');
    }).not.toThrow();
  });

  it('should be a valid AngularJS module object', function () {
    expect(typeof module.component).toBe('function');
    expect(typeof module.directive).toBe('function');
    expect(typeof module.controller).toBe('function');
    expect(typeof module.service).toBe('function');
    expect(typeof module.factory).toBe('function');
  });

  it('should allow registering new components', function () {
    expect(function () {
      module.component('dummyComponent', {
        template: '<div></div>',
      });
    }).not.toThrow();
  });

  it('should allow registering new directives', function () {
    expect(function () {
      module.directive('dummyDirective', function () {
        return {
          restrict: 'E',
          template: '<div></div>',
        };
      });
    }).not.toThrow();
  });

  it('should allow registering new services', function () {
    expect(function () {
      module.service('dummyService', function () {
        this.getValue = function () {
          return 'test';
        };
      });
    }).not.toThrow();
  });

  it('should allow registering new factories', function () {
    expect(function () {
      module.factory('dummyFactory', function () {
        return {
          getValue: function () {
            return 'test';
          },
        };
      });
    }).not.toThrow();
  });

  it('should allow registering new controllers', function () {
    expect(function () {
      module.controller('DummyController', function () {
        this.value = 'test';
      });
    }).not.toThrow();
  });
});
