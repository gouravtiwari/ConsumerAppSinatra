'use strict';

describe('Filter: roundoff', function () {

  // load the filter's module
  beforeEach(module('publicApp'));

  // initialize a new instance of the filter before each test
  var roundoff;
  beforeEach(inject(function ($filter) {
    roundoff = $filter('roundoff');
  }));

  it('should return the input prefixed with "roundoff filter:"', function () {
    var text = 'angularjs';
    expect(roundoff(text)).toBe('roundoff filter: ' + text);
  });

});
