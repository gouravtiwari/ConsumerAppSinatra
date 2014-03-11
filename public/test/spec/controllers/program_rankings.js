'use strict';

describe('Controller: ProgramRankingsCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var ProgramRankingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProgramRankingsCtrl = $controller('ProgramRankingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
