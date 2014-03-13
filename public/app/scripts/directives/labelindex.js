'use strict';

angular.module('publicApp')
  .directive('labelindex', function () {
    return {
      template: '<div class="labelIndex {{colorClass}}">{{result}}</div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        console.log(attrs.android)
        console.log('hey dude what up')
        scope.result = parseFloat((parseFloat(attrs.android) - parseFloat(attrs.ios))/parseFloat(attrs.android)*100).toFixed(2);
        if (scope.result > 0) {
        	scope.colorClass = 'green';
        }
        else{
        	scope.colorClass = 'red';
        }
      }
    };
  });
