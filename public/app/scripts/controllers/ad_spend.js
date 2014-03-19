'use strict';

angular.module('publicApp')
  .controller('AdSpendCtrl', function ($scope, Data) {
    $scope.input.choices = ['brand','category']
    $scope.$watch('categories', function() {
      $scope.doughnutsRedrawCategory();
    });
    $scope.search = function(){
      var parameter_obj = {"choice": $scope.input.choice};
      if (parameter_obj.choice == 'category') {
        $scope.searchByCategory();
      } else{
        $scope.searchByBrand();
      }; 
    }
    $scope.searchByCategory = function(){
      var parameter_obj = {"productcategory": $scope.input.category};
      // Data.get_json('AdView/Product/v1/', parameter_obj).success(function(api_data){
      $scope.categories = [];
      Data.get_local('scripts/jsons/adspend_by_category.json').success(function(api_data){
        for (var category = 0; category < api_data.AdViews.ProductCategory.length; category++) {
          for(var subcategory = 0; subcategory < api_data.AdViews.ProductCategory[category].PCCSubGroup.length; subcategory++){
            for (var adspend = 0; adspend < api_data.AdViews.ProductCategory[category].PCCSubGroup[subcategory].AdSpend.length; adspend++) {
              $scope.categories.push({
                'CategoryName': api_data.AdViews.ProductCategory[category].ProductCategoryName,
                'SubCategoryName': api_data.AdViews.ProductCategory[category].PCCSubGroup[subcategory].PCCSubGroupName,
                'Brand': api_data.AdViews.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
                'NetworkTVAdSpend': api_data.AdViews.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].NetworkTVAdSpend,
                'SpotTVAdSpend': api_data.AdViews.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].SpotTVAdSpend,
                'CableTVAdSpend': api_data.AdViews.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].CableTVAdSpend,
                'SyndicatedTVAdSpend': api_data.AdViews.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].SyndicatedTVAdSpend,
                'NationalMagazineAdSpend': api_data.AdViews.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].NationalMagazineAdSpend,
                'NationalInternetAdSpend': api_data.AdViews.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].NationalInternetAdSpend
              });
            }
          }
        };
      }); 
    };
    
    $scope.searchByBrand = function(){
      var parameter_obj = {"productbrand": $scope.input.brand};
      // Data.get_json('AdView/Brand/v1/', parameter_obj).success(function(api_data){
      $scope.categories = [];
      Data.get_local('scripts/jsons/adspend_by_brand.json').success(function(api_data){
        var brandList = api_data.AdSpend.Brand
        for (var brand = 0; brand < brandList.length; brand++) {
          for(var category = 0; category < brandList[brand].ProductCategory.length; category++){
            $scope.categories.push({
              'CategoryName': brandList[brand].ProductCategory[category].ProductCategoryName,
              'SubCategoryName': brandList[brand].ProductCategory[category].PCCSubgroup,
              'Brand': brandList[brand].BrandName,
              'NetworkTVAdSpend': brandList[brand].ProductCategory[category].NetworkTVAdSpend,
              'SpotTVAdSpend': brandList[brand].ProductCategory[category].SpotTVAdSpend,
              'CableTVAdSpend': brandList[brand].ProductCategory[category].CableTVAdSpend,
              'SyndicatedTVAdSpend': brandList[brand].ProductCategory[category].SyndicatedTVAdSpend,
              'NationalMagazineAdSpend': brandList[brand].ProductCategory[category].NationalMagazineAdSpend,
              'NationalInternetAdSpend': brandList[brand].ProductCategory[category].NationalInternetAdSpend
            });
          }
        };
      });
    };

    $scope.doughnutsRedrawCategory = function(){
      // if($scope.ProductCategory != undefined && $scope.ProductCategory != null && $scope.ProductCategory.toString() != 'NaN'){
      //   $scope.dataCategoryNetworkTVAdSpend = [];
      //   $scope.dataCategorySpotTVAdSpend = [];
      //   $scope.dataCategoryCableTVAdSpend = [];
      //   $scope.dataCategoryNationalMagazineAdSpend = [];
      //   $scope.dataCategorySyndicatedTVAdSpend = [];
      //   $scope.dataCategoryNationalInternetAdSpend = [];

      //   for (var category = 0; category < $scope.ProductCategory.length; category++) {
      //     for (var subcategory = 0; subcategory < $scope.ProductCategory[category].PCCSubGroup.length; subcategory++) {
      //       for (var adspend = 0; adspend < $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend.length; adspend++) {
      //         $scope.dataCategoryNetworkTVAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
      //                                           'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].NetworkTVAdSpend
      //                                         });
      //         $scope.dataCategorySpotTVAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
      //                                           'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].SpotTVAdSpend
      //                                         });
      //         $scope.dataCategoryCableTVAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
      //                                           'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].CableTVAdSpend
      //                                         });
      //         $scope.dataCategoryNationalMagazineAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
      //                                           'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].NationalMagazineAdSpend
      //                                         });
      //         $scope.dataCategorySyndicatedTVAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
      //                                           'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].SyndicatedTVAdSpend
      //                                         });
      //         $scope.dataCategoryNationalInternetAdSpend.push({'label': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
      //                                           'value': $scope.ProductCategory[category].PCCSubGroup[subcategory].AdSpend[adspend].NationalInternetAdSpend
      //                                         });
      //       };
      //     };
      //   };
      // }
    };

    $scope.doughnutsRedrawBrand = function(){
      // if($scope.ProductBrand != undefined && $scope.ProductBrand != null && $scope.ProductBrand.toString() != 'NaN'){
      //   $scope.dataBrandNetworkTVAdSpend = [];
      //   $scope.dataBrandSpotTVAdSpend = [];
      //   $scope.dataBrandCableTVAdSpend = [];
      //   $scope.dataBrandNationalMagazineAdSpend = [];
      //   $scope.dataBrandSyndicatedTVAdSpend = [];
      //   $scope.dataBrandNationalInternetAdSpend = [];

      //   for (var brand = 0; brand < $scope.ProductBrand.length; brand++) {
      //     for (var category = 0; category < $scope.ProductBrand[brand].ProductCategory.length; category++) {
      //       console.log($scope.ProductBrand[brand].ProductCategory);
      //       $scope.dataBrandNetworkTVAdSpend.push({'label': $scope.ProductBrand[brand].ProductCategory[category].ProductCategoryName,
      //                                         'value': $scope.ProductBrand[brand].ProductCategory[category].NetworkTVAdSpend
      //                                       });
      //       $scope.dataBrandSpotTVAdSpend.push({'label': $scope.ProductBrand[brand].ProductCategory[category].ProductCategoryName,
      //                                         'value': $scope.ProductBrand[brand].ProductCategory[category].SpotTVAdSpend
      //                                       });
      //       $scope.dataBrandCableTVAdSpend.push({'label': $scope.ProductBrand[brand].ProductCategory[category].ProductCategoryName,
      //                                         'value': $scope.ProductBrand[brand].ProductCategory[category].CableTVAdSpend
      //                                       });
      //       $scope.dataBrandNationalMagazineAdSpend.push({'label': $scope.ProductBrand[brand].ProductCategory[category].ProductCategoryName,
      //                                         'value': $scope.ProductBrand[brand].ProductCategory[category].NationalMagazineAdSpend
      //                                       });
      //       $scope.dataBrandSyndicatedTVAdSpend.push({'label': $scope.ProductBrand[brand].ProductCategory[category].ProductCategoryName,
      //                                         'value': $scope.ProductBrand[brand].ProductCategory[category].SyndicatedTVAdSpend
      //                                       });
      //       $scope.dataBrandNationalInternetAdSpend.push({'label': $scope.ProductBrand[brand].ProductCategory[category].ProductCategoryName,
      //                                         'value': $scope.ProductBrand[brand].ProductCategory[category].NationalInternetAdSpend
      //                                       });
      //     };
      //   };
      // }
    };
  });
