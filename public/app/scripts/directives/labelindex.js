'use strict';

angular.module('publicApp')
  .directive('labelindex', function () {
    return {
      template: '<div class="labelIndex {{colorClass}}">{{result}}</div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
      	if(attrs.reverse == 'true'){
      		scope.result = parseFloat((parseFloat(attrs.ios) - parseFloat(attrs.android))/parseFloat(attrs.android)*100).toFixed(2);		
      	}
      	else{
      		scope.result = parseFloat((parseFloat(attrs.android) - parseFloat(attrs.ios))/parseFloat(attrs.android)*100).toFixed(2);
      	}
        if (scope.result > 0) {
        	scope.colorClass = 'green';
        }
        else{
        	scope.colorClass = 'red';
        }
        console.log(scope.result);
      }
    };
  });
