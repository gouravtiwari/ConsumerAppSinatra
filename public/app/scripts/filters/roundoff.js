'use strict';

angular.module('publicApp')
  .filter('roundoff', function () {
    return function (input) {
      return parseFloat(input).toFixed(2);
    };
  });
