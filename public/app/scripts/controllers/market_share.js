'use strict';

angular.module('publicApp')
  .controller('MarketShareCtrl', function ($scope, Data, PieChartOptions) {
    $scope.search = function () {
      $scope.periods = [];
      for (var i = 0; i<$scope.periodData.length; i++) {
        if ( $scope.period == $scope.periodData[i].Period) {
          $scope.periods = $scope.periodData;
        };
      };
    };
    
    $scope.categories = ['TotalSalesDollar', 'TotalUnitsSold', 'DollarSharePercentage']
    $scope.input.category = $scope.categories[0]
    Data.get_local('scripts/jsons/market_share_by_manufacturer.json').success(function(api_data){
      $scope.periodData = api_data.root.PeriodData;
      $scope.periods = $scope.periodData;
      $scope.series_data = api_data.root.PeriodData[0].Market[0].Category[0].Manufacturer;
      plot_graph($scope.series_data);
    });

    //Pie Chart for top 10
    var get_series_data = function(api_data, chosen_attr){
      var colorsArray = ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#AFA263', '#6AF9C4', '#25ADA7','#A1D87F','#FF453C','#EFC94C','#AF709A','#FFD530', '#0E229B', 'orange'];
      var series_data = []
      var total_this_stat = $.map(api_data, function(x){return +x}).reduce(function(previousValue, currentValue){ return previousValue + currentValue;})
      console.log(total_this_stat);
      var i = 0;
      for(var each_stat in api_data){
        var s = api_data[each_stat];
        console.log(s[chosen_attr]);
        series_data.push({
          name : s.ManufacturerName,
          percent_y :+(+(s[chosen_attr])/total_this_stat*100).toFixed(1),
          y : +(s[chosen_attr]),
          color : colorsArray[i++]
        });
      }
      console.log(series_data);
      return series_data;
    }

    var plot_graph = function(data){
      console.log(data)
      var chosen_attr = $scope.input.category;
      var api_data = data;

      var series_data = get_series_data(api_data,chosen_attr);
      var chart_data = angular.copy(PieChartOptions.simplePie);
      chart_data.series = [{name:'Data', type: 'pie', data:series_data}];
      console.log(chart_data.series);
      chart_data.plotOptions.pie.center = ['50%', '50%'];
      chart_data.chart.marginTop = chart_data.chart.marginBottom = 50;
      console.log(chart_data)
      $scope['chosenStat'] = chart_data;
    }

    $scope.$watch('input.category', function() {
      plot_graph($scope.series_data);
    });
  });
