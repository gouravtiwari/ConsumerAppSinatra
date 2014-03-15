'use strict';

angular.module('publicApp')
  .controller('AudienceCtrl', function ($scope, Data) {
    
    // Data.get_local('scripts/jsons/audience.json').success(function(api_data){
    // 	$scope.netUsageData = api_data.NetUsage[0].WebsiteCategory[0].WebSiteInfo;
    // });

    $scope.search = function(){
      var parameter_obj = {"numberofresults": $scope.input.numberofresults};
      if($scope.input.websitecategory){
        parameter_obj.websitecategory = $scope.input.websitecategory;
      }

      Data.get_json('NetView/v1/', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/audience.json').success(function(api_data){
        if(!api_data.NetUsage[0].WebsiteCategory) {
          $scope.output.message = "No Record found for the provided input";
          $scope.netUsageData = '';
        } else {
          $scope.output.message = '';
          $scope.netUsageData = api_data.NetUsage[0].WebsiteCategory[0].WebSiteInfo;  
        }
      });
    }

    if($scope.viaRecentSearch) {
      if(!$scope.cache_response.NetUsage[0].WebsiteCategory) {
        $scope.output.message = "No Record found for the provided input";
        $scope.netUsageData = '';
      } else {
        $scope.netUsageData = $scope.cache_response.NetUsage[0].WebsiteCategory[0].WebSiteInfo;
        $scope.output.message = '';

      }
      $scope.viaRecentSearch = false;
    }

    $scope.$watch('cache_response', function(newValue, oldValue){
      if(newValue == oldValue) { return; }
      if(newValue) {
        if(!$scope.cache_response.NetUsage[0].WebsiteCategory) {
          $scope.output.message = "No Record found for the provided input";
          $scope.netUsageData = '';
        } else {
          $scope.netUsageData = $scope.cache_response.NetUsage[0].WebsiteCategory[0].WebSiteInfo;
          $scope.output.message = '';
        }
      }
    });

  });
