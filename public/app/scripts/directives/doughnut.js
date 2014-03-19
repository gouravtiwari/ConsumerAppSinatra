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
          console.log(scope.val.animate);
          donutTip({
                    selector: selector, 
                    data: scope.val,
                    totalLabel: $("doughnut[chart-id='"+attrs.chartId+"']").attr('totalLabel'),
                    width: parseInt(scope.val.width),
                    height: parseInt(scope.val.height),
                    innerRadius: parseInt(scope.val.innerRadius),
                    outerRadius: parseInt(scope.val.outerRadius),
                    legend: scope.val.legend,
                    tipLabel: scope.val.tipLabel,
                    tipLabelUnit: scope.val.tipLabelUnit,
                    animate: scope.val.animate
                  });
        });
      }
    };
})
