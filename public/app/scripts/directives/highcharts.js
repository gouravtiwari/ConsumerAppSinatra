'use strict';

angular.module('publicApp')
  .directive('highcharts', function () {
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
                    if (newSettings.series!=[]) {
                        chart = new Highcharts.Chart(newSettings);
                    } else {
                        for (var i = 0; i < chart.series.length; i++) {
                            chart.series[i].setData(scope.chartData.series[i].data)
                        }
                    }
                }, true);
            }
        };
  });
