'use strict';

angular.module('publicApp')
  .controller('AdSpendCtrl', function ($scope, Data) {
    $scope.$watch('ProductCategory', function() {
      $scope.doughnutsRedrawCategory();
    });
    $scope.$watch('ProductBrand', function() {
      $scope.doughnutsRedrawBrand();
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

    $scope.doughnutsRedrawCategory = function(){
      if($scope.ProductCategory != undefined && $scope.ProductCategory != null && $scope.ProductCategory.toString() != 'NaN'){
        $scope.dataCategoryNetworkTVAdSpend = [];
        $scope.dataCategorySpotTVAdSpend = [];
        $scope.dataCategoryCableTVAdSpend = [];
        $scope.dataCategoryNationalMagazineAdSpend = [];
        $scope.dataCategorySyndicatedTVAdSpend = [];
        $scope.dataCategoryNationalInternetAdSpend = [];

        for (var category = 0; category < $scope.ProductCategory.length; category++) {
          for (var subcategory = 0; subcategory < $scope.ProductCategory[category].PCCSubGroup.length; subcategory++) {
            for (var adspend = 0; adspend < $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend.length; adspend++) {
              $scope.dataCategoryNetworkTVAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                                                'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].NetworkTVAdSpend
                                              });
              $scope.dataCategorySpotTVAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                                                'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].SpotTVAdSpend
                                              });
              $scope.dataCategoryCableTVAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                                                'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].CableTVAdSpend
                                              });
              $scope.dataCategoryNationalMagazineAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                                                'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].NationalMagazineAdSpend
                                              });
              $scope.dataCategorySyndicatedTVAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                                                'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].SyndicatedTVAdSpend
                                              });
              $scope.dataCategoryNationalInternetAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                                                'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].NationalInternetAdSpend
                                              });
            };
          };
        };
      }
    };

    $scope.doughnutsRedrawBrand = function(){
      if($scope.ProductBrand != undefined && $scope.ProductBrand != null && $scope.ProductBrand.toString() != 'NaN'){
        $scope.dataBrandNetworkTVAdSpend = [];
        $scope.dataBrandSpotTVAdSpend = [];
        $scope.dataBrandCableTVAdSpend = [];
        $scope.dataBrandNationalMagazineAdSpend = [];
        $scope.dataBrandSyndicatedTVAdSpend = [];
        $scope.dataBrandNationalInternetAdSpend = [];

        for (var brand = 0; brand < $scope.ProductBrand.length; brand++) {
          for (var category = 0; category < $scope.ProductBrand[brand].ProductCategory.length; category++) {
            console.log($scope.ProductBrand[brand].ProductCategory);
            $scope.dataBrandNetworkTVAdSpend.push({'label': $scope.ProductBrand[brand].ProductCategory[category].ProductCategoryName,
                                              'value': $scope.ProductBrand[brand].ProductCategory[category].NetworkTVAdSpend
                                            });
            $scope.dataBrandSpotTVAdSpend.push({'label': $scope.ProductBrand[brand].ProductCategory[category].ProductCategoryName,
                                              'value': $scope.ProductBrand[brand].ProductCategory[category].SpotTVAdSpend
                                            });
            $scope.dataBrandCableTVAdSpend.push({'label': $scope.ProductBrand[brand].ProductCategory[category].ProductCategoryName,
                                              'value': $scope.ProductBrand[brand].ProductCategory[category].CableTVAdSpend
                                            });
            $scope.dataBrandNationalMagazineAdSpend.push({'label': $scope.ProductBrand[brand].ProductCategory[category].ProductCategoryName,
                                              'value': $scope.ProductBrand[brand].ProductCategory[category].NationalMagazineAdSpend
                                            });
            $scope.dataBrandSyndicatedTVAdSpend.push({'label': $scope.ProductBrand[brand].ProductCategory[category].ProductCategoryName,
                                              'value': $scope.ProductBrand[brand].ProductCategory[category].SyndicatedTVAdSpend
                                            });
            $scope.dataBrandNationalInternetAdSpend.push({'label': $scope.ProductBrand[brand].ProductCategory[category].ProductCategoryName,
                                              'value': $scope.ProductBrand[brand].ProductCategory[category].NationalInternetAdSpend
                                            });
          };
        };
      }
    };
  });
