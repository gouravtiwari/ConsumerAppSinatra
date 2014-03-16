'use strict';

angular.module('publicApp')
  .controller('AdSpendCtrl', function ($scope, Data) {
    $scope.searchByCategory = function(){
      var parameter_obj = {"productcategory": $scope.input.category};
      Data.get_json('AdView/Product/v1/', parameter_obj).success(function(api_data){
      // Data.get_local('scripts/jsons/adspend_by_category.json').success(function(api_data){
        $scope.ProductCategory = api_data.AdViews.ProductCategory;
      });
  
    };
    
    $scope.searchByBrand = function(){
      var parameter_obj = {"productbrand": $scope.input.brand};
      Data.get_json('AdView/Brand/v1/', parameter_obj).success(function(api_data){
      // Data.get_local('scripts/jsons/adspend_by_brand.json').success(function(api_data){
        $scope.ProductBrand = api_data.AdSpend.Brand;
      });
  
    };
  });
