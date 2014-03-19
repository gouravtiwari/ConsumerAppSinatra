'use strict';

angular.module('publicApp')
  .controller('AdSpendCtrl', function ($scope, Data) {
    $scope.choices = ['brand','category'];
    $scope.input.choice = $scope.input.choice || $scope.choices[1];
    $scope.input.productcategory = $scope.input.productcategory || '';
    $scope.input.productbrand = $scope.input.productbrand || '';
    $scope.sortByFields = [];
    $scope.$watch('categories', function() {
      $scope.doughnutsRedrawCategory();
    });
    $scope.search = function(){
      var parameter_obj = {"choice": $scope.input.choice};
      if (parameter_obj.choice == 'category') {
        $scope.searchByCategory();
      } else{
        $scope.input.productbrand = $scope.input.productcategory;
        $scope.searchByBrand();
      }; 
    }
    $scope.searchByCategory = function(){
      var parameter_obj = {"productcategory": $scope.input.productcategory};
      Data.get_json('AdView/Product/v1/', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/adspend_by_category.json').success(function(api_data){
        if(!api_data.AdViews.ProductCategory) {
          $scope.output.message = "No Record found for the provided input";
        } else {
          $scope.output.message = '';
          $scope.categoriesByCategory(api_data.AdViews.ProductCategory);

          $scope.sortByFields = Data.fillSortByFields($scope.categories[0]);
          Data.injectColorClass($scope.categories, $scope.sortByFields);
        }
      }); 
    };

    $scope.categoriesByCategory = function(productCategories){
      $scope.categories = [];
      for (var category = 0; category < productCategories.length; category++) {
        for(var subcategory = 0; subcategory < productCategories[category].PCCSubGroup.length; subcategory++){
          for (var adspend = 0; adspend < productCategories[category].PCCSubGroup[subcategory].AdSpend.length; adspend++) {
            $scope.categories.push({
              'CategoryName': productCategories[category].ProductCategoryName,
              'SubCategoryName': productCategories[category].PCCSubGroup[subcategory].PCCSubGroupName,
              'Brand': productCategories[category].PCCSubGroup[subcategory].AdSpend[adspend].Brand,
              'NetworkTVAdSpend': productCategories[category].PCCSubGroup[subcategory].AdSpend[adspend].NetworkTVAdSpend,
              'SpotTVAdSpend': productCategories[category].PCCSubGroup[subcategory].AdSpend[adspend].SpotTVAdSpend,
              'CableTVAdSpend': productCategories[category].PCCSubGroup[subcategory].AdSpend[adspend].CableTVAdSpend,
              'SyndicatedTVAdSpend': productCategories[category].PCCSubGroup[subcategory].AdSpend[adspend].SyndicatedTVAdSpend,
              'NationalMagazineAdSpend': productCategories[category].PCCSubGroup[subcategory].AdSpend[adspend].NationalMagazineAdSpend,
              'NationalInternetAdSpend': productCategories[category].PCCSubGroup[subcategory].AdSpend[adspend].NationalInternetAdSpend
            });
          }
        }
      };
    }
    
    $scope.searchByBrand = function(){
      var parameter_obj = {"productbrand": $scope.input.productbrand};
      Data.get_json('AdView/Brand/v1/', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/adspend_by_brand.json').success(function(api_data){
        if(!api_data.AdSpend.Brand) {
          $scope.output.message = "No Record found for the provided input";
        } else {
          $scope.output.message = '';
          $scope.categoriesByBrand(api_data.AdSpend.Brand);
        
          $scope.sortByFields = Data.fillSortByFields($scope.categories[0]);
          Data.injectColorClass($scope.categories, $scope.sortByFields);
        }
      });
    };

    $scope.categoriesByBrand = function (productBrands) {
      $scope.categories = []
      for (var brand = 0; brand < productBrands.length; brand++) {
        for(var category = 0; category < productBrands[brand].ProductCategory.length; category++){
          $scope.categories.push({
            'CategoryName': productBrands[brand].ProductCategory[category].ProductCategoryName,
            'SubCategoryName': productBrands[brand].ProductCategory[category].PCCSubgroup,
            'Brand': productBrands[brand].BrandName,
            'NetworkTVAdSpend': productBrands[brand].ProductCategory[category].NetworkTVAdSpend,
            'SpotTVAdSpend': productBrands[brand].ProductCategory[category].SpotTVAdSpend,
            'CableTVAdSpend': productBrands[brand].ProductCategory[category].CableTVAdSpend,
            'SyndicatedTVAdSpend': productBrands[brand].ProductCategory[category].SyndicatedTVAdSpend,
            'NationalMagazineAdSpend': productBrands[brand].ProductCategory[category].NationalMagazineAdSpend,
            'NationalInternetAdSpend': productBrands[brand].ProductCategory[category].NationalInternetAdSpend
          });
        }
      };
    }

    if($scope.viaRecentSearch) {
      if(($scope.input.choice == 'category' && $scope.cache_response.AdViews && !$scope.cache_response.AdViews.ProductCategory) ||
        ($scope.input.choice == 'brand' && $scope.cache_response.AdSpend && !$scope.cache_response.AdSpend.Brand)
        ) {
        $scope.output.message = "No Record found for the provided input";
        $scope.netUsageData = '';
      } else {
        if($scope.input.choice == 'category'){
          $scope.categories = $scope.categoriesByCategory($scope.cache_response.AdViews.ProductCategory);
        }else{
          $scope.categories = $scope.categoriesByBrand($scope.cache_response.AdSpend.Brand);
        }
        $scope.sortByFields = Data.fillSortByFields($scope.categories[0]);
        Data.injectColorClass($scope.categories, $scope.sortByFields);
        $scope.output.message = '';
      }
      $scope.viaRecentSearch = false;
    }

    $scope.$watch('cache_response', function(newValue, oldValue){
      if(newValue == oldValue) { return; }
      if($scope.cache_response.AdViews) {
        if(!$scope.cache_response.AdViews.ProductCategory) {
          $scope.output.message = "No Record found for the provided input";
          $scope.netUsageData = '';
        } else {
          $scope.netUsageData = $scope.cache_response.AdViews.ProductCategory;
          $scope.output.message = '';
        }
      } else {
        if(!$scope.cache_response.AdSpend.Brand) {
          $scope.output.message = "No Record found for the provided input";
          $scope.netUsageData = '';
        } else {
          $scope.netUsageData = $scope.cache_response.AdSpend.Brand;
          $scope.output.message = '';
        }
      }
    });

    $scope.$watch('sortBy', function(newvalue, oldvalue){
      console.log(newvalue)
      if(!newvalue || newvalue == oldvalue) return;
      $scope.categories = Data.sortBy(newvalue, $scope.categories);
    });
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
  });
