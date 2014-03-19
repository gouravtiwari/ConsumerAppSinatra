'use strict';

angular.module('publicApp')
  .controller('MobileAudienceCtrl', function ($scope, Data) {
    
  	$scope.input.platforms = ['ios', 'android'];
    $scope.sortByFields = [];

  	$scope.search = function(){
  		var platform = $scope.input.platform.toLowerCase(),
  			parameter_obj = {"numberofresults": $scope.input.noofresults};

      //Data.get_json('EMM/v1/' + platform, parameter_obj).success(function(api_data){
      Data.get_local('scripts/jsons/mobile_audience_ios.json').success(function(api_data){
        $scope.AppDetails = api_data.AppResponse.AppDetails;
        $scope.sortByFields = Data.fillSortByFields($scope.AppDetails[0]);
        Data.injectColorClass($scope.AppDetails, $scope.sortByFields);
      });
  	}

  	if($scope.viaRecentSearch) {
      if($scope.cache_response.AppResponse){
  		  $scope.AppDetails = $scope.cache_response.AppResponse.AppDetails;
        $scope.sortByFields = Data.fillSortByFields($scope.AppDetails[0]);
        Data.injectColorClass($scope.AppDetails, $scope.sortByFields);
      }
  		$scope.viaRecentSearch = false;
  	}

  	$scope.$watch('cache_response', function(newValue, oldValue){
  		if(newValue == oldValue) { return; }
  		if($scope.cache_response.AppResponse) {
  			$scope.AppDetails = $scope.cache_response.AppResponse.AppDetails;
  		}
  	});

    $scope.$watch('sortBy', function(newvalue, oldvalue){
      console.log(newvalue)
      if(!newvalue || newvalue == oldvalue) return;
      $scope.AppDetails = Data.sortBy(newvalue, $scope.AppDetails);
    });

  });
