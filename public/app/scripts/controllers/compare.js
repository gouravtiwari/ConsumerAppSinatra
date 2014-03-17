'use strict';

angular.module('publicApp')
  .controller('CompareCtrl', function ($scope, Data, StackChartOptions, PieChartOptions) {
    
  	var parameter_obj = {'numberofresults' : '5000',
  											 'sort' : 'desc'}
    
    $scope.sorted_data = {};
    $scope.appnames = [];  
    $scope.maindata = {};
    $scope.radioModel = 'UniqueAudience';										 
    //Data.get_json('EMM/v1/ios/', parameter_obj).success(function(api_data){
    Data.get_local('scripts/jsons/ios_apps.json').success(function(api_data){
    	$scope.ios = api_data.AppResponse.AppDetails;
    	//Data.get_json('EMM/v1/android/', parameter_obj).success(function(api_data){
    	Data.get_local('scripts/jsons/android_apps.json').success(function(api_data){
    		$scope.android = api_data.AppResponse.AppDetails;
    		for(var i=0; i<$scope.ios.length; i++){
    			for(var j=0; j<$scope.android.length; j++){
    				if($scope.ios[i].AppName == $scope.android[j].AppName){
    					$scope.sorted_data[$scope.ios[i].AppName] = {android: $scope.ios[i], ios: $scope.android[j]};
    					$scope.appnames.push($scope.ios[i].AppName);
    				}
    			}
    		}
    		$scope.input.appname = $scope.appnames[0]
    		$scope.maindata = $scope.sorted_data[$scope.input.appname];
            $scope.chart_data = draw_age_chart('AgeBreakPercentage');   
            $scope.income_data = draw_age_chart('IncomePercentage_in_Dollar');
            $scope.race_data = draw_age_chart('RacePercentage');
            //plot_graph();
        });
    });

    $scope.$watch('input.appname', function() {
      $scope.maindata = $scope.sorted_data[$scope.input.appname];
    });

    $scope.get_diff = function(a, b){
        return parseFloat((a-b)/a*100).toFixed(2);
    }

    var draw_age_chart = function(field){
        var chart_data = $.extend(true, {}, StackChartOptions.stackChart);
        /* Set Chart data for age group */
        var seriesVal = [];
        for(var platform in $scope.maindata){

            var seriesData = {name: '', data: [], color: ''};
            seriesData.name = platform;
            for(var ageData in $scope.maindata[platform][field]){
    
                seriesData['data'].push(parseFloat($scope.maindata[platform][field][ageData]))
            }
            seriesVal.push(seriesData)
        }
        seriesVal[0].color = '#41a4c9';
        seriesVal[1].color = '#fdde7f';
        chart_data.series.push(seriesVal[0]);
        chart_data.series.push(seriesVal[1]);
        return chart_data    
    }

    //Pie Chart for top 10
    var get_series_data = function(api_data, chosen_attr){
      var colorsArray = ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#AFA263', '#6AF9C4', '#25ADA7','#A1D87F','#FF453C','#EFC94C','#AF709A','#FFD530', '#0E229B', 'orange'];
      var series_data = []
      var total_this_stat = $.map(api_data, function(x){return +x.UniqueAudience}).reduce(function(previousValue, currentValue){ return previousValue + currentValue;})
      var platforms = ['Android','data', 'IOS'];
      var i = 0;
      for(var each_stat in api_data){
        var s = api_data[each_stat];
        series_data.push({
          name : platforms[i++],
          percent_y :+(+(s[chosen_attr])/total_this_stat*100).toFixed(1),
          y : +(s[chosen_attr]),
          color : colorsArray[i++]
        });
      }
      return series_data;
    }

    var plot_graph = function(){
      var api_data = [];
      for(var platform in $scope.maindata){
        api_data.push($scope.maindata[platform])
      }
      var chosen_attr = $scope.radioModel;
      var series_data = get_series_data(api_data,chosen_attr);
      var chart_data = angular.copy(PieChartOptions.simplePie);
      chart_data.series = [{name:'Data', type: 'pie', data:series_data}];
      chart_data.plotOptions.pie.center = ['50%', '50%'];
      chart_data.chart.marginTop = chart_data.chart.marginBottom = 50;
      $scope['chosenStat'] = chart_data;
    }

    $scope.$watch('radioModel', function() {
      console.log($scope.radioModel)
      //plot_graph();
    });
  });
