'use strict';

angular.module('publicApp')
  .controller('CompareCtrl', function ($scope, Data, StackChartOptions) {
    
  	var parameter_obj = {'numberofresults' : '5000',
  											 'sort' : 'desc'}
    
    $scope.sorted_data = {};
    $scope.appnames = [];  
    $scope.maindata = {};											 
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
            //$scope.income_data = draw_age_chart('IncomePercentage_in_Dollar');
            //$scope.race_data = draw_age_chart('RacePercentage');
            console.log($scope.income_data)
        });
    });

    $scope.$watch('input.appname', function() {
      $scope.maindata = $scope.sorted_data[$scope.input.appname];
    });

    $scope.get_diff = function(a, b){
        console.log('hey')
        return parseFloat((a-b)/a*100).toFixed(2);
    }

    var draw_age_chart = function(field){
        var chart_data = $.extend(true, {}, StackChartOptions.stackChart);
        console.log($scope.maindata)
        /* Set Chart data for age group */
        var seriesVal = [];
        for(var platform in $scope.maindata){
            console.log(platform)
            var seriesData = {name: '', data: [], color: ''};
            seriesData.name = platform;
            for(var ageData in $scope.maindata[platform][field]){
                seriesData['data'].push(parseFloat($scope.maindata[platform][field][ageData]))
                seriesVal.push(seriesData)
            }
        }
        seriesVal[0].color = '#41a4c9';
        seriesVal[5].color = '#fdde7f';
        chart_data.series.push(seriesVal[0]);
        chart_data.series.push(seriesVal[5]);
        return chart_data    
    }
  });
