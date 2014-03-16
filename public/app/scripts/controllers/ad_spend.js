'use strict';

angular.module('publicApp')
  .controller('AdSpendCtrl', function ($scope, Data) {
    $scope.$watch('ProductCategory', function() {
      $scope.doughnutsRedraw();
    });

    $scope.searchByCategory = function(){
      var parameter_obj = {"productcategory": $scope.input.category};
      // Data.get_json('AdView/Product/v1/', parameter_obj).success(function(api_data){
      Data.get_local('scripts/jsons/adspend_by_category.json').success(function(api_data){
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

    $scope.doughnutsRedraw = function(){
      if($scope.ProductCategory != undefined && $scope.ProductCategory != null && $scope.ProductCategory.toString() != 'NaN'){
        $scope.dataNetworkTVAdSpend = [];
        $scope.dataSpotTVAdSpend = [];
        $scope.dataCableTVAdSpend = [];
        $scope.dataNationalMagazineAdSpend = [];
        $scope.dataSyndicatedTVAdSpend = [];
        $scope.dataNationalInternetAdSpend = [];

        for (var category = 0; category < $scope.ProductCategory.length; category++) {
          for (var subcategory = 0; subcategory < $scope.ProductCategory[category].PCCSubGroup.length; subcategory++) {
            for (var adspend = 0; adspend < $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend.length; adspend++) {
              $scope.dataNetworkTVAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                                                'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].NetworkTVAdSpend
                                              });
              $scope.dataSpotTVAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                                                'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].SpotTVAdSpend
                                              });
              $scope.dataCableTVAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                                                'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].CableTVAdSpend
                                              });
              $scope.dataNationalMagazineAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                                                'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].NationalMagazineAdSpend
                                              });
              $scope.dataSyndicatedTVAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                                                'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].SyndicatedTVAdSpend
                                              });
              $scope.dataNationalInternetAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                                                'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].NationalInternetAdSpend
                                              });
            };
          };
        };
      }
    };
  });
