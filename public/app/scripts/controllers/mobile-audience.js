'use strict';

angular.module('publicApp')
  .controller('MobileAudienceCtrl', function ($scope, Data) {
    
  	$scope.input.platforms = ['iOS', 'Android'];
  	$scope.input.platform = $scope.input.platforms[0];
  	$scope.input.appCount = 10;

  	$scope.search = function(){
  		var platform = $scope.input.platform.toLowerCase(),
  			parameter_obj = {"numberofresults": $scope.input.appCount};

      Data.get_json('EMM/v1/' + platform, parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/mobile_audience_ios.json').success(function(api_data){
        $scope.AppDetails = api_data.AppResponse.AppDetails;
      });
  	}

  	if($scope.viaRecentSearch) {
  		$scope.AppDetails = $scope.cache_response.AppResponse.AppDetails;
  		$scope.viaRecentSearch = false;
  	}

  });
