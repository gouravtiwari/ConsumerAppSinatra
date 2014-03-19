'use strict';

angular.module('publicApp')
  .filter('roundoff', function () {
    return function (input) {
      return parseFloat(input).toFixed(2);
    };
  })

  .filter('agefilter', function () {
    return function (input) {
      var finaldata = input.split('Age')[1]
      finaldata = finaldata.split('_').join('-');
      finaldata = 'Age ' + finaldata;
      return finaldata;
    };
  })

  .filter('incomefilter', function () {
    return function (input) {
      var finaldata = input.split('Income')[1]
      finaldata = finaldata.split('_').join('-');
      finaldata = 'Income ' + finaldata;
      return finaldata;
    };
  })  

  .filter('racefilter', function () {
    return function (input) {
      var finaldata = finaldata.split('_').join(' ');
      return finaldata;
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
