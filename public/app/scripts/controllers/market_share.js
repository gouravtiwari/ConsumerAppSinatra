'use strict';

angular.module('publicApp')
  .controller('MarketShareCtrl', function ($scope, Data) {
    $scope.search = function () {
      $scope.periods = [];
      for (var i = 0; i<$scope.periodData.length; i++) {
        if ( $scope.period == $scope.periodData[i].Period) {
          $scope.periods = $scope.periodData;
        };
      };
    };
    Data.get_local('scripts/jsons/market_share_by_manufacturer.json').success(function(api_data){
      $scope.periodData = api_data.root.PeriodData;
      $scope.periods = $scope.periodData;
    });
  });
