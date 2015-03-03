'use strict';

describe('Controller: AlertasCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var AlertasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlertasCtrl = $controller('AlertasCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
