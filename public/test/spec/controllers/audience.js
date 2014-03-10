'use strict';

describe('Controller: AudienceCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var AudienceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AudienceCtrl = $controller('AudienceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
