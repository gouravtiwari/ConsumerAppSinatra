'use strict';

angular.module('publicApp')
  .controller('AudienceCtrl', function ($scope, Data) {
    
    // Data.get_local('scripts/jsons/audience.json').success(function(api_data){
    // 	$scope.netUsageData = api_data.NetUsage[0].WebsiteCategory[0].WebSiteInfo;
    // });
    $scope.sortByFields = [];

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
          $scope.sortByFields = Data.fillSortByFields($scope.netUsageData[0]);
          Data.injectColorClass($scope.netUsageData, $scope.sortByFields);  
        }
      });
    }

    if($scope.viaRecentSearch) {
      if($scope.cache_response.NetUsage && !$scope.cache_response.NetUsage[0].WebsiteCategory) {
        $scope.output.message = "No Record found for the provided input";
        $scope.netUsageData = '';
      } else {
        $scope.netUsageData = $scope.cache_response.NetUsage[0].WebsiteCategory[0].WebSiteInfo;
        $scope.sortByFields = Data.fillSortByFields($scope.netUsageData[0]);
        Data.injectColorClass($scope.netUsageData, $scope.sortByFields);
        $scope.output.message = '';

      }
      $scope.viaRecentSearch = false;
    }

    $scope.$watch('cache_response', function(newValue, oldValue){
      if(newValue == oldValue) { return; }
      if($scope.cache_response.NetUsage) {
        if(!$scope.cache_response.NetUsage[0].WebsiteCategory) {
          $scope.output.message = "No Record found for the provided input";
          $scope.netUsageData = '';
        } else {
          $scope.netUsageData = $scope.cache_response.NetUsage[0].WebsiteCategory[0].WebSiteInfo;
          $scope.output.message = '';
        }
      }
    });

    $scope.$watch('sortBy', function(newvalue, oldvalue){
      console.log(newvalue)
      if(!newvalue || newvalue == oldvalue) return;
      $scope.netUsageData = Data.sortBy(newvalue, $scope.netUsageData);
    })

  });
