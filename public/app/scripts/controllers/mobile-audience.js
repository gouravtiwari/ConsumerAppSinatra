'use strict';

angular.module('publicApp')
  .controller('MobileAudienceCtrl', function ($scope, Data) {
    Data.get_local('scripts/jsons/mobile_audience.json').success(function(api_data){
      $scope.andriod = {};
      $scope.andriod.AppDetails = api_data.AppResponse.AppDetails;
    });

  });
