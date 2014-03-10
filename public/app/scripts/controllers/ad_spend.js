'use strict';

angular.module('publicApp')
  .controller('AdSpendCtrl', function ($scope, Data) {
    
    Data.get_local('scripts/jsons/adspend_by_category.json').success(function(api_data){
      $scope.ProductCategory = api_data.AdViews.ProductCategory;
    });

  });
