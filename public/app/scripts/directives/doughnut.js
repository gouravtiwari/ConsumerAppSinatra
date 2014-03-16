'use strict';

angular.module('publicApp')
.directive('doughnut', function () {
  // var margin = 20,
  //   width = 960,
  //   height = 500 - .5 - margin,
  //   color = d3.interpolateRgb("#f77", "#77f");
  return {
    restrict: 'E',
    // template: '<div class="donut"></div>',
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
        // .append("svg")
        //   .attr("width", width)
        //   .attr("height", height + margin + 100);
        // //Update when charts data changes
          scope.$watch('val', function () {
            // console.log(newVal);
            // console.log(oldVal);
            // clear the elements inside of the directive
            // selector.selectAll('*').remove();

            // if 'val' is undefined, exit
            if (!scope.val) {
              return;
            }
            console.log('val: '+ scope.val);
            donutTip({selector: selector, data: scope.val});
          });
      }
    };
})
