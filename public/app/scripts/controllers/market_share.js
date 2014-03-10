'use strict';

angular.module('publicApp')
  .controller('MarketShareCtrl', function ($scope, Data) {
    Data.get_local('scripts/jsons/market_share_by_manufacturer.json').success(function(api_data){
      $scope.periods = api_data.root.PeriodData;
    });
  });
