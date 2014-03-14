'use strict';

describe('Controller: RecommenderCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var RecommenderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecommenderCtrl = $controller('RecommenderCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
