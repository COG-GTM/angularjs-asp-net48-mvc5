describe("testComponent", function () {
  var $componentController;
  var $log;
  var ctrl;

  beforeEach(module("app"));

  beforeEach(inject(function (_$componentController_, _$log_) {
    $componentController = _$componentController_;
    $log = _$log_;
  }));

  describe("controller", function () {
    beforeEach(function () {
      ctrl = $componentController("testComponent", null, {});
    });

    it("should be defined", function () {
      expect(ctrl).toBeDefined();
    });

    it("should have version property set to angular version", function () {
      expect(ctrl.version).toBeDefined();
      expect(ctrl.version).toBe(angular.version.full);
    });

    it("should have $onInit method defined", function () {
      expect(ctrl.$onInit).toBeDefined();
      expect(typeof ctrl.$onInit).toBe("function");
    });

    it("should log info message on $onInit", function () {
      spyOn($log, "info");
      ctrl.$onInit();
      expect($log.info).toHaveBeenCalledWith("test-component initialized...");
    });

    it("should have correct controllerAs alias", function () {
      var component = angular.module("app")._invokeQueue.find(function (item) {
        return item[1] === "component" && item[2][0] === "testComponent";
      });
      expect(component).toBeDefined();
      expect(component[2][1].controllerAs).toBe("vm");
    });

    it("should have empty bindings", function () {
      var component = angular.module("app")._invokeQueue.find(function (item) {
        return item[1] === "component" && item[2][0] === "testComponent";
      });
      expect(component).toBeDefined();
      expect(component[2][1].bindings).toEqual({});
    });

    it("should have template with data-testid attribute", function () {
      var component = angular.module("app")._invokeQueue.find(function (item) {
        return item[1] === "component" && item[2][0] === "testComponent";
      });
      expect(component).toBeDefined();
      expect(component[2][1].template).toContain(
        'data-testid="angularjs-version"'
      );
    });

    it("should have template with test-component class", function () {
      var component = angular.module("app")._invokeQueue.find(function (item) {
        return item[1] === "component" && item[2][0] === "testComponent";
      });
      expect(component).toBeDefined();
      expect(component[2][1].template).toContain('class="test-component"');
    });

    it("should display AngularJS Version text in template", function () {
      var component = angular.module("app")._invokeQueue.find(function (item) {
        return item[1] === "component" && item[2][0] === "testComponent";
      });
      expect(component).toBeDefined();
      expect(component[2][1].template).toContain("AngularJS Version:");
    });

    it("should bind version to template", function () {
      var component = angular.module("app")._invokeQueue.find(function (item) {
        return item[1] === "component" && item[2][0] === "testComponent";
      });
      expect(component).toBeDefined();
      expect(component[2][1].template).toContain("{{vm.version}}");
    });
  });

  describe("dependency injection", function () {
    it("should inject $log service", function () {
      var component = angular.module("app")._invokeQueue.find(function (item) {
        return item[1] === "component" && item[2][0] === "testComponent";
      });
      expect(component).toBeDefined();
      var controller = component[2][1].controller;
      expect(controller.$inject).toContain("$log");
    });
  });
});
