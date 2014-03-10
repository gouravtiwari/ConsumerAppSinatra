'use strict';

describe('Controller: MobileAudienceCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var MobileAudienceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MobileAudienceCtrl = $controller('MobileAudienceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
