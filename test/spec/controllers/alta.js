'use strict';

describe('Controller: AltaCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var AltaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AltaCtrl = $controller('AltaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
