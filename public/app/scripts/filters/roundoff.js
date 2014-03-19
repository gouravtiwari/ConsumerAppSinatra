'use strict';

angular.module('publicApp')
  .filter('roundoff', function () {
    return function (input) {
      return parseFloat(input).toFixed(2);
    };
  })

  .filter('unitCon', function () {
    return function (input) {
      var data = parseFloat(input);
      if(data < 1000){
      	data = data;
      }
      else if(data>= 1000 && data < 1000000){
      	data = parseFloat(data/1000).toFixed(2) + 'K';
      }
      else if(data>=1000000 && data<10000000000){
      	data = parseFloat(data/10000000).toFixed(2) + 'M';
      }
      else{
      	data = parseFloat(data/10000000000).toFixed(2) + 'B';
      }
      return data;
    };
  });
