angular.module('app').directive('testDirective', TestDirective);

TestDirective.$inject = ['$log'];

function TestDirective($log) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '/js/Directives/test.directive.html',
    controllerAs: 'vm',
    controller: function () {
      var vm = this;
      vm.version = $().jquery;
      $log.info('test-directive initialized...');
    },
  };
}
