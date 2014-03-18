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
        //Update when charts data changes
        scope.$watch('val', function () {
          // clear the elements inside of the directive
          $("doughnut[chart-id='"+attrs.chartId+"']").html('');

          // if 'val' is undefined, exit
          if (!scope.val) {
            return;
          }
          donutTip({
                    selector: selector, 
                    data: scope.val,
                    totalLabel: $("doughnut[chart-id='"+attrs.chartId+"']").attr('totalLabel'),
                    width: 500,
                    height: 500,
                    innerRadius: 90,
                    outerRadius: 180,
                    legend: true,
                    tipLabel: 'Score' 
                  });
        });
      }
    };
})
