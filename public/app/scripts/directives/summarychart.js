'use strict';

angular.module('publicApp')
  .directive('summarychart', function () {
    return {
    restrict: 'E',
    template: '<div class="hc-bars"></div>',
    scope: {
        chartData: "=chartId"
    },
    transclude:true,
    replace: true,

    link: function (scope, element, attrs) {
      var chartsDefaults = {
        chart: {
          renderTo: element[0],
          type: attrs.type || null,
          height: attrs.height,
          width: attrs.width
        },
        colors: [attrs.color]
      };
      var chart;
        //Update when charts data changes
        scope.$watch(function() { return scope.chartData; }, function(value) {
          if(!value) return;
            var deepCopy = true;
            var newSettings = {};
            $.extend(deepCopy, newSettings, chartsDefaults, scope.chartData);
            if (!chart || scope.chartData.series.length != chart.series.length || scope.chartData.series[0].data.length != chart.series[0].data.length) {
              chart = new Highcharts.Chart(newSettings);
            } else {
              for (var i = 0; i < chart.series.length; i++) {
                // chart.series[i].setData(scope.chartData.series[i].data);
                var new_data = scope.chartData.series[i].data;
                for (var j=0;j<new_data.length;j++){
                  chart.series[i].data[j].update(new_data[j]);
                }                
              }
            }
        }, true);
      }
    };
  });
