'use strict';

angular.module('publicApp')
  .directive('stringfilter', function () {
    return {
      template: '<div>{{dataval}}</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.dataval = attrs.dataval
        if(attrs.filter){
        	scope.dataval = attrs.dataval.split(attrs.filter)[1]
        }
        if(attrs.filtertype == 'onlystring'){
        	scope.dataval = scope.dataval.split('_').join(' ');
        }
        else{
        	scope.dataval = scope.dataval.replace('_', ' - ');
        }
      }
    };
  });
