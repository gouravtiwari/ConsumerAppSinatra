'use strict';

describe('Directive: stringfilter', function () {

  // load the directive's module
  beforeEach(module('publicApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stringfilter></stringfilter>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stringfilter directive');
  }));
});
