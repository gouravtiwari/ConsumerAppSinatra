'use strict';

angular.module('publicApp')
.directive('doughnut', function () {
  return {
    restrict: 'E',
    scope: {
        chartData: "=chartId",
        val: '=',
        grouped: '='
    },
    transclude:true,
    replace: true,

    link: function (scope, element, attrs) {
      var selector = element[0];
      console.log("selector:"+ selector);
        //Update when charts data changes
        scope.$watch('val', function () {
          // clear the elements inside of the directive
          $("doughnut").html('');

          // if 'val' is undefined, exit
          if (!scope.val) {
            return;
          }
          donutTip({
                    selector: selector, 
                    data: scope.val,
                    totalLabel: "Recommendation Score",
                    width: 650,
                    height: 500,
                    innerRadius: 150,
                    outerRadius: 210,
                    legend: false
                  });
        });
      }
    };
})
