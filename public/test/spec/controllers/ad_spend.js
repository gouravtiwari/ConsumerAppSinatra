'use strict';

describe('Controller: AdSpendCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var AdSpendCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdSpendCtrl = $controller('AdSpendCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
