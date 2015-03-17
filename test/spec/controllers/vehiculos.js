'use strict';

describe('Controller: VehiculosCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var VehiculosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VehiculosCtrl = $controller('VehiculosCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
