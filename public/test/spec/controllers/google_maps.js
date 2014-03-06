'use strict';

describe('Controller: GoogleMapsCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var GoogleMapsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GoogleMapsCtrl = $controller('GoogleMapsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
