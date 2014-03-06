'use strict';

describe('Service: Data', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var Data;
  beforeEach(inject(function (_Data_) {
    Data = _Data_;
  }));

  it('should do something', function () {
    expect(!!Data).toBe(true);
  });

});
