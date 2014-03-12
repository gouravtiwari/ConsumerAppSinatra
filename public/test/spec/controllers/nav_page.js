'use strict';

describe('Controller: NavPageCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var NavPageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavPageCtrl = $controller('NavPageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
