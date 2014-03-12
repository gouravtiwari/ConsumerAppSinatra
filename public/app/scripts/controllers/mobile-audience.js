'use strict';

angular.module('publicApp')
  .controller('MobileAudienceCtrl', function ($scope, Data) {
    // Data.get_local('scripts/jsons/mobile_audience.json').success(function(api_data){
    //   $scope.andriod = {};
    //   $scope.andriod.AppDetails = api_data.AppResponse.AppDetails;
    // });
  	$scope.input.platforms = ['iOS', 'Android'];
  	$scope.input.platform = $scope.input.platforms[0];
  	$scope.input.appCount = 10;

  	$scope.search = function(){
  		var parameter_obj = $scope.input.platform.toLowerCase() + '?' +
                          'numberofresults=' + $scope.input.appCount + '&';
      Data.get_json('EMM/v1/', parameter_obj).success(function(api_data){
        $scope.AppDetails = api_data.AppResponse.AppDetails;
      });
  	}


  });
