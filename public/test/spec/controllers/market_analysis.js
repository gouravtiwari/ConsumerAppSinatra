'use strict';

describe('Controller: MarketAnalysisCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var MarketAnalysisCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarketAnalysisCtrl = $controller('MarketAnalysisCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
