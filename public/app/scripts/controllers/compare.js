'use strict';

angular.module('publicApp')
  .controller('CompareCtrl', function ($scope, Data) {
    
  	var parameter_obj = {'numberofresults' : '100',
  											 'sort' : 'desc'}
    
    $scope.sorted_data = [];
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
    					var obj = {};
    					obj[$scope.ios[i].AppName] = {android: $scope.ios[i], ios: $scope.android[j]};
    					$scope.appnames.push($scope.ios[i].AppName);
    					$scope.sorted_data.push(obj)
    				}
    			}
    		}
    		$scope.input.appname = $scope.appnames[0]
    		$scope.maindata = $scope.sorted_data[0][$scope.input.appname];
    		console.log($scope.maindata)
    	});
    });

  });
