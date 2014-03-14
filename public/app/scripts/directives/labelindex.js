'use strict';

angular.module('publicApp')
  .directive('labelindex', function () {
    return {
      template: '<div class="labelIndex {{colorClass}}">{{result}}</div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
      	console.log(Number(attrs.ios))
      	if(attrs.reverse == 'true'){
      		scope.result = parseFloat((attrs.ios - attrs.android)/attrs.android*100).toFixed(2);		
      	}
      	else{
      		scope.result = parseFloat((attrs.android - attrs.ios)/attrs.android*100).toFixed(2);
      	}
        if (scope.result > 0) {
        	scope.colorClass = 'green';
        }
        else{
        	scope.colorClass = 'red';
        }
      }
    };
  });
