'use strict';

angular.module('publicApp')
  .controller('AdSpendCtrl', function ($scope, Data) {
    
    Data.get_local('scripts/jsons/adspend_by_category.json').success(function(api_data){
      $scope.ProductCategory = api_data.AdViews.ProductCategory;
    });

    Data.get_local('scripts/jsons/adspend_by_brand.json').success(function(api_data){
      $scope.BrandArray = api_data.AdSpend.Brand;
    });

  });
